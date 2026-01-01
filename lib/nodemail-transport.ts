import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const nodemailerOptionsYahoo = {
  host: process.env.EMAIL_SERVER_HOST_YAHOO,
  port: Number(process.env.EMAIL_SERVER_PORT_YAHOO),
  auth: {
    user: process.env.EMAIL_SERVER_USER_YAHOO,
    pass: process.env.EMAIL_SERVER_PASSWORD_YAHOO,
  },
  secure: true,
  from: process.env.EMAIL_FROM_YAHOO,
};

export const nodemailerTranspYahoo = nodemailer.createTransport({
  host: nodemailerOptionsYahoo.host,
  port: nodemailerOptionsYahoo.port,
  auth: nodemailerOptionsYahoo.auth,
  secure: nodemailerOptionsYahoo.secure,
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await nodemailerTranspYahoo.sendMail({
    to: email,
    from: nodemailerOptionsYahoo.from,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email  </p>`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await nodemailerTranspYahoo.sendMail({
    to: email,
    from: nodemailerOptionsYahoo.from,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> reset your password </p>`,
  });
};
