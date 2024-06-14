import { useAccount, useWriteContract, UseWriteContractReturnType } from 'wagmi'
import { GreenPowerABI } from "../contracts/greenPowerABI"
import { Message } from '../message';
import { useMutation } from 'wagmi/query';
import { addBuyAsset } from '../../../services/api';
import { nft } from '../../../type';


export function BuyButton(props: {tokenId: string, amount: number, soldOut: boolean, provider:string, type: string, uri:string}) {
  const account = useAccount()



  const { writeContract, isError, error } = useWriteContract(
    {mutation: {onSuccess: () => {addBuyAsset(account.address?account.address:"" ,props.amount, props.provider, props.type, props.uri, props.tokenId)}}}
  )

  const GreenPowerContractAddr:any = "0xE18D2cce6eb37980Cf44106df98c5E371baFaE2d";

  //Packaging approval and buy
  return (
    <>
      {!props.soldOut ? 
      <button
          className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
          onClick={() => 
            writeContract({ 
              abi: GreenPowerABI,
              address: GreenPowerContractAddr,
              functionName: "buy",
              args: [
                  [BigInt(props.tokenId) + BigInt(1)],
                  props.amount
              ],
            })
          }
      >
        Buy
      </button>:
      <button
        className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg'
        disabled
      >
        Buy
      </button>
      }
      {isError&&<Message message={error?error.message:""}/>}
    </>
  )
}