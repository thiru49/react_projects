import React from "react";
import styled from "styled-components";
import Logout from "../features/authentication/LogOut";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:2.4rem;
`;
const Header = () => {
  return <StyledHeader>
    <UserAvatar/>
    <HeaderMenu/>
  </StyledHeader>;
};

export default Header;
