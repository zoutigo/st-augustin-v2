import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const Cm2Page = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="cm2"
      blogpostsLimit={15}
      blogpostsTitle="Les news du CM2"
    />
  );
};

export default Cm2Page;
