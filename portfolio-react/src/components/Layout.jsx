import styled from "styled-components";
import Navbar from "./Navbar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 3rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Navbar />
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default Layout;
