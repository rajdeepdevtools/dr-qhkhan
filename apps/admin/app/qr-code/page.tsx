'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Printer, QrCode, Globe, Info, MapPin, Phone, Star, Sparkles } from 'lucide-react';

export default function AdminQrCodePage() {
  const getDefaultTargetUrl = () => {
    if (process.env.NEXT_PUBLIC_WEBSITE_URL) {
      return `${process.env.NEXT_PUBLIC_WEBSITE_URL.replace(/\/+$/, '')}/feedback`;
    }
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return 'https://www.theqhkhanclinic.com/feedback';
    }
    return 'http://localhost:3000/feedback';
  };

  const [targetUrl, setTargetUrl] = useState(getDefaultTargetUrl());

  const handlePrint = () => {
    window.print();
  };

  // High quality pure black QR Code for crisp scanning on light paper
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&color=000000&data=${encodeURIComponent(targetUrl)}`;

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
        <main className="p-6 space-y-6 flex-1 overflow-y-auto print:p-0 print:m-0 print:bg-white print:overflow-visible">
          
          {/* Controls section - hidden during print */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Patient Feedback QR Standee & Poster</h1>
              <p className="text-xs text-slate-500">Generate & print premium light QR Standee (Patrick's Blue & American Yellow theme with Official Logo)</p>
            </div>
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-gradient-to-r from-[#1F0270] via-[#2A0596] to-[#1F0270] hover:from-[#2A0596] hover:to-[#1F0270] text-[#F4C430] font-black text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02] border border-[#F4C430]/40"
            >
              <Printer className="w-4.5 h-4.5 text-[#F4C430]" /> Print Premium Standee
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:block">
            
            {/* Configuration Panel - hidden during print */}
            <div className="lg:col-span-5 bg-white shadow-sm border border-slate-200 rounded-3xl p-6 space-y-4 text-xs print:hidden">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#F4C430]" /> Destination Link Settings
              </h3>
              
              <div className="p-4 bg-slate-50 border border-slate-300/60 rounded-2xl text-slate-600 space-y-2 leading-relaxed">
                <p className="flex items-center gap-1.5 font-bold text-white"><Info className="w-4 h-4 text-[#F4C430] shrink-0" /> Front Desk Standee Guide</p>
                <p>
                  Print this light theme standee featuring the official website logo to place at your reception desk or consultation room.
                </p>
                <p>
                  Scanning this QR code immediately opens the <strong>Patient Star Rating & Review Form</strong> (`/feedback`).
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Target Review & Feedback URL</label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="e.g. https://www.theqhkhanclinic.com/feedback"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-white outline-none focus:border-[#F4C430] font-semibold"
                />
                <span className="text-[10px] text-slate-500 block">
                  Scanned QR code links directly to your rate & feedback page (e.g. <code>https://www.theqhkhanclinic.com/feedback</code>).
                </span>
              </div>
            </div>

            {/* Poster Standee Preview - spacious & 1-page premium light print optimized */}
            <div className="lg:col-span-7 flex justify-center print:block print:w-full print:m-0">
              
              {/* Premium Light Standee Poster Printable Box */}
              <div 
                id="printable-standee"
                className="w-full max-w-[460px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F4EFE6] border-4 border-double border-[#1F0270] rounded-3xl p-7 sm:p-9 shadow-2xl space-y-6 text-center relative overflow-hidden text-slate-900 print:w-full print:max-w-[100%] print:border-4 print:border-[#1F0270] print:rounded-none print:shadow-none print:p-7 print:m-0 print:space-y-6"
              >
                
                {/* Background Texture & Glow Elements */}
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#1F0270_1.2px,transparent_1.2px)] [background-size:20px_20px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#F4C430]/30 via-[#1F0270]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#1F0270]/15 via-[#F4C430]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

                {/* Watermark Background Logo from Website */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.08] pointer-events-none flex items-center justify-center">
                  <img
                    src="/images/logo.png"
                    alt="Clinic Watermark Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="relative z-10 space-y-6">
                  
                  {/* Header Brand Banner with Website Logo */}
                  <div className="space-y-3">
                    {/* Centered Website Logo Box */}
                    <div className="w-20 h-20 rounded-2xl bg-white border-2 border-[#1F0270] p-2 shadow-md mx-auto flex items-center justify-center">
                      <img
                        src="/images/logo.png"
                        alt="Clinic Website Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="pt-1 space-y-1">
                      <h2 className="font-black text-2.5xl text-[#1F0270] leading-none uppercase tracking-tight">
                        DR. Q.H. KHAN
                      </h2>
                      <div className="inline-block bg-[#1F0270] text-[#F4C430] text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xs">
                        CLASSICAL HOMOEOPATHIC CLINIC
                      </div>
                      <p className="text-[9.5px] text-[#1F0270] font-extrabold tracking-wider pt-0.5">
                        Est. 1958 • 68+ Years of Heritage & Trust
                      </p>
                    </div>
                  </div>

                  {/* Real Clinic Address & Doctor Credentials Box */}
                  <div className="bg-white/95 border-2 border-[#1F0270]/25 p-3.5 rounded-2xl space-y-2 text-[10px] font-bold text-slate-800 backdrop-blur-sm shadow-sm my-2">
                    <div className="flex items-center justify-center gap-1.5 text-[#1F0270] font-black">
                      <MapPin className="w-4 h-4 text-[#DD0200] shrink-0" />
                      <span>Nagmatia Road, Gaya, Bihar, India</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-slate-700 text-[9.5px]">
                      <Phone className="w-3.5 h-3.5 text-[#1F0270] shrink-0" />
                      <span>Helpline: 9709786669 | 9135404090 | 9097211989</span>
                    </div>
                    <div className="text-[9px] text-[#1F0270] font-extrabold pt-1.5 border-t border-[#1F0270]/15 flex justify-center gap-3">
                      <span>Dr. I. Khan (Reg. 33454)</span>
                      <span>•</span>
                      <span>Dr. Adeeba Farheen (Reg. 31319)</span>
                    </div>
                  </div>

                  {/* Call to Action Box - American Yellow & Patrick's Blue Accent */}
                  <div className="space-y-1.5 bg-gradient-to-r from-[#F4C430] via-[#F5CB45] to-[#F4C430] border-2 border-[#1F0270] p-4 rounded-2xl shadow-md text-[#1F0270] my-2">
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-[#1F0270] text-[#1F0270]" />
                      ))}
                    </div>
                    <h3 className="text-sm font-black tracking-wider uppercase flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#1F0270]" />
                      Share Your Recovery Review
                    </h3>
                    <p className="text-[10px] text-[#1F0270] leading-snug font-bold max-w-xs mx-auto">
                      Your valuable feedback helps patients across Gaya discover authentic, natural healing.
                    </p>
                  </div>

                  {/* Pure Black QR Code Container on White Background */}
                  <div className="bg-white p-4 rounded-2xl max-w-[215px] mx-auto shadow-xl border-3 border-[#1F0270] flex flex-col items-center justify-center my-3">
                    <img
                      src={qrCodeUrl}
                      alt="Clinic Feedback QR Code"
                      className="w-full aspect-square object-contain"
                    />
                    <div className="mt-2.5 text-[10px] font-black text-slate-800 bg-[#1F0270] uppercase tracking-wider flex items-center gap-1.5 px-3.5 py-1 rounded-full shadow-sm">
                      <QrCode className="w-3.5 h-3.5 text-[#F4C430]" />
                      <span>SCAN CODE TO REVIEW</span>
                    </div>
                  </div>

                  {/* Easy Steps Instructions with Generous Spacing */}
                  <div className="grid grid-cols-3 gap-2.5 text-[9px] font-extrabold text-[#1F0270] pt-1">
                    <div className="bg-white border border-[#1F0270]/20 p-2.5 rounded-xl shadow-xs">
                      <span className="block text-[#1F0270] font-black text-xs mb-0.5">1</span>
                      <span>Open Camera</span>
                    </div>
                    <div className="bg-white border border-[#1F0270]/20 p-2.5 rounded-xl shadow-xs">
                      <span className="block text-[#1F0270] font-black text-xs mb-0.5">2</span>
                      <span>Scan QR Link</span>
                    </div>
                    <div className="bg-white border border-[#1F0270]/20 p-2.5 rounded-xl shadow-xs">
                      <span className="block text-[#1F0270] font-black text-xs mb-0.5">3</span>
                      <span>Post Review</span>
                    </div>
                  </div>

                  {/* Footer Note */}
                  <p className="text-[8.5px] text-slate-600 font-bold pt-1">
                    Verified patient reviews are displayed on clinic website. Thank you for your trust!
                  </p>

                </div>

              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Global Print Stylesheet guaranteeing single-page A4 print in premium light colors */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            background: #ffffff !important;
            color: #1f0270 !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 100% !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
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
            background: #ffffff !important;
          }
          #printable-standee {
            border: 4px double #1f0270 !important;
            background: linear-gradient(180deg, #fffdf9 0%, #faf7f0 50%, #f4efe6 100%) !important;
            color: #1f0270 !important;
            box-shadow: none !important;
            width: 88% !important;
            max-width: 480px !important;
            margin: 16px auto !important;
            padding: 24px !important;
            border-radius: 24px !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
          #printable-standee * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}


