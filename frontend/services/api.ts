import { formatAddress } from "@/app/utils"
import { nft } from "../type"

const  headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

//serverless call
const ServerlessHOST = "https://greenpower.wayneies1206.workers.dev"
const BackendHOST = "http://localhost:5003"

export async function getNftProviderByAddress(address:string): Promise<nft[]> {
    try {
        let body = {
            "provider": address
        }
        const res = await fetch(ServerlessHOST + '/getProvideAsset', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          })
        if(res){
            const rres = await res.json()
            console.log(rres)
            return rres.nfts
        }else{
            return []
        }
    }
    catch (err) {
        console.log("error", err);
        return []
    }
}

export async function addAsset(maxSupply: number, provider:string, type: string, uri: string) {
    const nft: nft = {nftId: String(0), maxSupply: maxSupply, provider: provider, url: uri, type: type}
    try {
        let body = {
            "nft": nft
        }
        console.log(123)
        const res = await fetch(BackendHOST + '/add_asset', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          })
        if(res){
            const rres = await res.json()
            return true
        }
    }
    catch (err) {
        console.log("error", err);
    }
}

export async function getNftBuyByAddress(address:string): Promise<nft[]> {
    try {
        let body = {
            "buyer": address
        }
        const res = await fetch(ServerlessHOST + '/getBuyAsset', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          })
        if(res){
            console.log(res)
            const rres = await res.json()
            return rres.nfts
        }else{
            return []
        }
    }
    catch (err) {
        console.log("error", err);
        return []
    }
}


export async function getSellingNFT(): Promise<nft[]> {
    try {
        let body = {}
        const res = await fetch(ServerlessHOST + '/getSellingAsset', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          })
        if(res){
            const rres = await res.json()
            console.log(rres.nfts)
            return rres.nfts
        }else{
            return []
        }
    }
    catch (err) {
        console.log("error", err);
        return []
    }
}

export async function addBuyAsset(buyer: string, maxSupply: number, provider:string, type: string, uri: string, nftId: string) {
    const nft: nft = {nftId: nftId, maxSupply: maxSupply, provider: provider, url: uri, type: type}
    try {
        let body = {
            "nft": nft,
            'buyer': buyer
        }
        console.log(123)
        const res = await fetch(ServerlessHOST + '/addBuyAsset', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          })
        if(res){
            const rres = await res.json()
            return true
        }
    }
    catch (err) {
        console.log("error", err);
    }
}