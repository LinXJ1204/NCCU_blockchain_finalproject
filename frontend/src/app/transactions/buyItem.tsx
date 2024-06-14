import { useEffect, useState } from "react";
import { formatAddress } from "../utils";


export function BuyItem(props: {provider: string, amount: number, type: string, tokenId: string}) {

    const [url, setUri] = useState<string>("Solar");

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
            <div key={props.tokenId} className="bg-white m-4 w-[220px] border border-gray-200 rounded-lg shadow">
                <div className="flex flex-col items-center p-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={url} alt="Bonnie image"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{formatAddress(props.provider)}</h5>
                    <span className="text-sm text-gray-500">{props.type}</span>
                    <span className="text-sm text-gray-500">{props.amount}</span>
                </div>
            </div>
        </>
    )
}