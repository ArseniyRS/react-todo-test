/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchCryptoNews } from "~/components/api";

interface INewsContext {
  news: string;
  isLoading: boolean;
  setFetchToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsContext = createContext<INewsContext | null>(null);

export function NewsProvider({ children }: PropsWithChildren) {
  const [fetchToggle, setFetchToggle] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: "cryptoNews",
    queryFn: fetchCryptoNews,
    enabled: fetchToggle,
  });

  return (
    <NewsContext.Provider
      value={{
        isLoading,
        news: data,
        setFetchToggle,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === null) {
    throw new Error("cant use useNews outside from NewsProvider");
  }
  return context;
};
