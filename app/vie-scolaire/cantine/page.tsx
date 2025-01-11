import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const CantinePage = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="cantine"
      blogpostsLimit={15}
      blogpostsTitle="Breves et Menus"
    />
  );
};

export default CantinePage;
