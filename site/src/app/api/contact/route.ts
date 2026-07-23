import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RECIPIENT = process.env.CONTACT_EMAIL;
const SENDER = process.env.CONTACT_FROM ?? "Site web <onboarding@resend.dev>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

/** Limitation basique par IP : 5 envois / 10 minutes, suffisant pour ce volume. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes envoyées. Merci de réessayer dans quelques minutes." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // champ piege : rempli uniquement par les robots
  if (clean(body.societe)) {
    return NextResponse.json({ ok: true });
  }

  const nom = clean(body.nom, 120);
  const prenom = clean(body.prenom, 120);
  const email = clean(body.email, 200);
  const telephone = clean(body.telephone, 40);
  const message = clean(body.message, 5000);

  if (!nom || !prenom || !telephone || !message) {
    return NextResponse.json(
      { error: "Merci de renseigner les champs obligatoires." },
      { status: 400 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "L'adresse e-mail est invalide." }, { status: 400 });
  }

  if (!RESEND_API_KEY || !RECIPIENT) {
    console.error("contact: RESEND_API_KEY ou CONTACT_EMAIL manquant");
    return NextResponse.json(
      { error: "Le formulaire est momentanément indisponible. Merci de téléphoner au 06 37 88 00 73." },
      { status: 503 },
    );
  }

  const html = `
    <h2>Nouveau message depuis le site</h2>
    <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
    <p><strong>Prénom :</strong> ${escapeHtml(prenom)}</p>
    <p><strong>E-mail :</strong> ${escapeHtml(email) || "non renseigné"}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(telephone)}</p>
    <p><strong>Message :</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SENDER,
      to: [RECIPIENT],
      subject: `Demande de rendez-vous — ${prenom} ${nom}`,
      html,
      ...(email ? { reply_to: email } : {}),
    }),
  });

  if (!res.ok) {
    console.error("contact: envoi Resend échoué", res.status, await res.text());
    return NextResponse.json(
      { error: "L'envoi a échoué. Merci de réessayer ou de téléphoner au 06 37 88 00 73." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
