import {
  Nav,
  NavHeading,
  ThemeIcon,
  NavbarLogo,
  SunIcon,
  MoonIcon,
} from "./NavBar.styled";

interface NavbarProps {
  theme: string;
  setTheme: Function;
}

function Navbar({ theme, setTheme }: NavbarProps) {
  const changeTheme = () => {
    setTheme(() => (theme === "light" ? "dark" : "light"));
  };

  return (
    <Nav>
      <NavbarLogo to="/">
        <NavHeading>Game Hub</NavHeading>
      </NavbarLogo>

      <ThemeIcon onClick={changeTheme}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </ThemeIcon>
    </Nav>
  );
}

export default Navbar;
