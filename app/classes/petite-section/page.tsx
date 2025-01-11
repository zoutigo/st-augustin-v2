import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const PetiteSectionPage = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="ps"
      blogpostsLimit={15}
      blogpostsTitle="Les news de la Petite Section"
    />
  );
};

export default PetiteSectionPage;
