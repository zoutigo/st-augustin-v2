'use client';
import { UserGrade } from '@prisma/client';
import React from 'react';
import { FormError } from '@/components/form-error';
import { useCurrentGrade } from '@/hooks/use-current-grade';

interface GradeGateProps {
  children: React.ReactNode;
  allowedGrade: UserGrade;
}

export const GradeGate = ({ children, allowedGrade }: GradeGateProps) => {
  const grade = useCurrentGrade();

  if (grade !== allowedGrade) {
    return (
      <FormError message="You do not have permission to view this content !" />
    );
  }
  return <>{children}</>;
};
