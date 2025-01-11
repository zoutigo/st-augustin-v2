import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const GrandeSectionPage = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="gs"
      blogpostsLimit={15}
      blogpostsTitle="Les news de la Moyenne Section"
    />
  );
};

export default GrandeSectionPage;
