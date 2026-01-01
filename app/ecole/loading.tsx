const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 w-1/3 bg-secondary/20 rounded"></div>
    <div className="h-4 w-3/4 bg-secondary/15 rounded"></div>
    <div className="h-4 w-2/3 bg-secondary/15 rounded"></div>
    <div className="h-64 w-full bg-secondary/10 rounded-lg"></div>
  </div>
);

export default function Loading() {
  return (
    <div className="mx-[12%] my-6">
      <Skeleton />
    </div>
  );
}
