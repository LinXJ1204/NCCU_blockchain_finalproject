import { Contract, ethers, ContractTransactionResponse } from "ethers";
import { signer, wssProvider } from "./signer&rpcprovider";
import { HypercertABI } from "./hypercertABI";
import { updateAsset } from "../src/serverless";

const hypercertContractAddr:any = "0xA8974ABdf1F1E5E2256ba728a19cF6ffDb63af86";

export class hypercertContract {
    hypercert: Contract = new Contract(hypercertContractAddr, HypercertABI, signer)
    whypercert: Contract = new Contract(hypercertContractAddr, HypercertABI, wssProvider)


    constructor () {}

    async mintClaim(uri: string, amount: number): Promise<bigint> {
        const res:ContractTransactionResponse = await this.hypercert.getFunction("mintClaim")(signer.address, amount, uri, 0)
        const rr: any = await res.wait()
        if(rr) {
            const r: any = rr.logs[0]
            return r.args[1]
        } else {
            return BigInt(-1)
        }
    }

    async getMintClaim(){
        this.hypercert.on("ClaimStored", (from, to, value, event)=>{
            let transferEvent ={
                from: from,
                to: to,
                value: value,
                eventData: event,
            }
            console.log(transferEvent.eventData.args[0], transferEvent.eventData.args[1])
            updateAsset(transferEvent.eventData.args[1], String(transferEvent.eventData.args[0]))
        })
    }
}