/**
 * Boutons de partage de l'article (widget « Share Buttons » d'Elementor,
 * skin degrade, couleurs officielles des reseaux).
 */

type Network = {
  key: string;
  label: string;
  /** degrade horizontal repris du skin « gradient » d'Elementor */
  gradient: string;
  icon: React.ReactNode;
  url: (link: string, title: string, image: string) => string;
};

const networks: Network[] = [
  {
    key: "facebook",
    label: "Partager sur Facebook",
    gradient: "linear-gradient(90deg,#3b5998 0%,#344e86 40%,#3b5998 100%)",
    icon: (
      <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
    ),
    url: (link, title) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(title)}`,
  },
  {
    key: "twitter",
    label: "Partager sur Twitter",
    gradient: "linear-gradient(90deg,#1da1f2 0%,#1a8fd7 40%,#1da1f2 100%)",
    icon: (
      <path d="M22 5.9c-.7.3-1.5.6-2.4.7a4.1 4.1 0 001.8-2.3c-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.8A11.7 11.7 0 013.4 4.7a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 01-1.9.1 4.1 4.1 0 003.9 2.8A8.3 8.3 0 012 18.4a11.7 11.7 0 006.3 1.9c7.6 0 11.7-6.3 11.7-11.7v-.6c.8-.6 1.5-1.3 2-2.1z" />
    ),
    url: (link, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(title)}`,
  },
  {
    key: "linkedin",
    label: "Partager sur LinkedIn",
    gradient: "linear-gradient(90deg,#0077b5 0%,#006ca5 40%,#0077b5 100%)",
    icon: (
      <path d="M6.9 20H3.6V9.4h3.3V20zM5.2 8a1.9 1.9 0 110-3.9 1.9 1.9 0 010 3.9zM20.4 20h-3.3v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H10V9.4h3.2v1.5h.1a3.5 3.5 0 013.1-1.7c3.4 0 4 2.2 4 5.1V20z" />
    ),
    url: (link, title) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}`,
  },
  {
    key: "pinterest",
    label: "Partager sur Pinterest",
    gradient: "linear-gradient(90deg,#bd081c 0%,#a80719 40%,#bd081c 100%)",
    icon: (
      <path d="M12 2a10 10 0 00-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.4-4.4-4.4-3 0-4.8 2.2-4.8 4.6 0 .9.3 1.9.8 2.4l.2.3-.3 1c0 .2-.2.3-.4.2-1.4-.7-2.2-2.7-2.2-4.3 0-3.5 2.5-6.7 7.3-6.7 3.8 0 6.8 2.7 6.8 6.4 0 3.8-2.4 6.9-5.7 6.9-1.1 0-2.2-.6-2.5-1.3l-.7 2.7c-.3 1-1 2.2-1.5 3A10 10 0 1012 2z" />
    ),
    url: (link, title, image) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(link)}&description=${encodeURIComponent(title)}&media=${encodeURIComponent(image)}`,
  },
];

export default function ArticleShare({
  url,
  title,
  image,
}: {
  url: string;
  title: string;
  image: string;
}) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {networks.map((n) => (
        <li key={n.key}>
          <a
            href={n.url(url, title, image)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center text-white transition-opacity hover:opacity-90"
            style={{ backgroundImage: n.gradient }}
          >
            <span className="grid h-10 w-11 shrink-0 place-items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {n.icon}
              </svg>
            </span>
            <span className="pl-2 text-[14px]">{n.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
