import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const Cm1Page = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="cm1"
      blogpostsLimit={15}
      blogpostsTitle="Les news du CM1"
    />
  );
};

export default Cm1Page;
