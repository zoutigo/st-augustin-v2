import { GenericEntityPage } from '@/components/dashboard/entities/entity-generic-landing-page';
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
