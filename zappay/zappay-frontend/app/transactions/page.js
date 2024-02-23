"use client";
import React from "react";
import TransactionCard from "../components/cards/TransactionCard";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { fetchTransactions } from "../query/QueryFunctions";
import { authState } from "../recoil/atoms/AuthAtom";

const Page = () => {
  const auth = useRecoilValue(authState);
  const { isLoading, error, data } = useQuery({
    queryKey: ["transactions", auth],
    queryFn: () => fetchTransactions(auth),
  });

  console.log(data);

  return (
    <div className="w-full md:w-10/12 lg:w-9/12  h-screen p-5 overflow-hidden mx-auto">
      <div className="pt-16 h-full">
        <div className="flex flex-col gap-5 h-full">
          <div className="text-sm text-white">Transactions</div>
          <div className="text-sm space-y-2  h-full overflow-y-scroll">
            {data?.map((transaction) => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
