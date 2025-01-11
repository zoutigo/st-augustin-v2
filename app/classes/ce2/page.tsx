import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const Ce2Page = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="ce2"
      blogpostsLimit={15}
      blogpostsTitle="Les news du CE2"
    />
  );
};

export default Ce2Page;
