import { useEffect, useState } from "react";
import { formatAddress, loadJsonFromCID } from "../utils";
import { VerifyButton } from "../contracts/hypercert";
import { useReadContracts } from 'wagmi'
import { GreenPowerABI } from "../contracts/greenPowerABI";
import { HypercertABI } from "../contracts/hypercertABI";
import { nftMetadata } from "../../../type";

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

export function ProvideItem(props: {provider: string, amount: number, type: string, tokenId: string, uri: string, status: boolean}) {
    const [url, setUri] = useState<string>("Solar")
    const [metadata, setMetadata] = useState<nftMetadata>()

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
        fetch(`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${props.uri}`)
        .then((response) => response.json())
        .then((json) => setMetadata(json));
    }, [])

    return (
        <>
            {result.isSuccess && metadata ?
            <tr key={props.uri} className="bg-white hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {metadata.time}
                </th>
                <td className="px-6 py-4">
                    {props.amount}
                </td>
                <td className="px-6 py-4">
                    {props.type}
                </td>
                <td className="px-6 py-4">
                    {props.amount * 10}
                </td>
                <td className="px-6 py-4">
                    {result.data[0].result ? "Verified" : "Unverified"}
                </td>
                <td className="px-6 py-4">
                    <VerifyButton tokenID={props.tokenId} uri={props.uri} amount={props.amount} verified={result.data[0].result} />
                </td>
            </tr>:
            <></>
            }
        </>
    )
}

//{(result.data[1].result.toString())}