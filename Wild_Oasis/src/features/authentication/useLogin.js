
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

const useLogin = () => {
  const queryClient =useQueryClient()
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(['user'],user)
      toast.success("user SuccessFully login");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(`erron on login${err}`);
    },
  });
  return { login, isPending };
};

export default useLogin;


