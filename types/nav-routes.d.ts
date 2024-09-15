export type FinalRoute = {
  name: string;
  path: string;
  slug: string;
};

export type SubRoute = {
  name: string;
  path: string;
  slug: string;
  finalroutes?: FinalRoute[];
};

export type NavRoute = {
  name: string;
  path: string;
  slug: string;
  subroutes?: SubRoute[];
};
