declare module "mime-types" {
  const contentType: (type: string) => string | false;
  const lookup: (path: string) => string | false;
  export { contentType, lookup };
}
