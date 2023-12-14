import styled from "styled-components";
import backgroundImage from "../../assets/background.svg";

export const Container = styled.div`
  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;

  padding: 4rem;
`;
