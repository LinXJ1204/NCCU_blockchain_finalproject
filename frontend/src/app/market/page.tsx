'use client';
import Image from "next/image";
import { Navbar } from "../navbar";
import { Web3Provider } from "../../../wagmi.config";
import { Dashboard } from "../dashboard";
import { SaleTable } from "./saleTable";
import { Footer } from "../footer";

export default function Market() {
  return (
    <main className="bg-white min-h-screen">
      <Web3Provider>
        <Navbar />
        <SaleTable />
        <Footer />
      </Web3Provider>
    </main>
  );
}
