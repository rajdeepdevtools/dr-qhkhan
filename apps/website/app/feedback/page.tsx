'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, CheckCircle2, ArrowLeft, Heart, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '../../lib/language-context';
import { apiClient } from '../../lib/api-client';

export default function FeedbackRatePage() {
  const { lang } = useLanguage();
  const [reviewForm, setReviewForm] = useState({
    patientName: '',
    rating: 5,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setFormSuccess(false);

    if (reviewForm.message.trim().length < 5) {
      setFormError(lang === 'hi' ? 'कृपया थोड़ा विस्तृत फीडबैक संदेश लिखें।' : 'Please enter a detailed feedback message (at least 5 characters).');
      setIsSubmitting(false);
      return;
    }

    const res = await apiClient('/feedback', {
      method: 'POST',
      body: JSON.stringify(reviewForm),
    });

    setIsSubmitting(false);
    if (res.success) {
      setFormSuccess(true);
      setReviewForm({ patientName: '', rating: 5, message: '' });
    } else {
      setFormError(res.message || (lang === 'hi' ? 'फीडबैक सबमिट करने में विफल। पुनः प्रयास करें।' : 'Failed to submit review. Please try again.'));
    }
  };

  const getRatingLabel = (stars: number) => {
    switch (stars) {
      case 5:
        return lang === 'hi' ? '⭐⭐⭐⭐⭐ उत्कृष्ट देखभाल (5/5)' : '⭐⭐⭐⭐⭐ Excellent Care (5/5)';
      case 4:
        return lang === 'hi' ? '⭐⭐⭐⭐ बहुत अच्छा अनुभव (4/5)' : '⭐⭐⭐⭐ Very Good Experience (4/5)';
      case 3:
        return lang === 'hi' ? '⭐⭐⭐ अच्छा अनुभव (3/5)' : '⭐⭐⭐ Good (3/5)';
      case 2:
        return lang === 'hi' ? '⭐⭐ सामान्य अनुभव (2/5)' : '⭐⭐ Fair (2/5)';
      case 1:
        return lang === 'hi' ? '⭐ सुधार की आवश्यकता (1/5)' : '⭐ Needs Improvement (1/5)';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-xs font-semibold">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55100D] hover:text-[#DD0200] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'वेबसाइट होम पर जाएं' : 'Back to Website Home'}</span>
        </Link>

        {/* Brand Banner Header */}
        <div className="bg-gradient-to-r from-[#1A0706] via-[#330D0A] to-[#55100D] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#DD0200]/30 text-center space-y-3 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white p-2 border-2 border-amber-400 mx-auto shadow-md flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Dr. Q.H. Khan Clinic Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {lang === 'hi' ? 'रोगी समीक्षा एवं रेटिंग' : 'PATIENT RATING & RECOVERY FEEDBACK'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              DR. Q.H. KHAN
            </h1>
            <p className="text-xs text-amber-200 font-bold uppercase tracking-wider">
              CLASSICAL HOMOEOPATHIC CLINIC • GAYA
            </p>
          </div>
          <p className="text-[11px] text-slate-300 font-medium max-w-md mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'आपकी रेटिंग और समीक्षा गया एवं मगध प्रमंडल के अन्य रोगियों को प्राकृतिक और संवैधानिक उपचार खोजने में मदद करती है।'
              : 'Your rating & genuine review helps patients across Gaya discover classical, natural homoeopathic healing.'}
          </p>
        </div>

        {/* Feedback Submission Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          
          {formSuccess ? (
            <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-900 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="font-black text-lg text-emerald-950">
                  {lang === 'hi' ? 'फीडबैक सफलतापूर्वक सबमिट किया गया!' : 'Thank You For Your Review!'}
                </h2>
                <p className="text-xs font-semibold text-emerald-800">
                  {lang === 'hi'
                    ? 'आपकी मूल्यवान समीक्षा प्राप्त हो गई है। सत्यापन के पश्चात यह क्लिनिक वेबसाइट पर प्रदर्शित होगी।'
                    : 'Your valuable rating and feedback have been received. It will be displayed on the clinic website following verification.'}
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setFormSuccess(false)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition-all uppercase tracking-wider"
                >
                  {lang === 'hi' ? 'एक और समीक्षा दर्ज करें' : 'Submit Another Review'}
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold text-xs rounded-xl transition-all uppercase tracking-wider text-center"
                >
                  {lang === 'hi' ? 'होम पेज पर जाएं' : 'Return to Home'}
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-5">
              
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    {lang === 'hi' ? 'रेटिंग और फीडबैक फॉर्म' : 'Rate Your Consultation'}
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {lang === 'hi' ? 'केवल 1 मिनट में अपनी राय साझा करें' : 'Takes less than 1 minute to complete'}
                  </p>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              </div>

              {formError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold">
                  {formError}
                </div>
              )}

              {/* Patient Name */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase font-extrabold text-slate-800">
                  {lang === 'hi' ? 'आपका नाम (Patient Name)' : 'Your Name'} <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'hi' ? 'उदा. राहुल कुमार' : 'e.g. Rahul Kumar'}
                  value={reviewForm.patientName}
                  onChange={(e) => setReviewForm({ ...reviewForm, patientName: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 transition-all font-bold text-xs"
                />
              </div>

              {/* Star Rating selector */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <label className="block text-[11px] uppercase font-extrabold text-slate-800">
                  {lang === 'hi' ? 'क्लिनिक अनुभव रेटिंग चुनें' : 'Select Star Rating'} <span className="text-rose-600">*</span>
                </label>
                <div className="flex justify-center items-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: stars })}
                      className="p-1.5 focus:outline-none hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-9 h-9 sm:w-10 sm:h-10 ${
                          reviewForm.rating >= stars ? 'fill-amber-400 text-amber-400 drop-shadow-md' : 'text-slate-300 fill-slate-100'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-[11px] font-black text-[#55100D]">
                  {getRatingLabel(reviewForm.rating)}
                </div>
              </div>

              {/* Feedback Message */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase font-extrabold text-slate-800">
                  {lang === 'hi' ? 'समीक्षा एवं अनुभव (Feedback Message)' : 'Your Feedback & Recovery Experience'} <span className="text-rose-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    lang === 'hi'
                      ? 'अपनी बीमारी में सुधार, डॉक्टर के व्यवहार या क्लिनिक परामर्श के बारे में लिखें...'
                      : 'Share details about your health improvement, doctor guidance, or consultation experience...'
                  }
                  value={reviewForm.message}
                  onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#DD0200] focus:ring-1 focus:ring-[#DD0200]/25 transition-all font-semibold text-xs resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#55100D] via-[#DD0200] to-[#55100D] hover:from-[#DD0200] hover:to-[#55100D] text-white font-black text-xs rounded-xl shadow-lg transition-all uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{lang === 'hi' ? 'सबमिट हो रहा है...' : 'Submitting Feedback...'}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>{lang === 'hi' ? 'समीक्षा जमा करें (Submit Review)' : 'Submit Rating & Review'}</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-slate-500 font-bold space-y-1">
          <p>DR. Q.H. KHAN CLASSICAL HOMOEOPATHIC CLINIC</p>
          <p>Nagmatia Road, Gaya, Bihar, India • Helplines: 9709786669 | 9135404090 | 9097211989</p>
        </div>

      </div>
    </div>
  );
}
