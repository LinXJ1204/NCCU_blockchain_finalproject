"use client"

import { Contract, ethers } from "ethers";
import { signer } from "./signer&rpcprovider";
import { GreenPowerABI } from "./greenPowerABI";
import { useReadContracts } from "wagmi";
import { readContracts } from '@wagmi/core'
import { config } from "../../../wagmi.config";


const GreenPowerContractAddr:any = "0xE18D2cce6eb37980Cf44106df98c5E371baFaE2d";
const GreenPowerContract = {
    address: GreenPowerContractAddr,
    abi: GreenPowerABI,
  } as const

export async function tokenStatus(nfts: string[]) {
    const contracts = nfts.map(nft => {
        return {...GreenPowerContract, functionName: 'token_is_verified', args: [nft]}
    })

    const data = await readContracts(
        config,
        {   
            contracts: contracts,
            
        }
    )
    return data
}