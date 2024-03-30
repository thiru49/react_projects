import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("user SuccessFully login");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { login, isPending };
};

export default useLogin;
