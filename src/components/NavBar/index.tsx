import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Logo, Hamburger, MenuItem, Menu } from './styles';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <Logo>Social FK</Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuItem>
          <Link to='/'>Meus Contatos</Link>
        </MenuItem>
      </Menu>
    </Nav>
  );
}
