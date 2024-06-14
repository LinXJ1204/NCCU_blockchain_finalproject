import { useEffect, useState } from "react";
import { formatAddress } from "../utils";
import { BuyButton } from "./buyButton";
import { GreenPowerABI } from "../contracts/greenPowerABI";
import { HypercertABI } from "../contracts/hypercertABI";
import { useReadContracts } from "wagmi";
import { nft } from "../../../type";

const GreenPowerContractAddr: any = "0xE18D2cce6eb37980Cf44106df98c5E371baFaE2d";
const HypercertContractAddr: any = "0xA8974ABdf1F1E5E2256ba728a19cF6ffDb63af86";

const GreenPowerContract = {
    address: GreenPowerContractAddr,
    abi: GreenPowerABI,
  } as const

const HypercertContract = {
address: HypercertContractAddr,
abi: HypercertABI,
} as const

export function SaleItem(props: {provider: string, amount: number, type: string, tokenId: string, uri:string}) {

    const [url, setUri] = useState<string>("Solar");

    const result: any = useReadContracts({
        contracts: [
            {
                ...GreenPowerContract,
                functionName: "token_is_verified",
                args: [(props.tokenId)]
            },
            {
                ...HypercertContract,
                functionName: "unitsOf",
                args: ["0xf3419771c2551f88a91Db61cB874347f05640172", BigInt(props.tokenId) + BigInt(1)]
            }
        ]
    })

    useEffect(() => {
        if(props.type == "Solar") {
            setUri("/solar-panel.png")
        } else if (props.type == "Hydro") {
            setUri("/current.png")
        } else if (props.type == "Wind") {
            setUri("/windsmills.png")
        } 
    }, [])

    return (
        <>
            {result.isSuccess && result.data[0].result && result.data[1].result.toString() != "0" &&
            <div key={props.tokenId} className="bg-white border w-[240px] m-8 border-gray-200 rounded-lg shadow">
                <div className="flex flex-col items-center p-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={url} alt="Bonnie image"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{formatAddress(props.provider)}</h5>
                    <span className="text-sm text-gray-500">{props.type}</span>
                    <span className="text-sm text-gray-500">{props.amount}</span>
                    <div className="flex mt-4 md:mt-6">
                        <BuyButton provider={props.provider} type={props.type} uri={props.uri} tokenId={props.tokenId} amount={props.amount} soldOut={result.data[1].result.toString() == "0"} />
                    </div>
                </div>
            </div>
            }
            {result.isSuccess && result.data[0].result && result.data[1].result.toString() == "0" &&
            <div key={props.tokenId} className="opacity-50 w-[240px] m-8 bg-white border border-gray-200 rounded-lg shadow ">
                <div className="flex flex-col items-center p-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={url} alt="Bonnie image"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{formatAddress(props.provider)}</h5>
                    <span className="text-sm text-gray-500">{props.type}</span>
                    <span className="text-sm text-gray-500">{props.amount}</span>
                    <div className="flex mt-4 md:mt-6">
                        <BuyButton provider={props.provider} type={props.type} uri={props.uri} tokenId={props.tokenId} amount={props.amount} soldOut={result.data[1].result.toString() == "0"}/>
                    </div>
                </div>
            </div>
            }
        </>
    )
}