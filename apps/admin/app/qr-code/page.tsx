'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Printer, QrCode, Globe, Info, Sparkles } from 'lucide-react';

export default function AdminQrCodePage() {
  const [targetUrl, setTargetUrl] = useState('http://localhost:3000/#review-form');

  const handlePrint = () => {
    window.print();
  };

  // Construct QR API URL
  // Uses qrserver.com to generate a high quality 350x350 QR code in clinic-indigo color (Hex: 2e1065 -> RGB color code is not needed, hex is fine, but hex without # is preferred by qrserver API or urlencoded)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&color=471891&data=${encodeURIComponent(targetUrl)}`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar hidden during print */}
      <div className="print:hidden">
        <AdminSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        {/* Header hidden during print */}
        <div className="print:hidden">
          <AdminHeader />
        </div>
        <main className="p-6 space-y-6 flex-1 overflow-y-auto print:p-0 print:m-0 print:bg-white">
          
          {/* Controls section - hidden during print */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
            <div>
              <h1 className="text-2xl font-bold text-white">Patient Feedback QR Code</h1>
              <p className="text-xs text-slate-400">Generate and print an attractive QR Standee for the clinic front desk</p>
            </div>
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Printer className="w-4 h-4" /> Print Standee Poster
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:block">
            
            {/* Configuration Panel - hidden during print */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs print:hidden">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" /> Standee Link Configuration
              </h3>
              
              <div className="p-4 bg-slate-800/40 border border-slate-700/40 rounded-2xl text-slate-300 space-y-2 leading-relaxed">
                <p className="flex items-center gap-1.5 font-bold text-white"><Info className="w-4 h-4 text-amber-500 shrink-0" /> Front Desk Printout</p>
                <p>
                  Place this printed standee at the reception desk, outpatient department (OPD), or dispensary counter.
                </p>
                <p>
                  Patients can scan it with their smartphones to open the feedback form and leave verified reviews instantly.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">QR Destination URL</label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="e.g. http://localhost:3000/#review-form"
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-500 font-semibold"
                />
                <span className="text-[10px] text-slate-500 block">
                  Update this URL when deploying to production (e.g. <code>https://drqhkhanclinic.com/#review-form</code>) to automatically regenerate the QR code.
                </span>
              </div>
            </div>

            {/* Poster Standee Preview - centered & optimized for print */}
            <div className="lg:col-span-7 flex justify-center print:block print:w-full">
              
              {/* Standee Flyer Wrapper */}
              <div 
                id="printable-standee"
                className="w-full max-w-[420px] bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-4 border-double border-amber-500/60 rounded-3xl p-8 shadow-2xl space-y-6 text-center relative overflow-hidden print:border-slate-800 print:bg-white print:text-slate-900 print:shadow-none print:w-[100%] print:max-w-none print:h-screen print:flex print:flex-col print:justify-center print:p-12 print:my-0 print:mx-auto"
              >
                
                {/* Visual Glow elements - hidden during print */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl print:hidden" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl print:hidden" />

                {/* Header Logo & Clinic Details */}
                <div className="space-y-2">
                  <img
                    src="/images/logo.png"
                    alt="Dr. Q.H. Khan Clinic Logo"
                    className="mx-auto w-12 h-12 rounded-2xl shadow-lg border border-white/10 print:border-slate-300 object-cover"
                  />
                  <h2 className="font-extrabold text-lg text-white leading-tight uppercase tracking-wider print:text-slate-900">
                    DR. Q.H. KHAN
                  </h2>
                  <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest print:text-amber-650">
                    CLASSICAL HOMOEOPATHIC CLINIC
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-semibold print:text-slate-500">
                    <span>Est. 1958</span>
                    <span>•</span>
                    <span>Gaya, Bihar, India</span>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto" />

                {/* Invitation Text */}
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white tracking-wide print:text-slate-800 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Share Your Experience!
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed max-w-xs mx-auto print:text-slate-650">
                    Your valuable review helps others in Gaya find safe, natural, and constitutional healing.
                  </p>
                </div>

                {/* QR Code Container */}
                <div className="bg-white p-4 rounded-2xl max-w-[200px] mx-auto shadow-xl border border-indigo-900/10 flex flex-col items-center justify-center print:border-slate-350">
                  <img
                    src={qrCodeUrl}
                    alt="Clinic Feedback QR Code"
                    className="w-full aspect-square"
                  />
                  <span className="text-[9px] text-indigo-950 font-bold uppercase tracking-wider mt-2.5 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" /> Scan to Review
                  </span>
                </div>

                {/* Star rating graphics */}
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-lg">★</span>
                  ))}
                </div>

                {/* Instructions */}
                <div className="space-y-1 text-[10px] text-slate-400 leading-relaxed print:text-slate-500">
                  <p className="font-bold text-white print:text-slate-800">Easy Steps:</p>
                  <p>1. Open your phone camera or QR scanner.</p>
                  <p>2. Scan this QR code and click the link.</p>
                  <p>3. Post your ratings & clinical recovery feedback.</p>
                </div>

                {/* Footer Disclaimer */}
                <div className="pt-4 border-t border-slate-800/60 text-[9px] text-slate-500 leading-normal max-w-xs mx-auto print:text-slate-450 print:border-slate-200">
                  Reviews are saved securely in our databases and displayed after moderation check. Thank you!
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Global CSS to handle printing cleanly */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          /* Hide all UI elements except the printable poster container */
          .print\\:hidden, 
          aside,
          header,
          button,
          nav {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          #printable-standee {
            border: 2px solid #cbd5e1 !important;
            background: white !important;
            color: #0f172a !important;
            box-shadow: none !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            margin: 0 auto !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 2rem !important;
          }
          #printable-standee h2,
          #printable-standee h3,
          #printable-standee p,
          #printable-standee span {
            color: #0f172a !important;
          }
          #printable-standee p {
            color: #475569 !important;
          }
        }
      `}</style>
    </div>
  );
}
