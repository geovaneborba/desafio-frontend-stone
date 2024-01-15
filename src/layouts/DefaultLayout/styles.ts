import styled from "styled-components";
import backgroundImage from "../../assets/background.svg";

export const Container = styled.div`
  background-image: url(${backgroundImage});
  height: 100vh;
  background-position: 100%;
  background-repeat: no-repeat;
  padding: 4rem;

  @media (max-width: 620px) {
    background-image: none;
    padding: 1rem;
  }

  @media (max-width: 1440px) {
    background-size: 100% 100%;
    max-width: 1440px;
    margin: 0 auto;
  }
`;
