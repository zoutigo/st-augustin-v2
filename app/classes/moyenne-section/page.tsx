import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const MoyenneSectionPage = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="ms"
      blogpostsLimit={15}
      blogpostsTitle="Les news de la Moyenne Section"
    />
  );
};

export default MoyenneSectionPage;
