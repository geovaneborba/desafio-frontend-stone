import { Container } from "./styles";
import stoneLogo from "../../assets/stone-logo.svg";
import dayjs from "dayjs";

export function Header() {
  return (
    <Container>
      <img src={stoneLogo} alt="Logo da Stone" />

      <div>
        <span>{dayjs().format("DD [de] MMMM YYYY | HH:mm [UTC]")}</span>
        <p>Dados de câmbio disponibilizados pela Morningstar.</p>
      </div>
    </Container>
  );
}
