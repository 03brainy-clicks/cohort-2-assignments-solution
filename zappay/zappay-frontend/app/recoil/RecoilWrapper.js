"use client";
import { RecoilRoot } from "recoil";

const RecoilWrapper = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilWrapper;
