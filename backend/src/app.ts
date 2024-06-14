import express, {Express, Request, Response} from 'express';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { GreenPowerContract } from '../contracts/greenPower';
import { hypercertContract } from '../contracts/hypercert';
import { nft } from './type';
import { addAsset } from './serverless';
import cors from 'cors';

const port = 5003;

const app: Express = express();

app.use(express.json())
app.use(cors());

const corsOptions = {
    origin: [
      'https://hollowleaf.dev/inazuma',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'application/json'],
  };


app.post('/add_asset', async (request: Request, response: Response) => {
  const req_data = request.body
  console.log(req_data['nft'])
  try{
      const nft: nft = req_data['nft']
      const c = new hypercertContract()
      c.mintClaim(nft.url, nft.maxSupply).then((res) => {
        if(res == BigInt(-1)) {
          response.send({status: "Failed"})
        }
        const cc = new GreenPowerContract()
        cc.setContributer(nft.url, nft.provider).then(async ()=> {
            console.log("===TEST===")
            //serverless
            nft.nftId = res.toString()
            const r = await addAsset(nft.provider, nft)
            response.send({status: "Success"})
        })
      })
  } catch(err) {
      console.log(err)
  }
})
 
app.listen(port, () => {
      try{
        const c = new hypercertContract()
        console.log("Start Listening")
        c.getMintClaim()
    } catch(err) {
        console.log(err)
    }
    console.log(`server is running on http://localhost:5003`)}
  );