import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const Ce1Page = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="ce1"
      blogpostsLimit={15}
      blogpostsTitle="Les news du CE1"
    />
  );
};

export default Ce1Page;
