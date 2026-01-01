import { useSession } from "next-auth/react";

export const useCurrentGrade = () => {
  const session = useSession();

  return session.data?.user?.grade;
};
