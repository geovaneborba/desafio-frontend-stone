import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.main``;

export const ResultContainer = styled.div`
  margin-top: 6.5625rem;
  display: flex;
  flex-direction: column;
  max-width: 19.0625rem;

  p {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray[500]};
    margin-bottom: 0.5rem;
  }
`;

export const BackButton = styled(Link)`
  all: unset;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  width: fit-content;
  padding: 1rem;
  box-shadow: 0px 8px 4px 0px rgba(13, 17, 27, 0.08);
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
  border-radius: 8px;
  margin-bottom: 2rem;
  transition: box-shadow, 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 8px 4px 0px rgba(13, 17, 27, 0.2);
  }

  a {
    text-decoration: none;
  }
`;

export const ResultAmount = styled.span`
  font-size: 4rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.green[700]};
  margin-bottom: 2rem;
`;

export const AdditionalInfo = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray[400]};
  line-height: 2rem;

  span {
    font-weight: 400;
  }
`;

export const ErrorContainer = styled.div`
  span {
    color: ${(props) => props.theme.colors.red};
    font-size: 1rem;
    display: block;
    margin-top: 3rem;
  }

  a {
    margin-top: 1rem;
  }
`;

export const ErrorMessage = styled.span``;
