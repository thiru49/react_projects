import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getLogout } from '../../services/apiAuth'

const useLogout = () => {
   const navigate =useNavigate()
   const queryClient =useQueryClient()
   const {mutate:logout,isPending}= useMutation({
    mutationFn:getLogout,
    onSuccess:()=>{
        queryClient.removeQueries()
        navigate('/login',{replace:true})
    },
    onError:(err)=>{
       toast(`some error happen in logout ${err}`)
    }
    })

    return {logout,isPending}

}

export default useLogout