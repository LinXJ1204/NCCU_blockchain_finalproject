import {nft} from "./model"

export function addNft(ori:string, newNft: nft): string {
    console.log(NftToString(newNft))
    return ori + (NftToString(newNft))
}

//Convert string into nft array
export function StringToNftArray(nfts: string): nft[] {
    var nftsStringArray = nfts.split("&")
    nftsStringArray.shift()
    var res: nft[] = []
    nftsStringArray.forEach(nft => {
        res.push(StringToNft(nft))
    })
    return res
}

//Usage for converting single nft into string structure or reversing
export function NftToString(nft: nft): string {
    var res = "&"
    for (const [key, value] of Object.entries(nft)) {
        res = res + String(`${value}`)+","
      }
    
    return res.slice(0, -1)
}

export function StringToNft(nft: string): nft {
    const value = nft.split(",")
    const res:nft = {nftId: (value[0]), maxSupply: Number(value[1]), provider: value[2], url: value[3], type: value[4]}
    return res
}

export function deleteNftById(nfts: string, nftId: string): string {
    const nftsArray = StringToNftArray(nfts)
    let updateNfts = ""
    nftsArray.map((nft) => {
        if(nft.nftId != nftId) {
            updateNfts = addNft(updateNfts, nft)
        }
    })
    return updateNfts
}

export function UpdateProviderNfts(nfts: string, nftId: string, uri: string): string {
    const nftsArray = StringToNftArray(nfts)
    let updateNfts = ""
    nftsArray.map((nft) => {
        if(nft.url == uri) {
            nft.nftId = nftId
            updateNfts = addNft(updateNfts, nft)
        } else {
            updateNfts = addNft(updateNfts, nft)
        }
    })
    return updateNfts
}