import web3 from './web3';

const createContractInstance =  (contractABI, contractAddress) => {
  const instance = new web3.eth.Contract(contractABI, contractAddress);

  return instance;
};

export default createContractInstance;
