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
