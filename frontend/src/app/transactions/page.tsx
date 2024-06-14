'use client';
import { Navbar } from "../navbar";
import { Web3Provider } from "../../../wagmi.config";
import { Footer } from "../footer";
import { TransactionsTable } from "./TransactionsTable";

export default function Market() {
  return (
    <main className="bg-white min-h-screen">
      <Web3Provider>
        <Navbar />
        <TransactionsTable />
        <Footer />
      </Web3Provider>
    </main>
  );
}
