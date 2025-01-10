import { GenericEntityPage } from '@/components/dashboard/entities/entity-generic-landing-page';
import React from 'react';
type Props = {};

const PastoralePage = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="pastorale"
      blogpostsLimit={15}
      blogpostsTitle="News Pastorales"
    />
  );
};

export default PastoralePage;
