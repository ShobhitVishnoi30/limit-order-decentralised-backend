import Web3 from 'web3';
import * as dotenv from 'dotenv' 

dotenv.config();

const provider = new Web3.providers.HttpProvider(
 process.env.HTTP_URL
);

const web3 = new Web3(provider);

export default web3;
