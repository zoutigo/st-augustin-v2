import { db } from '@/lib/db';
import { MdDoNotDisturbOnTotalSilence } from 'react-icons/md';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    // const passwordResetToken = await db.passwordResetToken.findUnique({
    //   where: { token },
    // });

    // return passwordResetToken;
    return null;
  } catch (error) {
    return null;
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    // const passwordResetToken = await db.passwordResetToken.findFirst({
    //   where: { email },
    // });

    // return passwordResetToken;
    return null;
  } catch (error) {
    return null;
  }
};
