import "tailwindcss/tailwind-config";

declare module "tailwindcss/tailwind-config" {
  interface TailwindColors {
    ecole: string;
    espaceprive: string;
    classes: string;
    private: string;
    viescolaire: string;
    blog: string;
  }
}
