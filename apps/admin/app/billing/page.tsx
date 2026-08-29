'use client';

import React, { useEffect, useState } from 'react';
import { adminApiClient } from '../../lib/api-client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Plus, Printer, Trash2, Search, Receipt, X, PlusCircle, CreditCard, ShieldCheck } from 'lucide-react';

const CLINIC_INFO = {
  name: 'DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC',
  tagline: 'ESTABLISHED 1958 • CLASSICAL HOMOEOPATHY',
  address: 'Nagmatia Road, Gaya, Bihar, India',
  helplines: 'Helplines: 9135404090 | 9709786669 | 9097211989',
};

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export default function AdminBillingPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: 'Consultation Fee', quantity: 1, price: 300 },
  ]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'unpaid' | 'partially_paid'>('paid');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card' | 'none'>('cash');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Printing State
  const [selectedPrintInvoice, setSelectedPrintInvoice] = useState<any | null>(null);

  const fetchInvoices = async () => {
    setLoading(true);
    const res = await adminApiClient(`/invoices?search=${encodeURIComponent(searchQuery)}`);
    if (res.success && res.data) {
      setInvoices(res.data);
    }
    setLoading(false);
  };

  const fetchPatients = async () => {
    const res = await adminApiClient('/admin/patients');
    if (res.success && res.data) {
      setPatients(res.data);
      if (res.data.length > 0) setSelectedPatientId(res.data[0]._id);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchPatients();
  }, [searchQuery]);

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    if (field === 'price' || field === 'quantity') {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setItems(updated);
  };

  // Calculations
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const finalAmount = Math.max(0, totalAmount - discountAmount);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) {
      setErrorMsg('Please select a patient.');
      return;
    }
    if (items.some((item) => !item.description.trim() || item.price <= 0)) {
      setErrorMsg('Please enter valid descriptions and prices for all items.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    const payload = {
      patientId: selectedPatientId,
      date: invoiceDate,
      items,
      totalAmount,
      discountAmount,
      finalAmount,
      paymentStatus,
      paymentMethod,
    };

    const res = await adminApiClient('/invoices', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setSubmitting(false);

    if (res.success) {
      setIsModalOpen(false);
      // Reset Form
      setItems([{ description: 'Consultation Fee', quantity: 1, price: 300 }]);
      setDiscountAmount(0);
      setPaymentStatus('paid');
      setPaymentMethod('cash');
      fetchInvoices();
    } else {
      setErrorMsg(res.message || 'Failed to create invoice.');
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice? This action is irreversible.')) return;
    const res = await adminApiClient(`/invoices/${id}`, { method: 'DELETE' });
    if (res.success) {
      fetchInvoices();
    }
  };

  const handlePrint = (invoice: any) => {
    setSelectedPrintInvoice(invoice);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="flex min-h-screen">
      {/* Dynamic style tag for print layout */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* 1. Dashboard View (hidden when printing) */}
      <div className="flex-1 flex min-w-0 no-print">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="p-6 space-y-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Patient Billing & Invoices</h1>
                <p className="text-xs text-slate-400">Generate bills, track patient payments, and print receipts</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-clinic-crimson text-white font-bold text-xs rounded-xl shadow hover:bg-amber-700 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Create Invoice
              </button>
            </div>

            {/* Actions & Filters */}
            <div className="flex items-center gap-3 bg-slate-900/60 p-4 border border-slate-800 rounded-2xl">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by Patient Name or Invoice ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700"
                />
              </div>
            </div>

            {/* Invoices List */}
            {loading ? (
              <p className="text-xs text-slate-500 text-center py-12">Loading invoice logs...</p>
            ) : invoices.length === 0 ? (
              <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 font-medium text-xs">
                No billing records found.
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800/60 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                      <th className="p-3">Invoice ID</th>
                      <th className="p-3">Patient Name</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Amount Paid</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {invoices.map((inv) => (
                      <tr key={inv._id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-mono font-bold text-amber-400">{inv.invoiceId}</td>
                        <td className="p-3 font-bold text-white">
                          {inv.patientName}
                          <span className="text-slate-500 block font-normal text-[10px]">
                            ID: {inv.patient?.patientId || 'N/A'} • {inv.patient?.phone || '—'}
                          </span>
                        </td>
                        <td className="p-3">{inv.date}</td>
                        <td className="p-3 font-bold">₹{inv.finalAmount}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                              inv.paymentStatus === 'paid'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : inv.paymentStatus === 'partially_paid'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}
                          >
                            {inv.paymentStatus.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3 uppercase font-bold text-slate-400">{inv.paymentMethod}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handlePrint(inv)}
                            className="px-2.5 py-1 bg-indigo-700 hover:bg-indigo-600 text-white rounded font-bold transition-colors flex inline-flex items-center gap-1"
                          >
                            <Printer className="w-3 h-3" /> Print Receipt
                          </button>
                          <button
                            onClick={() => handleDeleteInvoice(inv._id)}
                            className="px-2.5 py-1 bg-rose-950 text-rose-400 hover:bg-rose-900 rounded font-bold transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 2. Create Invoice Modal (hidden when printing) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 no-print text-xs font-semibold">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 text-slate-300">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-clinic-indigo" /> Create Patient Invoice
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-950/40 border border-rose-900 text-rose-300 rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Select Patient */}
                <div>
                  <label className="block text-slate-455 mb-1">Select Patient *</label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-slate-700"
                  >
                    {patients.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} ({p.patientId}) - {p.phone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-slate-455 mb-1">Invoice Date *</label>
                  <input
                    type="date"
                    required
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-slate-700"
                  />
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white">Billing Line Items</h4>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Line
                  </button>
                </div>

                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Item Description (e.g. Consult Fee, Medicine)"
                      required
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-slate-700"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      required
                      min="0"
                      value={item.price || ''}
                      onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                      className="w-24 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-slate-700 text-center"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      required
                      min="1"
                      value={item.quantity || ''}
                      onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                      className="w-16 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-slate-700 text-center"
                    />
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-rose-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Calculations & Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                {/* Payment Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-455 mb-1">Payment Status</label>
                    <select
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-slate-700"
                    >
                      <option value="paid">Paid</option>
                      <option value="partially_paid">Partially Paid</option>
                      <option value="unpaid">Unpaid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-455 mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-slate-700"
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                      <option value="card">Card Payment</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>

                {/* Subtotals */}
                <div className="bg-slate-950 p-4 border border-slate-800 rounded-2xl flex flex-col justify-center space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subtotal Amount:</span>
                    <strong className="text-white">₹{totalAmount}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Discount (₹):</span>
                    <input
                      type="number"
                      min="0"
                      max={totalAmount}
                      value={discountAmount || ''}
                      onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-center text-white"
                    />
                  </div>
                  <hr className="border-slate-850" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-350">Final Payable:</span>
                    <strong className="text-amber-400 font-extrabold text-base">₹{finalAmount}</strong>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-clinic-crimson text-white font-bold rounded-xl shadow hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Creating Invoice...' : 'Save & Print Invoice'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Printable Invoice Sheet (Only visible during print) */}
      {selectedPrintInvoice && (
        <div className="hidden print:block w-full text-slate-900 p-8 font-sans leading-normal print-only">
          {/* Header Clinic Letterhead */}
          <div className="border-b-2 border-slate-900 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black text-slate-950 tracking-wide uppercase">
                  {CLINIC_INFO.name}
                </h1>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-0.5">
                  {CLINIC_INFO.tagline}
                </p>
                <p className="text-xs text-slate-600 mt-2">{CLINIC_INFO.address}</p>
                <p className="text-xs text-slate-600">{CLINIC_INFO.helplines}</p>
              </div>
              <div className="text-right">
                <div className="inline-block border border-slate-400 bg-slate-50 px-4 py-2 rounded">
                  <p className="font-bold text-xs text-slate-700">INVOICE RECEIPT</p>
                  <p className="font-mono text-slate-950 font-black text-sm">{selectedPrintInvoice.invoiceId}</p>
                </div>
                <p className="text-xs text-slate-500 mt-3 font-semibold">
                  Date: {selectedPrintInvoice.date}
                </p>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl mb-6 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">PATIENT INFORMATION</p>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{selectedPrintInvoice.patientName}</h3>
              <p className="text-slate-600 mt-0.5">Patient ID: {selectedPrintInvoice.patient?.patientId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase text-[10px]">PAYMENT METADATA</p>
              <p className="text-slate-700 mt-1">
                <strong>Status:</strong> <span className="uppercase">{selectedPrintInvoice.paymentStatus}</span>
              </p>
              <p className="text-slate-700 mt-0.5">
                <strong>Method:</strong> <span className="uppercase">{selectedPrintInvoice.paymentMethod}</span>
              </p>
            </div>
          </div>

          {/* Billing Items Table */}
          <div className="mb-6">
            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300">
                  <th className="p-3 border border-slate-300 font-bold text-slate-800">Description</th>
                  <th className="p-3 border border-slate-300 font-bold text-slate-800 text-center">Quantity</th>
                  <th className="p-3 border border-slate-300 font-bold text-slate-800 text-right">Price</th>
                  <th className="p-3 border border-slate-300 font-bold text-slate-800 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedPrintInvoice.items?.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-slate-300">
                    <td className="p-3 border border-slate-300 font-bold text-slate-900">{item.description}</td>
                    <td className="p-3 border border-slate-300 text-center">{item.quantity}</td>
                    <td className="p-3 border border-slate-300 text-right">₹{item.price}</td>
                    <td className="p-3 border border-slate-300 text-right">₹{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Calculations Summary */}
          <div className="flex justify-end mb-12">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>₹{selectedPrintInvoice.totalAmount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Discount Applied:</span>
                <span>- ₹{selectedPrintInvoice.discountAmount || 0}</span>
              </div>
              <hr className="border-slate-300" />
              <div className="flex justify-between font-black text-slate-900 text-sm">
                <span>Total Amount Paid:</span>
                <span>₹{selectedPrintInvoice.finalAmount}</span>
              </div>
            </div>
          </div>

          {/* Legal Footer & Sign-off */}
          <div className="border-t border-slate-300 pt-8 mt-12 flex justify-between items-end text-[10px] text-slate-500">
            <div className="max-w-xs space-y-1">
              <span className="flex items-center gap-1 font-bold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Official Invoice Receipt
              </span>
              <p>Thank you for choosing Dr. Q.H. Khan Clinic. Wishing you a healthy recovery.</p>
            </div>
            <div className="text-right">
              <div className="h-10 w-24 border-b border-slate-400 border-dashed inline-block" />
              <p className="font-bold text-slate-700 mt-1 uppercase">Authorized Signature</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
