"use client";

import { Button } from "@/components/ui/button";
import React, { ReactNode, useMemo, useState } from "react";
import { RiMessage3Fill } from "react-icons/ri";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

interface StyledParagraphProps {
  children: ReactNode;
}

const StyledParagraph: React.FC<StyledParagraphProps> = ({ children }) => (
  <p className="my-6 md:my-8 mx-4 text-secondary text-lg md:text-xl leading-relaxed">
    {children}
  </p>
);

export const LandingMessage = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage((prev) => !prev);
  };

  const paragraphs = useMemo(
    () => [
      `L'ecole Saint Augustin vous souhaite la bienvenue.`,
      `Bienveillance et entraide. Un projet que l'ensemble de l'équipe éducative installe au coeur de l'école.`,
      `L'école St Augustin, école catholique sous contrat d'association avec l'état, se situe au coeur de Crémieu, cité médiévale iséroise, à une cinquantaine de kilomètres au sud-est de Lyon.`,
      `Toute l'équipe pédagogique a à coeur un encadrement et un enseignement prenant en compte chaque enfant : ateliers, décloisonnements, différenciations (aides pédagogiques, bilans pédagogiques, conseils, contrats, groupes de travail, soutien, partenariat avec les parents ...).`,
      `Je vous invite à découvrir les 10 classes de l'établissement (5 classes de maternelle et 5 classes de primaire) avec ce que vivent ses 220 élèves, son équipe éducative, comprendre sa politique et son organisation avec ses projets, son OGEC, son APEL...`,
    ],
    [],
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary/40 via-white to-secondary/10 py-10 px-4 md:py-14 md:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 top-4 w-32 h-32 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col gap-6 md:gap-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-md p-6 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-secondary/70">
              Le mot de la direction
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold font-cursive text-secondary"
              data-testid="landing-welcome-title"
            >
              {paragraphs[0]}
            </h2>
            <p className="text-base md:text-lg text-secondary/80 mt-2 max-w-3xl">
              Découvrez notre projet éducatif, nos valeurs et la vie de
              l&apos;école.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={handleClick}
            className="inline-flex items-center gap-2"
          >
            {showMessage ? (
              <>
                Fermer
                <FiArrowUpCircle className="h-5 w-5" />
              </>
            ) : (
              <>
                Lire le message
                <FiArrowDownCircle className="h-5 w-5" />
              </>
            )}
          </Button>
        </header>

        {showMessage && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-secondary/10">
              {paragraphs.slice(1).map((para, index) => (
                <StyledParagraph key={index}>{para}</StyledParagraph>
              ))}
            </div>

            <aside className="md:col-span-4 flex flex-col gap-4 bg-secondary text-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <RiMessage3Fill className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                    Direction
                  </p>
                  <p className="text-xl font-semibold">Kelly GROSJEAN</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">
                “Bienveillance, entraide et exigence sont au cœur de notre
                quotidien. Merci aux familles, aux enfants et à l&apos;équipe
                pour leur confiance.”
              </p>

              <Button
                variant="outline"
                className="text-secondary bg-white hover:bg-white/90"
                onClick={() => setShowMessage(false)}
              >
                Fermer le mot du principal
              </Button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};
