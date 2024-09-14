import { getPathColor } from '@/lib/get-path-color';
import { usePathname } from 'next/navigation';

const usePageColor = () => {
  const pathname = usePathname();

  return getPathColor(pathname);
};

export default usePageColor;
