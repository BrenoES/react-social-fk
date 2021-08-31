import styled from 'styled-components';

interface MenuProps {
  isOpen: boolean;
}

export const Nav = styled.nav`
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #dddddd;
  box-shadow: 0 3px 6px -3px rgb(0 0 0 / 40%);
`;

export const Logo = styled.a`
  padding: 1rem 0;
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5rem;
`;

export const Hamburger = styled.div`
  display: none;

  span {
    height: 2px;
    width: 25px;
    background: #000;
    margin: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    cursor: pointer;
    flex-direction: column;
    display: flex;
  }
`;

export const Menu = styled.ul<MenuProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
  }
`;

export const MenuItem = styled.li`
  list-style: none;
  padding: 1rem 2rem;
  a {
    text-decoration: none;
    text-align: center;
    color: #1976d2;
    transition: all 0.3s ease-in;
    font-size: 1.1rem;
    :hover {
      color: #000;
    }
  }
`;
