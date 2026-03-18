"use client";

import { useState } from "react";

const SUBJECTS = [
  "General Inquiry",
  "Bridal Appointment",
  "Online Order Status",
  "Press & Media",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">check_circle</span>
        </div>
        <h3 className="font-display text-2xl font-light italic">Message Sent</h3>
        <p className="text-slate-500 leading-relaxed">
          Thank you for reaching out. Our team will get back to you within 24–48 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "General Inquiry", message: "" }); }}
          className="mt-4 text-sm text-primary underline underline-offset-4 uppercase tracking-widest font-bold"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const inputClass =
    "bg-transparent border-b border-slate-300 focus:border-primary px-0 py-3 text-base placeholder:text-slate-400 transition-colors outline-none w-full";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">
          Subject
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="bg-transparent border-b border-slate-300 focus:border-primary px-0 py-3 text-base text-slate-600 transition-colors outline-none appearance-none w-full cursor-pointer"
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us how we can help..."
          value={form.message}
          onChange={handleChange}
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="bg-primary text-white px-12 py-4 rounded-none hover:bg-primary/90 transition-all uppercase text-sm tracking-[0.3em] font-bold"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
