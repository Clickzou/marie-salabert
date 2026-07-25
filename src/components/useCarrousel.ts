"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Duree d'affichage d'une vue avant que le carrousel n'avance seul. */
const REPOS = 5000;

/**
 * Comportement commun aux carrousels a defilement natif : bornes debut/fin pour
 * desactiver les fleches, avance d'une vue, et defilement automatique.
 *
 * Le mouvement se suspend des qu'il generait — au survol, quand le focus entre
 * dans la piste, et lorsque la piste sort de l'ecran — et s'arrete pour de bon a
 * la premiere action manuelle : reprendre la main doit rendre la main. Il ne
 * demarre pas du tout si le systeme demande moins d'animations.
 *
 * Aucune commande de lecture/pause n'est exposee : choix assume du projet. Les
 * carrousels ne repondent donc pas au critere WCAG 2.2.2, qui reclame un moyen
 * explicite d'interrompre un mouvement automatique durant plus de 5 secondes ;
 * la suspension au survol et au focus ne le remplace ni au clavier ni au
 * tactile.
 */
export function useCarrousel() {
  const piste = useRef<HTMLUListElement | null>(null);
  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(false);

  /* `anime` est le choix de l'utilisateur, les autres l'etat du contexte. */
  const [anime, setAnime] = useState(true);
  const [survol, setSurvol] = useState(false);
  const [focusDedans, setFocusDedans] = useState(false);
  const [visible, setVisible] = useState(false);
  const [motionReduit, setMotionReduit] = useState(false);

  const majBornes = useCallback(() => {
    const el = piste.current;
    if (!el) return;
    setDebut(el.scrollLeft < 8);
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    majBornes();
    window.addEventListener("resize", majBornes);
    return () => window.removeEventListener("resize", majBornes);
  }, [majBornes]);

  const defiler = useCallback((sens: 1 | -1) => {
    const el = piste.current;
    if (!el) return;
    const vue = el.querySelector("li");
    const pas = vue ? vue.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: sens * pas, behavior: "smooth" });
  }, []);

  const reprendreLaMain = useCallback(() => setAnime(false), []);

  /* Animer une section qu'on ne regarde pas fait tourner un minuteur pour rien. */
  useEffect(() => {
    const el = piste.current;
    if (!el) return;
    const observateur = new IntersectionObserver(([entree]) => setVisible(entree.isIntersecting), {
      threshold: 0.35,
    });
    observateur.observe(el);
    return () => observateur.disconnect();
  }, []);

  useEffect(() => {
    const requete = window.matchMedia("(prefers-reduced-motion: reduce)");
    const maj = () => setMotionReduit(requete.matches);
    maj();
    requete.addEventListener("change", maj);
    return () => requete.removeEventListener("change", maj);
  }, []);

  useEffect(() => {
    if (!anime || motionReduit || !visible || survol || focusDedans) return;
    const minuteur = window.setInterval(() => {
      const el = piste.current;
      if (!el) return;
      const auBout = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (auBout) el.scrollTo({ left: 0, behavior: "smooth" });
      else defiler(1);
    }, REPOS);
    return () => window.clearInterval(minuteur);
  }, [anime, motionReduit, visible, survol, focusDedans, defiler]);

  return {
    debut,
    fin,
    defiler,
    reprendreLaMain,
    /** A etaler sur la piste (`<ul>`). */
    proprietesPiste: {
      ref: piste,
      onScroll: majBornes,
      onPointerDown: reprendreLaMain,
    },
    /** A etaler sur le conteneur qui englobe piste et commandes. */
    proprietesConteneur: {
      onMouseEnter: () => setSurvol(true),
      onMouseLeave: () => setSurvol(false),
      onFocusCapture: () => setFocusDedans(true),
      onBlurCapture: () => setFocusDedans(false),
    },
  };
}
