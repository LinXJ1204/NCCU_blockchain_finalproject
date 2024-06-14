"use client"
import { useMutation } from "wagmi/query";
import { Message } from "../message";
import { GreenPowerABI } from "./greenPowerABI";
import { useWriteContract } from 'wagmi'

const GreenPowerContractAddr:any = "0xE18D2cce6eb37980Cf44106df98c5E371baFaE2d";

export function VerifyButton(props: {tokenID: string, uri: string, amount: number, verified: boolean}) {
    const { writeContract, isError, isSuccess, error } = useWriteContract(
      {mutation: {onSuccess: () => {console.log("======TEST001======")}}}
    )

    return (
      <>
      {props.verified?
        <button 
          className="rounded-full p-2 bg-gray-200"
          onClick={() => 
            writeContract({ 
              abi: GreenPowerABI,
              address: GreenPowerContractAddr,
              functionName: 'verify',
              args: [
                props.tokenID,
                props.uri,
                props.amount
              ],
          },
          
        )
        }
        disabled
        >
          Verify
          {false&&<Message message={error?error.name:""}/>}
        </button>
        :
        <button 
          className="rounded-full p-2 bg-orange-200"
          onClick={() => {
            writeContract({ 
              abi: GreenPowerABI,
              address: GreenPowerContractAddr,
              functionName: 'verify',
              args: [
                props.tokenID,
                props.uri,
                props.amount
              ],
          })
        }
          }
        >
          Verify
          {false&&<Message message={error?error.name:""}/>}
        </button>
      }
      </>
  )
}