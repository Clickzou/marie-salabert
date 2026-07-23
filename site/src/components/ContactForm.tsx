"use client";

import { useState } from "react";

type State = { status: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-[3px] border border-black/15 bg-white px-4 py-3 text-[15px] text-body " +
  "outline-none transition-colors focus:border-plum focus:ring-2 focus:ring-plum/20";

/** Remplace le formulaire Elementor d'origine (memes champs, memes libelles). */
export default function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Envoi impossible");
      form.reset();
      setState({
        status: "sent",
        message: "Merci, votre message a bien été envoyé. Je vous réponds dans les meilleurs délais.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue, merci de réessayer ou de m'appeler directement.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="mb-1.5 block text-[14px] font-medium text-ink">
            Nom <span aria-hidden="true">*</span>
          </label>
          <input id="nom" name="nom" type="text" required autoComplete="family-name" className={field} />
        </div>
        <div>
          <label htmlFor="prenom" className="mb-1.5 block text-[14px] font-medium text-ink">
            Prénom <span aria-hidden="true">*</span>
          </label>
          <input id="prenom" name="prenom" type="text" required autoComplete="given-name" className={field} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium text-ink">
            E-mail
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="telephone" className="mb-1.5 block text-[14px] font-medium text-ink">
            Tél. <span aria-hidden="true">*</span>
          </label>
          <input id="telephone" name="telephone" type="tel" required autoComplete="tel" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[14px] font-medium text-ink">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea id="message" name="message" rows={6} required className={field} />
      </div>

      {/* piege a robots : invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="societe">Ne pas remplir</label>
        <input id="societe" name="societe" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={state.status === "sending"}
          className="w-full rounded-[3px] bg-green px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-plum disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === "sending" ? "Envoi en cours…" : "Envoyer"}
        </button>
        <p className="text-[13px] text-muted">
          Les champs suivis de <span aria-hidden="true">*</span> sont obligatoires.
        </p>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`text-[14px] ${
          state.status === "error" ? "text-plum" : "text-green"
        } ${state.message ? "" : "sr-only"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
