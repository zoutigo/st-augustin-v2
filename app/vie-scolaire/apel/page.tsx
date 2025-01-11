import { GenericEntityPage } from '@/components/classrooms/generic-entity-page';
import React from 'react';
type Props = {};

const ApelPage = async (props: Props) => {
  return (
    <GenericEntityPage
      entitySlug="apel"
      blogpostsLimit={15}
      blogpostsTitle="News de l'APEL"
    />
  );
};

export default ApelPage;
