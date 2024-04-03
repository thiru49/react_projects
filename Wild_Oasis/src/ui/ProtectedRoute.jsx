import React, { useEffect } from 'react';
import useAuthentication from '../features/authentication/useUser';
import styled from 'styled-components';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading ,isAuthenticated} = useAuthentication();
  console.log(isAuthenticated)
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // Add additional condition or component here if needed
  if(isAuthenticated) return children;
}

export default ProtectedRoute;
