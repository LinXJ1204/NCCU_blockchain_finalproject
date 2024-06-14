"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, arbitrumSepolia, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";
export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia],
    ssr: true,
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(
        `https://sepolia.infura.io/v3/${"3db317632844470fa86a5a3a8cb7724d"}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId,

    // Required App Info
    appName: "Konan",

    // Optional App Info
    appDescription: "2024 5 Celestia Hackathon",
    appUrl: "https://konan.pages.dev/", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};