"use client";

import { useState } from "react";
import type { Dictionnaire } from "@/i18n/dictionnaire";

type State = { status: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-[10px] border border-ink/15 bg-white px-4 py-3 text-[15px] text-body " +
  "outline-none transition-colors focus:border-plum focus:ring-2 focus:ring-plum/20";

/** Remplace le formulaire Elementor d'origine (memes champs, memes libelles). */
export default function ContactForm({ d }: { d: Dictionnaire }) {
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
      setState({ status: "sent", message: d.formulaire.succes });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : d.formulaire.erreur,
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="mb-1.5 block text-[14px] font-medium text-ink">
            {d.formulaire.nom} <span aria-hidden="true">*</span>
          </label>
          <input id="nom" name="nom" type="text" required autoComplete="family-name" className={field} />
        </div>
        <div>
          <label htmlFor="prenom" className="mb-1.5 block text-[14px] font-medium text-ink">
            {d.formulaire.prenom} <span aria-hidden="true">*</span>
          </label>
          <input id="prenom" name="prenom" type="text" required autoComplete="given-name" className={field} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium text-ink">
            {d.formulaire.email}
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="telephone" className="mb-1.5 block text-[14px] font-medium text-ink">
            {d.formulaire.telephone} <span aria-hidden="true">*</span>
          </label>
          <input id="telephone" name="telephone" type="tel" required autoComplete="tel" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[14px] font-medium text-ink">
          {d.formulaire.message} <span aria-hidden="true">*</span>
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
          className="btn-shine w-full rounded-[10px] bg-green px-7 py-4 text-[15px] font-medium text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-green-light disabled:pointer-events-none disabled:opacity-60"
        >
          {state.status === "sending" ? d.formulaire.envoiEnCours : d.formulaire.envoyer}
        </button>
        <p className="text-[13px] text-muted">
          {d.formulaire.champsObligatoires}
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
