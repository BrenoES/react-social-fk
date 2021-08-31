import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import HomeRoutes from './routes/HomeRoutes';

const Container = styled.div`
  background: #fafafa;
  min-height: 100vh;
`;

function App() {
  return (
    <Container>
      <Router>
        <NavBar></NavBar>
        <HomeRoutes />
      </Router>
    </Container>
  );
}

export default App;
