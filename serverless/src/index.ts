import { Hono } from 'hono'
import { StringToNftArray, addNft, NftToString, StringToNft, deleteNftById, UpdateProviderNfts } from './utils'
import { nft } from './model'
import { cors } from 'hono/cors'

type Bindings = {
  psyduck: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

app.options('*', (c) => {
  return c.text('', 204)
})

app.post('/addAsset', async (c) => {
  const reqData = await c.req.json()
  const nft: nft = reqData['nft']

  const nftProvide = await c.env.psyduck.get(nft.provider+"-provider"+"-v1")
  const nfts = await c.env.psyduck.get("AllNft"+"-v1")
  //Tx info
  await c.env.psyduck.put(nft.url, NftToString(nft))
  //Provider info
  if(nftProvide) {
    const r = addNft(nftProvide, nft)
    await c.env.psyduck.put(nft.provider+"-provider"+"-v1", r)
  } else {
    const r = addNft("", nft)
    await c.env.psyduck.put(nft.provider+"-provider"+"-v1", r)
  }
  if(nfts) {
    const r = addNft(nfts, nft)
    await c.env.psyduck.put("AllNft"+"-v1", r)
  } else {
    const r = addNft("", nft)
    await c.env.psyduck.put("AllNft"+"-v1", r)
  }
  return c.json({result: "success"})
})

app.post('/addBuyAsset', async (c) => {
  const reqData = await c.req.json()
  const nft: nft = reqData['nft']
  const buyer: string = reqData['buyer']
  
  const nftBuy = await c.env.psyduck.get(buyer+"-buyerer"+"-v1")

  if(nftBuy){
    await c.env.psyduck.put(buyer+"-buyerer"+"-v1", addNft(nftBuy, nft))
  }else {
    await c.env.psyduck.put(buyer+"-buyerer"+"-v1", addNft("", nft))
  }
  return c.json({})
})

app.post('/getProvideAsset', async (c) => {
  const reqData = await c.req.json()
  const provider = reqData['provider']
  if( provider == null) {
    return c.json({err: "noData: provider"})
  }
  const _nft =await c.env.psyduck.get(provider+"-provider"+"-v1")
  if(_nft) {
    const nft = StringToNftArray(_nft)
    return c.json({nfts: nft})
  }else {
    return c.json({err: "noData"})
  }
})

app.post('/getBuyAsset', async (c) => {
  const reqData = await c.req.json()
  const buyer = reqData['buyer']
  if( buyer == null) {
    return c.json({})
  }
  const _nft =await c.env.psyduck.get(buyer+"-buyerer"+"-v1")
  if(_nft) {
    const nft = StringToNftArray(_nft)
    return c.json({nfts: nft})
  }
})

app.post('/getSellingAsset', async (c) => {
  const _nft =await c.env.psyduck.get("AllNft"+"-v1")
  if(_nft) {
    const nft = StringToNftArray(_nft)
    return c.json({nfts: nft})
  }
})

export default app
