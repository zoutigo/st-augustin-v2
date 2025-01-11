import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const OgecPage = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="ogec"
      blogpostsLimit={15}
      blogpostsTitle="News de l'OGEC"
    />
  );
};

export default OgecPage;
