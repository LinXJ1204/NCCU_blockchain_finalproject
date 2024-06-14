"use client";
import dynamic from "next/dynamic";

export function Dashboard() {

    const MapWithNoSSR = dynamic(() => import("./map"), {
        ssr: false,
      });

    return (
        <div className="flex items-center h-full my-24 px-48 gap-10">
            <div className="relative w-max-5/12 overflow-x-auto rounded-lg">
                <p className="p-8 text-2xl font-bold text-black">Green Energy Providers</p>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Provider
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">

                        </tr>
                        <tr className="bg-white border-b">

                        </tr>
                        <tr className="bg-white">

                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-5/12">
                <MapWithNoSSR />
            </div>
        </div>
    )
}