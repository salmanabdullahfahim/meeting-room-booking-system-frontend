import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="rounded-md border-2 border-gray-100">
      <Skeleton className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="mt-5 flex items-center justify-between space-x-2">
          <div className="flex gap-x-2 items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12 rounded-md border border-gray-200 p-1 px-2" />
          </div>
          <Skeleton className="h-4 w-24 rounded-full bg-gray-100 px-3 py-1" />
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center mb-2 gap-1 my-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="mt-4 w-full h-10 rounded-sm" />
      </div>
    </div>
  );
}
