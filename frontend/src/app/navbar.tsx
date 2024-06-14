import { ConnectKitButton } from "connectkit";
import { useAccount } from 'wagmi'
import Link from 'next/link';

export function Navbar() {
    const account = useAccount()

    return (
        <nav className="bg-orange-100 border-gray-200 mb-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-black text-2xl font-semibold whitespace-nowrap">GreenPower</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <ConnectKitButton></ConnectKitButton>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li>
                    <Link href="/" className="block py-2 px-3 md:p-0 text-white rounded md:bg-transparent md:text-blue-700 " aria-current="page">Home</Link>
                </li>
                {account.isConnected&&<li>
                    <Link href="/transactions" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">Profile</Link>
                </li>}
                </ul>
            </div>
            </div>
        </nav>
    )
}