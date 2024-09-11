export type SubRoute = {
  name: string;
  path: string;
  slug: string;
  subroutes?: {
    name: string;
    path: string;
    slug: string;
  };
};
export type NavRoute = {
  name: string;
  path: string;
  slug: string;
  subroutes?: SubRoute[];
};
