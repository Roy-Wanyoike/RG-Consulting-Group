"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  clientTypes,
  contactSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/validations";

type SubmitState = { type: "success" | "error"; message: string } | null;

const inputClassName =
  "mt-2 w-full rounded-sm border border-forest/20 bg-white px-4 py-3 text-forest outline-none transition placeholder:text-forest/45 focus:border-gold focus:ring-2 focus:ring-gold/25 disabled:cursor-not-allowed disabled:opacity-60";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState(null);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => null)) as
        | { message?: string; errors?: Record<string, string[]> }
        | null;

      if (!response.ok) {
        if (response.status === 422 && result?.errors) {
          for (const [field, messages] of Object.entries(result.errors)) {
            if (field in values && messages?.[0]) {
              setError(field as keyof ContactFormValues, {
                type: "server",
                message: messages[0],
              });
            }
          }
        }
        throw new Error(
          result?.message ?? "We could not send your request. Please try again.",
        );
      }

      setSubmitState({
        type: "success",
        message: "Thank you. Your consultation request has been sent.",
      });
      reset();
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error instanceof DOMException && error.name === "AbortError"
            ? "The request took too long. Please check your connection and try again."
            : error instanceof Error
            ? error.message
            : "We could not send your request. Please call or email us instead.",
      });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const fieldError = (name: keyof ContactFormValues) => {
    const message = errors[name]?.message;
    return typeof message === "string" ? message : undefined;
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div hidden>
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" error={fieldError("name")}>
          <input
            id="name"
            autoComplete="name"
            required
            aria-required="true"
            className={inputClassName}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            disabled={isSubmitting}
            {...register("name")}
          />
        </Field>
        <Field label="Phone Number" name="phone" error={fieldError("phone")}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            placeholder="+254 700 000 000"
            className={inputClassName}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            disabled={isSubmitting}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Email Address" name="email" error={fieldError("email")}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          className={inputClassName}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isSubmitting}
          {...register("email")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Client Type"
          name="clientType"
          error={fieldError("clientType")}
        >
          <select
            id="clientType"
            className={inputClassName}
            aria-invalid={Boolean(errors.clientType)}
            aria-describedby={errors.clientType ? "clientType-error" : undefined}
            disabled={isSubmitting}
            required
            aria-required="true"
            defaultValue=""
            {...register("clientType")}
          >
            <option value="" disabled>Select one</option>
            {clientTypes.map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field
          label="Service Required"
          name="service"
          error={fieldError("service")}
        >
          <select
            id="service"
            className={inputClassName}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            disabled={isSubmitting}
            required
            aria-required="true"
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Message" name="message" error={fieldError("message")}>
        <textarea
          id="message"
          rows={5}
          className={`${inputClassName} resize-y`}
          placeholder="Tell us how we can help."
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-hint message-error" : "message-hint"}
          disabled={isSubmitting}
          {...register("message")}
        />
        <p id="message-hint" className="mt-2 text-xs text-forest/60">
          Please do not include passwords, PINs or other sensitive credentials.
        </p>
      </Field>

      {submitState ? (
        <div
          className={`rounded-sm border px-4 py-3 text-sm ${
            submitState.type === "success"
              ? "border-emerald-700/30 bg-emerald-50 text-emerald-900"
              : "border-red-700/30 bg-red-50 text-red-900"
          }`}
          role={submitState.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {submitState.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-forest px-6 py-3 font-semibold text-white transition hover:bg-forest-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto"
      >
        {isSubmitting ? (
          <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…</>
        ) : (
          <><Send className="size-4" aria-hidden="true" /> Request Consultation</>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-forest">
        {label} <span className="text-gold-dark" aria-hidden="true">*</span>
      </label>
      {children}
      {error ? <p id={`${name}-error`} className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
