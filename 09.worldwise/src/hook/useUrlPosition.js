import { useSearchParams } from "react-router-dom";
export const useUrlPosition = () => {
  const [searchParms] = useSearchParams();
  const maplat = searchParms.get("lang");
  const maplng = searchParms.get("lng");
  return [maplat, maplng];
};
