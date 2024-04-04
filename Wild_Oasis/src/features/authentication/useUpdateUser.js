import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: ({ password,fullName,avatar }) => updateCurrentUser({password,fullName,avatar}),
    onSuccess: ({user}) => {
      console.log(user)
      queryClient.setQueryData('user',user)
      toast.success("UserName and Avatar update successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isPending };
}
