'use client';

import { Button } from '@/components/ui/button';
import React, { ReactNode, useState } from 'react';
import { RiMessage3Fill } from 'react-icons/ri';

interface StyledParagraphProps {
  children: ReactNode;
}

const StyledParagraph: React.FC<StyledParagraphProps> = ({ children }) => (
  <p className="my-10 mx-4 text-white text-xl tracking-widest text-justify">
    {children}
  </p>
);

export const LandingMessage = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage((prev) => !prev);
  };

  const paragraphs = [
    `L'ecole Saint Augustin vous souhaite la bienvenue.`,
    `Bienveillance et entraide. Un projet que l'ensemble de l'équipe éducative installe au coeur de l'école.`,
    `L'école St Augustin, école catholique sous contrat d'association avec l'état, se situe au coeur de Crémieu, cité médiévale iséroise, à une cinquantaine de kilomètres au sud-est de Lyon.`,
    `Toute l'équipe pédagogique a à coeur un encadrement et un enseignement prenant en compte chaque enfant : ateliers, décloisonnements, différenciations (aides pédagogiques, bilans pédagogiques, conseils, contrats, groupes de travail, soutien, partenariat avec les parents ...).`,
    `Je vous invite à découvrir les 10 classes de l'établissement (5 classes de maternelle et 5 classes de primaire) avec ce que vivent ses 220 élèves, son équipe éducative, comprendre sa politique et son organisation avec ses projets, son OGEC, son APEL...`,
  ];

  return (
    <div className="bg-secondary flex flex-col items-center justify-center py-10">
      <div className="uppercase text-center text-primary font-cursive tracking-extra-wide leading-snug text-2xl mx-4 my-6 font-semibold lg:text-4xl">
        <p>{paragraphs[0]}</p>
      </div>

      <Button
        variant="default"
        onClick={handleClick}
        className="flex items-center gap-3"
      >
        <RiMessage3Fill className="text-6xl text-secondary" />
        <span className="text-secondary">{'Le mot du principal'}</span>
      </Button>

      {showMessage && (
        <div className="mt-8 px-4">
          {paragraphs.slice(1).map((para, index) => (
            <StyledParagraph key={index}>{para}</StyledParagraph>
          ))}

          <div className="text-right text-lg text-primary font-cursive my-10 mx-4">
            <span>La directrice : </span>
            <span className="font-semibold">Kelly GROSJEAN</span>
          </div>
        </div>
      )}
    </div>
  );
};
