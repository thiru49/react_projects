import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

function useUser() {
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    });
    
    const isAuthenticated = user?.user?.role === 'authenticated';
    
    return { isLoading, user, isAuthenticated, isError };
}

export default useUser;
