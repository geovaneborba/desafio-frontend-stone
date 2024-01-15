import { Container } from "./styles";
import stoneLogo from "../../assets/stone-logo.svg";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Container>
      <Link to={"/"}>
        <img src={stoneLogo} alt="Logo da Stone" />
      </Link>

      <div>
        <span>{dayjs().format("DD [de] MMMM YYYY | HH:mm [UTC]")}</span>
        <p>Dados de câmbio disponibilizados pela Morningstar.</p>
      </div>
    </Container>
  );
}
