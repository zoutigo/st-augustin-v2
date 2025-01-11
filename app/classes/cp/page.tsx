import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const CPPage = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="cp"
      blogpostsLimit={15}
      blogpostsTitle="Les news du CP"
    />
  );
};

export default CPPage;
