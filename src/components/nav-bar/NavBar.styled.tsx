import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export const Nav = styled.div`
  height: 4rem;
  width: 100%;
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  z-index: 1;
`;

export const NavHeading = styled.h1`
  color: ${({ theme }) => theme.text};
`;

export const ThemeIcon = styled.div`
  height: 3rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarLogo = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover,
  &:focus {
    color: black;
  }
`;

export const SunIcon = styled(FaSun)`
  font-size: 2rem;
  color: yellow;
`;

export const MoonIcon = styled(FaMoon)`
  font-size: 2rem;
  color: darkblue;
`;
