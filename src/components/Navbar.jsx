import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: rgba(2, 6, 23, 0.85);
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Brand = styled(NavLink)`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const BrandName = styled.span`
  font-size: 1.15rem;
`;

const BrandRole = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  padding: 0.55rem 0.85rem;
  border-radius: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: rgba(148, 163, 184, 0.12);
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(37, 99, 235, 0.15);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

const MobileButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
  }

  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.3rem;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

const MobileMenu = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
  }

  flex-direction: column;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
`;

const MobileLink = styled(NavLink)`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();


  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Header>
      <Container>
        <Brand to="/">
          <BrandName>Marcos</BrandName>
          <BrandRole>| Frontend</BrandRole>
        </Brand>

        <DesktopNav>
          <NavItem to="/">Inicio</NavItem>
          <NavItem to="/projects">Proyectos</NavItem>
          <NavItem to="/contact">Contacto</NavItem>
        </DesktopNav>

        <MobileButton
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </MobileButton>
      </Container>

      <MobileMenu $open={open} aria-hidden={!open}>
        <MobileLink to="/">Inicio</MobileLink>
        <MobileLink to="/projects">Proyectos</MobileLink>
        <MobileLink to="/contact">Contacto</MobileLink>
      </MobileMenu>
    </Header>
  );
};

export default Navbar;
