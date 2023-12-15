import { Container } from "./styles";
import stoneLogo from "../../assets/stone-logo.svg";

export function Header() {
  return (
    <Container>
      <img src={stoneLogo} alt="Logo da Stone" />

      <div>
        <span>14 de janeiro 2021 | 21:00 UTC</span>
        <p>Dados de câmbio disponibilizados pela Morningstar.</p>
      </div>
    </Container>
  );
}
