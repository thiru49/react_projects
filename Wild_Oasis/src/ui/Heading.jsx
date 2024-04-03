import styled, { css } from "styled-components";

const Heading = styled.h1`
  font-size: 20px;
  ${(prop) =>
    prop.as === "h2" &&
    css`
    font-size: :2rem;
    font-weight:600;
  `}
  ${(prop) =>
    prop.as === "h3" &&
    css`
    font-size: :2rem;
    font-weight:500;
  `}
  ${(prop) =>
    prop.as === "h4" &&
    css`
    text-align: center;
    font-size: :3rem;
    font-weight:600;
  `}
`;

export default Heading;
