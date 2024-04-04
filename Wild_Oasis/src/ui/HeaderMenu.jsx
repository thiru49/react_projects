import React from 'react'
import styled from 'styled-components'
import ButtonIcon from './ButtonIcon'
import { HiOutlineUser } from 'react-icons/hi2'
import Logout from '../features/authentication/LogOut'
import { useNavigate } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

const StyledHeader = styled.div`
display:flex;
align-items:center;
justify-content:center;
gap:0.6rem;
`
const HeaderMenu = () => {
    const navigate = useNavigate()
  return (
    <StyledHeader>
        <DarkModeToggle/>
        <ButtonIcon onClick={()=>navigate('/account')}>
            <HiOutlineUser/>
        </ButtonIcon>
        <Logout/>
    </StyledHeader>
  )
}

export default HeaderMenu   