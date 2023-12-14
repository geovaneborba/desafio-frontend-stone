import { Outlet } from "react-router-dom";
import { Container } from "./styles";
import { Header } from "../../components/Header";

export function DefaultLayout() {
  return (
    <>
      <Container>
        <Header />

        <Outlet />
      </Container>
    </>
  );
}
