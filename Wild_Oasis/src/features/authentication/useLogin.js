<<<<<<< HEAD
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
=======
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { login as loginApi} from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate()
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email,password}) => loginApi({email,password}),
    onSuccess: () => {
      toast.success("you are successfully login now");
      navigate('/dashboard')
    },
    onError: (err) => toast.error(err.message),
  });

  return { login, isPending};
}
>>>>>>> bf4bf16dcac5e19ba59ee398dd42699579942013
