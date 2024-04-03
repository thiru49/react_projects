import { useMutation } from "@tanstack/react-query"
import { signUp } from "../../services/apiAuth"
import toast from "react-hot-toast"


const useSignup = () => {

  const {mutate:signup,isPending}=useMutation({
    mutationFn:({fullName,email,password})=>signUp({fullName,email,password}),
    onSuccess:(user)=>{
        console.log(user)
        toast.success("Account successfully created! Please verify the new account from the user's email address")
    },
    onError:(err)=>{
        toast.error(`signup error ${err}`)
    }
  })
  return { signup,isPending}
}

export default useSignup;