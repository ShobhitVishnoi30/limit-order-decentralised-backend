import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import PairContractABI from 'src/abi/pair-contract-abi';
import tokenAbi from 'src/abi/token-abi';
import { executeOrder } from 'src/executor/order-executor';
import { pairs } from 'src/helper/pairs';
import { LimitOrderService } from 'src/limit-order/limit-order.service';
import createContractInstance from 'src/shared/contract-instance';
import web3 from 'src/shared/web3';
import Web3 from 'web3';

@Injectable()
export class PairTrackingService implements OnModuleInit {
  public web3ConnectionOptions: any;
  public web3SocketConnection: any;
  logger = new Logger('PairTrackingService', { timestamp: true });
  constructor(private limitOrderService: LimitOrderService) {}

  async onModuleInit() {
    this.initiatewebSocket();
  }

  async initiatewebSocket() {
    const webScoketProvider = process.env.WSS_URL;
    this.web3ConnectionOptions = {
      timeout: 30000,
      clientConfig: {
        keepalive: true,
        keepaliveInterval: -1,
        maxReceivedFrameSize: 100000000,
        maxReceivedMessageSize: 100000000,
      },
      reconnect: { auto: true, delay: 1000, maxAttempts: 10, onTimeout: false },
    };
    this.web3SocketConnection = new Web3.providers.WebsocketProvider(
      webScoketProvider,
      this.web3ConnectionOptions,
    );
    const that = this;
    this.web3SocketConnection.on('connect', function () {
      console.log('provider connected'); // <- fires after successful connection
      that.trackPair();
    });
  }

  async trackPair() {
    const pairsAddress = pairs;
    const connection = new Web3(this.web3SocketConnection);
    const value = web3.eth.abi.encodeEventSignature(
      'Swap(address,uint256,uint256,uint256,uint256,address)',
    );
    connection.eth
      .subscribe('logs', {
        address: pairsAddress[0].toString(),
        topics: [value],
      })
      .on('data', async (event) => {
        this.handleEvent(event);
      });
  }

  async handleEvent(event) {
    const pairInstance = createContractInstance(PairContractABI, event.address);
    let range = 0.05;

    let [token0, token1] = await Promise.all([
      await pairInstance.methods.token0().call(),
      await pairInstance.methods.token1().call(),
    ]);
    const token1Instance = createContractInstance(tokenAbi, token1);
    const token0Instance = createContractInstance(tokenAbi, token0);

    let [decimal0, decimal1] = await Promise.all([
      await token1Instance.methods.decimals().call(),
      await token0Instance.methods.decimals().call(),
    ]);
    let reserves = await pairInstance.methods.getReserves().call();
    let reserve1 = reserves._reserve1 / 10 ** decimal1;
    let reserve0 = reserves._reserve0 / 10 ** decimal0;

    let token0Price = reserve1 / reserve0;
    let minOrder = token0Price - token0Price * range;

    let maxOrder = token0Price + token0Price * range;

    let data = await this.limitOrderService.filterLimitOrder(
      token0,
      token1,
      minOrder,
      maxOrder,
      0,
    );
    try {
      await executeOrder(data);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
