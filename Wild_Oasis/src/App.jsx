import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Row from "./ui/Row";
import Button from "./ui/Button";
import Heading from "./ui/Heading";

const StyledApp = styled.main``;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal">
          <Heading>The Wild Oasis</Heading>
          <div>
            <Button>checkIn</Button>
            <Button>checkOut</Button>
          </div>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
