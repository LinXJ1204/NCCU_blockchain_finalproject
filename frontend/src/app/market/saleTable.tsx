import { useState } from "react";
import { SaleItem } from "./saleItem";
import { ProvideForm } from "./provideForm";
import { useQuery } from "wagmi/query";
import { getSellingNFT } from "../../../services/api";
import { nft } from "../../../type";

export function SaleTable() {
    const [showProviderForm, setShowProviderForm] = useState<boolean>(false);
    const [saleItem, setSaleItem] = useState<nft[]>([])
    const [selected, setSelected] = useState<string>("")

    function closeShowProviderForm() {
        setShowProviderForm(false)
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ["getSellingNFT"],
        queryFn: async () => {
          const res = await getSellingNFT()
          if(res) {
            console.log(res)
            setSaleItem(res.reverse())
          }
          return "asdsda"
        }
      })

    return (
        <div className="px-48">
            <div className="flex justify-end">
                <button type="button" onClick={()=>{setShowProviderForm(true)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Provide Energy</button>
            </div>
            <div className="">
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    <button onClick={() => setSelected("")} type="button" className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3">All categories</button>
                    <button onClick={() => setSelected("Solar")} type="button" className="text-gray-900 border border-white hover:border-gray-200 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3">Solar</button>
                    <button onClick={() => setSelected("Hydro")} type="button" className="text-gray-900 border border-white hover:border-gray-200 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3">Hydro</button>
                    <button onClick={() => setSelected("Wind")} type="button" className="text-gray-900 border border-white hover:border-gray-200 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3">Wind</button>
                </div>
                <div className="flex flex-wrap">
                    {!isLoading && saleItem.length > 0 ?
                        saleItem.map(item => {
                            if(item.maxSupply != null) {
                                if(selected=="" || selected==item.type) {
                                    return <SaleItem uri={item.url} provider={item.provider} amount={item.maxSupply} type={item.type} tokenId={item.nftId}/>
                                }
                            }
                        })
                        :
                        <div></div>
                    }
                </div>
            </div>
            <ProvideForm showBox={showProviderForm} close={closeShowProviderForm} />
        </div>
    )
}