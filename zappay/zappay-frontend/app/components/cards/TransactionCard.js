"use client";
import Modal from "@/app/utils/Modal";
import React, { useState } from "react";
import TransactionDetailsCard from "./TransactionDetailsCard";

const TransactionCard = ({ transaction }) => {
  const { amount, receiver, sender, action, transactionId } = transaction;
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div onClick={()=>setToggle(!toggle)} className="text-white flex gap-5 text-sm items-center border-b border-zap-lightBlack hover:bg-zap-hoverBlack p-2">
        <div className="w-7 h-7 rounded-full border  flex items-center justify-center">
          <span>T</span>
        </div>
        <div className="flex justify-between flex-1">
          <div>
            <h4>Transaction ID</h4>
            <span className="text-xs line-clamp-1 uppercase">
              {transactionId.slice(0, 8)}
            </span>
          </div>
          <div className="text-right">
            <span
              className={`${
                action === "send" ? "text-red-600" : "text-green-600"
              }`}
            >
              ₹ {amount}
            </span>{" "}
          </div>
        </div>
      </div>
      <Modal isOpen={toggle} onClose={setToggle}>
        <TransactionDetailsCard transaction={transaction} onClose={setToggle}/>
      </Modal>
    </>
  );
};

export default TransactionCard;
