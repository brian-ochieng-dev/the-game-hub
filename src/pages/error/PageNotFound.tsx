import { Link } from "react-router-dom";
import { Container } from "globalStyles";

function PageNotFound() {
  return (
    <Container>
      <>
        <h2>404</h2>
        <h2>Page not found</h2>
      </>
      <Link to="./">Go back to home</Link>
    </Container>
  );
}

export default PageNotFound;
