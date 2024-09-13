export type SubRoute = {
  name: string;
  path: string;
  slug: string;
  subroutes?: Subroute[];
};
export type NavRoute = {
  name: string;
  path: string;
  slug: string;
  subroutes?: SubRoute[];
};
