import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Routage des langues (fichier `proxy`, qui remplace `middleware` depuis
 * Next.js 16).
 *
 * - `/faq`      -> reecrit vers `/fr/faq` : le francais garde les URLs
 *                  historiques, sans prefixe ni redirection.
 * - `/en/faq`   -> laisse passer tel quel.
 * - `/fr/faq`   -> redirige vers `/faq` pour eviter le contenu dupplique.
 *
 * Aucune redirection automatique selon la langue du navigateur : elle
 * casserait les URLs indexees et surprendrait le visiteur. Le choix se fait
 * via le selecteur de langue de l'en-tete.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const sansPrefixe = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(new URL(`${sansPrefixe}${search}`, request.url), 308);
  }

  const dejaPrefixe = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (dejaPrefixe) return NextResponse.next();

  return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}${search}`, request.url));
}

export const config = {
  /* on ignore les fichiers statiques, l'API et les fichiers de racine (robots,
     sitemap, favicons, images) : seules les pages sont concernees */
  matcher: ["/((?!_next|api|images|.*\\.[\\w]+$).*)"],
};
