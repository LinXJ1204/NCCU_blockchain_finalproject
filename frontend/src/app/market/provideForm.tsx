import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAccount } from "wagmi";
import { addAsset } from "../../../services/api";
import { Loading } from "../components/Loading";

export function ProvideForm(props: any) {
    const account = useAccount()

    const [provider, setProvider] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [type, setType] = useState<string>("Solar")
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    //addAsset()

    async function submithandler() {
        if(amount < 1) {
            alert("Enter amount!!")
            return
        }
        if(account.isConnected && account.address) {
            setLoading(true)
            let dateTime = new Date()
            const jsonData = { provider: account.address, price: 10, time: dateTime.toISOString(), type: type, amount: amount };
            // Stringify the JSON object
            const jsonString = JSON.stringify(jsonData);
            // Create a Blob object with the JSON string and 
            // set the content type as "application/json"
            const blob = new Blob([jsonString], { type: "application/json" });
            const CID = await uploadFile(blob);

            if(CID == undefined) {
                setLoading(false)
                return
            }

            const res: any = await addAsset(amount, account.address, type, CID)
            console.log(res)
            console.log(typeof(res))
            if(res.status == "Success") {
                alert("Providing data successful!")
            }
            alert("Providing data successful!")
            setLoading(false)
            props.close()
        } else {
            alert("You have to connect wallet!!")
        }
    }

    const uploadFile = async (fileToUpload: string | Blob) => {
        try {
          setUploading(true);
          const data = new FormData();
          data.set("file", fileToUpload);
          const res = await fetch("/api/files", {
            method: "POST",
            body: data,
          });
          const resData = await res.json();
          return resData.IpfsHash
        } catch (e) {
          console.log(e);
          return undefined
        }
      };

    return (
        <Transition appear show={props.showBox} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                            {loading && <Loading />}
                            <div className="py-2 px-2" style={{"backgroundColor": "#f2c1f2", "backgroundImage": "linear-gradient(180deg, #f2c1f2 0%, #ffffff 16%, #ffffff 99%)"}}>
                                <div className="flex justify-end mt-2">
                                    <svg onClick={props.close} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                    <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
                                    </svg>
                                </div>
                                <div className="flex pb-6 justify-center">
                                    <img className="w-5/12" src="./earth.png"/>
                                </div>
                                <div className="flex pb-4">
                                    <form className="max-w-sm mx-auto">
                                        <div className="mb-5 min-w-64">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                                            <input onChange={e => setAmount(Number(e.target.value))} inputMode="numeric" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                        </div>
                                        <div className="mb-5">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Price Now</label>
                                            <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={10} required disabled/>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Your address</label>
                                            <input className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={account.address} disabled required/>
                                        </div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Energy Type</label>
                                        <select onChange={e => setType(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option>Solar</option>
                                            <option>Hydro</option>
                                            <option>Wind</option>
                                        </select>
                                        <div className="flex justify-center">
                                            {account.isConnected?
                                            <button onClick={submithandler} type="button" className="m-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Provide</button>
                                            :
                                            <button className="m-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Provide</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}