import { Inter } from "next/font/google";
import "./globals.css";
import QueryWrapper from "./query/QueryWrapper";
import RecoilWrapper from "./recoil/RecoilWrapper";
import Navigation from "./components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZapPay",
  description: "Pay anyone anytime anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black background`}>
        <RecoilWrapper>
          <QueryWrapper>
            <Navigation />
            {children}
          </QueryWrapper>
        </RecoilWrapper>
      </body>
    </html>
  );
}
