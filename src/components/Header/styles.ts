import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  column-gap: 3rem;

  @media (max-width: 620px) {
    flex-direction: column;

    img {
      margin-top: 1rem;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    @media (max-width: 620px) {
      margin-top: 2rem;
    }

    span {
      color: ${(props) => props.theme.colors.gray[500]};
      font-weight: 500;
      font-size: 1.125rem;
    }
    p {
      color: ${(props) => props.theme.colors.gray[300]};
      font-size: 0.875rem;
    }
  }
`;
