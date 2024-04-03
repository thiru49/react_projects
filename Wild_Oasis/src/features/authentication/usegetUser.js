import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/apiAuth'


function usegetUser() {
    const {mutations:getUser,isLoading} = useQuery({
        queryKey:['users'],
        queryFn:getCurrentUser
    })
  return {getUser,isLoading}
}

export default usegetUser