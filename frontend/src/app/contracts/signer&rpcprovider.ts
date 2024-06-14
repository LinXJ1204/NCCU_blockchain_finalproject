import { ethers } from "ethers";

const privateKey:any = "ffbf0306916058944f00b895b9ae43c7252c733d83fc5fc4b8d63cd6a39e66ef";

//Using ploygon rpc
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/3db317632844470fa86a5a3a8cb7724d")
const wallet = new ethers.Wallet(privateKey);
export const signer = wallet.connect(provider);

