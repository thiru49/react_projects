import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("cabin is successfully deleted ");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (er) => toast.error(er.message),
  });

  return { isPending, deleteCabin };
}
