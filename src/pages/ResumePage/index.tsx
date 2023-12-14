import { ArrowLeft } from "@phosphor-icons/react";
import {
  AdditionalInfo,
  BackButton,
  Container,
  ResultAmount,
  ResultContainer,
} from "./styles";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/axios";
import { priceFormatter } from "../../utils/price-formatter";
import { calculateCreditTotal } from "../../utils/calculate-credit-total";
import { calculateMoneyTotal } from "../../utils/calculate-money-total";

type StateData = {
  amount: number;
  stateTax: number;
  paymentMethod: "money" | "credit";
};

type DollarQuotationApiResponse = {
  USDBRL: {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
  };
};

export function ResumePage() {
  const location = useLocation();
  const { amount, stateTax, paymentMethod } = location.state.data as StateData;

  const [dollarPrice, setDollarPrice] = useState(0);

  const calculateTotalPrice = useMemo(() => {
    return paymentMethod === "money"
      ? calculateMoneyTotal(amount, stateTax, dollarPrice)
      : calculateCreditTotal(amount, stateTax, dollarPrice);
  }, [paymentMethod, amount, stateTax, dollarPrice]);

  useEffect(() => {
    const fetchDollarQuotation = async () => {
      const response = await api("/USD-BRL");

      const {
        USDBRL: { bid },
      }: DollarQuotationApiResponse = response.data;

      setDollarPrice(Number(bid));
    };
    fetchDollarQuotation();
  }, []);

  return (
    <Container>
      <ResultContainer>
        <BackButton to={"/"}>
          <ArrowLeft size={16} />
          Voltar
        </BackButton>

        <p>O resultado do cálculo é</p>

        <ResultAmount>{priceFormatter(calculateTotalPrice)}</ResultAmount>
        <AdditionalInfo>
          Compra no {paymentMethod === "money" ? "dinheiro" : "cartão"} e taxa
          de <span>{stateTax}%</span>
        </AdditionalInfo>
        <AdditionalInfo>
          Cotação do dólar: <span>$1,00 = {priceFormatter(dollarPrice)}</span>
        </AdditionalInfo>
      </ResultContainer>
    </Container>
  );
}
