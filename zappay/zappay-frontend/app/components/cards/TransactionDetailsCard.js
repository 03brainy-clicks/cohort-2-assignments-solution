import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TransactionDetailsCard = ({ transaction, onClose }) => {
  const { amount, receiver, sender, action, transactionId } = transaction;

  return (
    <div className="w-[80vw]">
      <h1 className="font-medium mb-3 flex justify-between items-center">
        <span>Transaction Details</span>{" "}
        <XMarkIcon
          className="w-5 cursor-pointer hover:text-red-600"
          onClick={() => onClose(false)}
        />{" "}
      </h1>
      <h4 className="text-sm">
        Amount: &nbsp;
        <span
          className={`${action === "send" ? "text-red-600" : "text-green-600"}`}
        >
          ₹ {amount}
        </span>
      </h4>
      <h4 className="text-sm ">Sender: {sender}</h4>
      <h4 className="text-sm">Receiver: {receiver}</h4>
      <h4 className="text-sm">Transaction ID: {transactionId}</h4>
    </div>
  );
};

export default TransactionDetailsCard;
