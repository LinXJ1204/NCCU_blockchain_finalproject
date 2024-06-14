import { useEffect, useState } from "react";
import { useQuery } from "wagmi/query";
import { getNftBuyByAddress, getNftProviderByAddress, getSellingNFT } from "../../../services/api";
import { nft } from "../../../type";
import { useAccount } from "wagmi";
import { ProvideItem } from "./provideItem";
import { tokenStatus } from "../contracts/greenPower";
import { SaleItem } from "../market/saleItem";
import { BuyItem } from "./buyItem";

export function TransactionsTable() {
    const [provideItem, setProvideItem] = useState<nft[]>([])
    const [buyItem, setBuyItem] = useState<nft[]>([])
    const [totalGen, setTotalGen] = useState<number>(0)
    const [totalPurchase, setTotalPurchase] = useState<number>(0)

    var _totalGen = 0
    var _totalPurchase = 0

    const account = useAccount()

    const { isLoading, error, data } = useQuery({
        queryKey: ["getNftProviderByAddress"],
        queryFn: async () => {
            await inithandler()
        }
    })

    async function inithandler() {
        setProvideItem([])
        setBuyItem([])
        if(account.address) {
            const res = await getNftProviderByAddress(account.address)
            if(res) {
                console.log(res)
                setProvideItem(res)
            }
            const rres = await getNftBuyByAddress(account.address)
            if(rres) {
                console.log(rres)
                setBuyItem(rres)
            }
            return true
        }
        return true
    }

    useEffect(() => {
        inithandler()
    }, [account.address])

    return (
        <div className="px-48">
            <div className="py-4">
                <div className="flex">
                    <div className="font-medium text-2xl mr-10 p-4 rounded-md bg-white text-black drop-shadow-lg">
                        <div className="border-b-2 border-black">Total Generation</div>
                        <div className="text-4xl py-4">{provideItem.reduce((accumulator, currentValue) => accumulator + currentValue.maxSupply, 0)}</div>
                    </div>
                    <div className="font-medium text-2xl mr-10 p-4 rounded-md bg-white text-black drop-shadow-lg">
                        <div className="border-b-2 border-black">Total Purchase</div>
                        <div className="text-4xl py-4">{buyItem.reduce((accumulator, currentValue) => accumulator + currentValue.maxSupply, 0)}</div>
                    </div>
                </div>
                <div className="text-black p-6 py-10 text-4xl font-medium">Energy Providing</div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Providing Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Energy Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Payment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Verify
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading && provideItem.length > 0?
                                provideItem.map((item, index) => {
                                    if(index == 0) {
                                        _totalGen = 0
                                    }
                                    _totalGen += item.maxSupply
                                    
                                    return <ProvideItem provider={item.provider} amount={item.maxSupply} type={item.type} tokenId={item.nftId} uri={item.url} status={false}/>
                                })
                                :
                                <></>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="py-4">
                <div className="text-black p-6 py-10 text-4xl font-medium">Energy Buying</div>
                <div className="py-4 flex flex-wrap">
                    {!isLoading && buyItem.length > 0 ?
                        buyItem.map((item, index) => {
                            if(item.maxSupply != null) {
                                if(index == 0) {
                                    _totalPurchase = 0
                                }
                                _totalPurchase += item.maxSupply
                                console.log(index)
                                return <BuyItem provider={item.provider} amount={item.maxSupply} type={item.type} tokenId={item.nftId}/>
                            }
                        })
                        :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )
}