import BigNumber from 'bignumber.js';
import dexLimitAbi from 'src/abi/dexlimit-contract-abi';
import RouterContractABI from 'src/abi/router-abi';
import tokenAbi from 'src/abi/token-abi';
import { noExponents } from 'src/helper/common';
import createContractInstance from 'src/shared/contract-instance';
import web3 from '../shared/web3';
import { Logger } from '@nestjs/common';

export async function executeOrder(limitOrders) {
  const logger = new Logger('OrderExecutor', { timestamp: true });
  let ids: string[] = [];
  const routerInstance = createContractInstance(
    RouterContractABI,
    process.env.routerAddress,
  );

  for (let i = 0; i < limitOrders.length; i++) {
    let currentOrder = limitOrders[i];
    let path = [
      currentOrder.inputTokenAddress,
      currentOrder.outputTokenAddress,
    ];

    const inputTokenInstance = createContractInstance(
      tokenAbi,
      currentOrder.inputTokenAddress,
    );
    const outputTokenInstance = createContractInstance(
      tokenAbi,
      currentOrder.outputTokenAddress,
    );

    let [inputDecimal, outputDecimal] = await Promise.all([
      await inputTokenInstance.methods.decimals().call(),
      await outputTokenInstance.methods.decimals().call(),
    ]);

    let inputAmount = new BigNumber(currentOrder.inputTokenAmount).multipliedBy(
      10 ** inputDecimal,
    );
    let outputAmount = new BigNumber(
      currentOrder.outputTokenAmount,
    ).multipliedBy(10 ** outputDecimal);
    if (currentOrder.inBoundToken) {
      let outputAmounts = await routerInstance.methods
        .getAmountsOut(noExponents(inputAmount.toString()), path)
        .call();

      if (
        noExponents(outputAmounts[outputAmounts.length - 1]) >=
        noExponents(outputAmount.toString())
      ) {
        ids.push(currentOrder.id);
      }
    } else {
      let inputAmounts = await routerInstance.methods
        .getAmountsIn(noExponents(outputAmount.toString()), path)
        .call();

      if (noExponents(inputAmounts[0]) >= noExponents(inputAmount.toString())) {
        ids.push(currentOrder.id);
      }
    }
  }

  web3.eth.accounts.wallet.add(process.env.privateKey);

  const dexLimitInstance = createContractInstance(
    dexLimitAbi,
    process.env.dexLimitAddress,
  );

  if (ids.length > 0) {
    let gasLimit;
    try {
      gasLimit = await dexLimitInstance.methods
        .executeSwap(process.env.routerAddress, ids)
        .estimateGas({ from: process.env.ownerAddress });
    } catch {
      gasLimit = 30000000;
    }
    try {
      const result = await dexLimitInstance.methods
        .executeSwap(process.env.routerAddress, ids)
        .send({
          from: process.env.ownerAddress,
          gas: gasLimit,
          gasPrice: 5000000000,
        });
    } catch (e) {
      logger.log('smart contract execute swap function call failed');
    }
  } else {
    logger.log('No executable limit orders');
  }
}
