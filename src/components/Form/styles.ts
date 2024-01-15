import styled from "styled-components";

export const Container = styled.form`
  margin-top: 6.5625rem;
  max-width: 22.5rem;
`;

export const CurrencyWrapper = styled.div`
  display: flex;
  column-gap: 1.5rem;
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
    color: #b00020;
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

  > label {
    display: block;
    font-weight: 500;
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  span {
    display: block;
    margin-top: 1rem;
    color: #b00020;
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

export const ButtonConvert = styled.button`
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
`;
