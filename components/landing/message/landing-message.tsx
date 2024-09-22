'use client';

import React, { ReactNode } from 'react';

interface StyledParagraphProps {
  children: ReactNode;
}

const StyledParagraph: React.FC<StyledParagraphProps> = ({ children }) => (
  <p className="my-10 mx-4 text-white text-2xl tracking-widest text-justify">
    {children}
  </p>
);

export const LandingMessage = () => {
  const introPara = `L'ecole saint augustin vous souhaite la bienvenue.`;

  const zeroPara = `
  Bienveillance et entraide. Un projet que l'ensemble de l'équipe éducative installe au coeur de l'école.
  `;
  const firstPara = `
  L'école St Augustin, école catholique sous contrat d'association
  avec l'état, se situe au coeur de Crémieu, cité médiévale iséroise,
  à une cinquantaine de kilomètres au sud-est de Lyon.
  `;
  const secondPara = `
  Toute l'équipe pédagogique a à coeur un encadrement et un
  enseignement prenant en compte chaque enfant : ateliers,
  décloisonnements, différenciations (aides pédagogiques, bilans
  pédagogiques, conseils, contrats, groupes de travail, soutien,
  partenariat avec les parents ...).`;

  const thirdPara = `
  Je vous invite à découvrir les 10 classes de l'établissement (5 classes de maternelle et 5 classes de primaire) avec ce que vivent
  ses 220 élèves, son équipe éducative, comprendre sa politique et son
  organisation avec ses projets, son OGEC, son APEL...`;
  return (
    <div className="bg-secondary">
      <div className="uppercase text-center text-primary font-cursive tracking-extra-wide leading-snug text-2xl mx-4 my-6 font-semibold">
        <p>{introPara} </p>
      </div>
      <div>
        <StyledParagraph>{zeroPara} </StyledParagraph>
        <StyledParagraph>{firstPara} </StyledParagraph>
        <StyledParagraph>{secondPara} </StyledParagraph>
        <StyledParagraph>{thirdPara} </StyledParagraph>
      </div>
      <div className="text-right text-lg text-primary font-cursive my-10 mx-4">
        {' '}
        <span>La directrice : </span>{' '}
        <span className="font-semibold">Kelly GROSJEAN</span>{' '}
      </div>
    </div>
  );
};
