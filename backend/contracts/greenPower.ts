import { Contract, ethers } from "ethers";
import { signer } from "./signer&rpcprovider";
import { GreenPowerABI } from "./greenPowerABI";

const GreenPowerContractAddr:any = "0xE18D2cce6eb37980Cf44106df98c5E371baFaE2d";

export class GreenPowerContract {
    GreenPower: Contract = new Contract(GreenPowerContractAddr, GreenPowerABI, signer)

    constructor () {}

    async setContributer(uri: string, provider: string) {
        const res = await this.GreenPower.set_contributer(uri, provider)
        return res
    }

}