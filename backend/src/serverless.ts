import { nft } from "./type"

const ServerlessHOST = "https://greenpower.wayneies1206.workers.dev"

const  headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

export async function addAsset(provider:string, nft: nft) {
    try {
        let body = {
            "provider": provider,
            "nft": nft
        }
        const res = await fetch(ServerlessHOST + '/addAsset', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          })
        if(res){
            const rres = await res.json()
            console.log(rres)
            return ""
        }else{
            return ""
        }
    }
    catch (err) {
        console.log("error", err);
        return ""
    }
}

export async function updateAsset(uri:string, nftId: string) {
    try {
        let body = {
            "assetIndex": uri,
            "nftId": nftId
        }
        const res = await fetch(ServerlessHOST + '/updateAsset', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          })
        if(res){
            const rres = await res.json()
            console.log(rres)
            return ""
        }else{
            return ""
        }
    }
    catch (err) {
        console.log("error", err);
        return ""
    }
}