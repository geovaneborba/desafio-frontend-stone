import styled, { css } from "styled-components";

type ButtonProps = {
  isValid: boolean;
};

export const Container = styled.form`
  margin-top: 6.5625rem;
  max-width: 22.5rem;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: none;
    padding-bottom: 4rem;
  }
`;

export const CurrencyWrapper = styled.div`
  display: flex;
  column-gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 2rem;
  }
`;

export const CurrencyGroup = styled.div`
  > label {
    font-weight: 500;
    font-size: 1.125rem;
    color: ${(props) => props.theme.colors.gray[900]};
    margin-bottom: 0.625rem;
    display: block;
  }

  span {
    display: block;
    margin-top: 1rem;
    color: ${(props) => props.theme.colors.red};
  }
`;

export const InputContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
  color: ${(props) => props.theme.colors.gray[900]};
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
  width: 10.5rem;
  box-shadow: 0px 8px 4px 0px rgba(13, 17, 27, 0.08);

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    all: unset;

    width: 100%;

    &::placeholder {
      color: ${(props) => props.theme.colors.gray[300]};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const InputStateTax = styled(InputContainer)`
  input {
    width: 30px;
  }
`;

export const PaymentMethodSelection = styled.div`
  margin-top: 2rem;

  input[type="radio"] {
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid ${(props) => props.theme.colors.gray["300"]};
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;

    &::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em ${(props) => props.theme.colors.green[700]};
    }

    &:checked::before {
      transform: scale(1);
    }

    &:checked {
      border-color: ${(props) => props.theme.colors.green[700]};
    }
  }

  > label {
    display: block;
    font-weight: 500;
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  span {
    display: block;
    margin-top: 1rem;
    color: ${(props) => props.theme.colors.red};
  }
`;

export const PaymentMethodWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const InputContainerPaymentMethod = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ButtonConvert = styled.button<ButtonProps>`
  all: unset;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray[300]};
  font-weight: 500;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 2rem;
  column-gap: 1rem;
  color: ${(props) => props.theme.colors.while};

  ${(props) =>
    props.isValid
      ? css`
          background-color: ${(props) => props.theme.colors.green["700"]};
        `
      : ""}
`;
