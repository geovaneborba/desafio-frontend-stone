import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

type DollarQuotationApiResponse = {
  USDBRL: {
    bid: string;
  };
};

const fetchDollarQuotation = async () => {
  try {
    const response = await api.get("/USD-BRL");

    const {
      USDBRL: { bid },
    }: DollarQuotationApiResponse = response.data;

    return Number(bid);
  } catch (error) {
    console.error("Error fetching dollar quotation:", error);
    throw new Error("Erro ao buscar cotação do dólar");
  }
};

export const useDollarQuery = () => {
  const results = useQuery({
    queryKey: ["dollarPrice"],
    queryFn: fetchDollarQuotation,
  });

  return results;
};
