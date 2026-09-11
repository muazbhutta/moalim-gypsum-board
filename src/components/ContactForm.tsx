"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { whatsappLink } from "@/content/site";
import type { Ui } from "@/content/types";
import { WhatsAppIcon } from "./Icons";

type Field = "name" | "phone" | "details";

const toLatinDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));

/** Accepts 05xxxxxxxx, 5xxxxxxxx, +9665xxxxxxxx, 009665xxxxxxxx (Arabic digits too). Returns 05xxxxxxxx or null. */
export function normalizeSaudiMobile(raw: string): string | null {
  let d = toLatinDigits(raw).replace(/\D/g, "");
  if (d.startsWith("00966")) d = d.slice(5);
  else if (d.startsWith("966")) d = d.slice(3);
  if (/^5\d{8}$/.test(d)) d = `0${d}`;
  return /^05\d{8}$/.test(d) ? d : null;
}

/** No backend: validates, then opens WhatsApp with a pre-filled message to the business number. */
export function ContactForm({ text }: { text: Ui["form"] }) {
  const id = useId();
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const phone = normalizeSaudiMobile(String(fd.get("phone") ?? ""));
    const details = String(fd.get("details") ?? "").trim();

    const next: Partial<Record<Field, string>> = {};
    if (name.length < 2) next.name = text.errors.name;
    if (!phone) next.phone = text.errors.phone;
    if (details.length < 10) next.details = text.errors.details;
    setErrors(next);

    if (next.name) return nameRef.current?.focus();
    if (next.phone) return phoneRef.current?.focus();
    if (next.details) return detailsRef.current?.focus();

    const message = text.message.replace("{name}", name).replace("{phone}", phone!).replace("{details}", details);
    const url = whatsappLink(message);
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
  }

  const hasErrors = Object.keys(errors).length > 0;
  const input =
    "mt-2 block w-full rounded-lg border border-[#8a8175] bg-white px-4 py-3 text-base text-ink placeholder:text-[#6b6b6b] focus:border-gold-700 aria-[invalid=true]:border-red-700";
  const req = (
    <>
      <span aria-hidden="true" className="text-red-700">
        {" "}
        *
      </span>
      <span className="sr-only"> ({text.required})</span>
    </>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {hasErrors ? (
        <p role="alert" className="rounded-lg border border-red-700 bg-red-50 px-4 py-3 font-medium text-red-800">
          {text.errors.summary}
        </p>
      ) : null}

      <div>
        <label htmlFor={`${id}-name`} className="font-bold text-ink">
          {text.name}
          {req}
        </label>
        <input
          ref={nameRef}
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder={text.namePlaceholder}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${id}-name-err` : undefined}
          className={input}
        />
        {errors.name ? (
          <p id={`${id}-name-err`} className="mt-1 text-sm font-medium text-red-700">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className="font-bold text-ink">
          {text.phone}
          {req}
        </label>
        <input
          ref={phoneRef}
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          required
          placeholder={text.phonePlaceholder}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
          className={`${input} rtl:text-right`}
        />
        {errors.phone ? (
          <p id={`${id}-phone-err`} className="mt-1 text-sm font-medium text-red-700">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${id}-details`} className="font-bold text-ink">
          {text.details}
          {req}
        </label>
        <textarea
          ref={detailsRef}
          id={`${id}-details`}
          name="details"
          rows={5}
          required
          placeholder={text.detailsPlaceholder}
          aria-invalid={errors.details ? true : undefined}
          aria-describedby={errors.details ? `${id}-details-err` : `${id}-note`}
          className={input}
        />
        {errors.details ? (
          <p id={`${id}-details-err`} className="mt-1 text-sm font-medium text-red-700">
            {errors.details}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-wa px-6 py-3 text-lg font-bold text-white hover:bg-wa-dark sm:w-auto"
      >
        <WhatsAppIcon />
        {text.submit}
      </button>
      <p id={`${id}-note`} className="text-sm text-muted">
        {text.note}
      </p>
    </form>
  );
}
