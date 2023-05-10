const dexLimitAbi: any[] = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'limitOrderId',
        type: 'uint256',
      },
    ],
    name: 'LimitOrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'limitOrderId',
        type: 'uint256',
      },
    ],
    name: 'LimitOrderEnded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'limitOrderId',
        type: 'uint256',
      },
    ],
    name: 'LimitOrderExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'limitOrderId',
        type: 'uint256',
      },
    ],
    name: 'LimitOrderNotExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'limitOrderId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenAmt',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'inTokenAddr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'outTokenAddr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'inBoundToken',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'boundToken',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timeStamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'orderType',
        type: 'uint8',
      },
    ],
    name: 'LimitOrderPlaced',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'orderId', type: 'uint256' }],
    name: 'cancelLimitOrderListing',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address payable', name: '_addr', type: 'address' },
      { internalType: 'uint256[]', name: 'limitOrderIds', type: 'uint256[]' },
    ],
    name: 'executeSwap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'orderId', type: 'uint256' }],
    name: 'getLimitOrder',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'inTokenAddr', type: 'address' },
          { internalType: 'address', name: 'outTokenAddr', type: 'address' },
          { internalType: 'uint8', name: 'orderType', type: 'uint8' },
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'bool', name: 'inBoundToken', type: 'bool' },
          { internalType: 'bool', name: 'limitOrderStatus', type: 'bool' },
          { internalType: 'bool', name: 'isInEth', type: 'bool' },
          { internalType: 'bool', name: 'isOutEth', type: 'bool' },
          { internalType: 'uint256', name: 'tokenAmt', type: 'uint256' },
          { internalType: 'uint256', name: 'boundToken', type: 'uint256' },
          { internalType: 'uint256', name: 'timeStamp', type: 'uint256' },
        ],
        internalType: 'struct DEXLimitOrder.LimitOrder',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bool', name: 'inBoundToken', type: 'bool' },
      { internalType: 'uint256', name: 'inAmt', type: 'uint256' },
      { internalType: 'address', name: 'inTokenAddr', type: 'address' },
      { internalType: 'address', name: 'outTokenAddr', type: 'address' },
      { internalType: 'uint256', name: 'outAmt', type: 'uint256' },
      { internalType: 'uint256', name: 'timeStamp', type: 'uint256' },
      { internalType: 'uint8', name: 'orderType', type: 'uint8' },
      { internalType: 'bool', name: 'isOutEth', type: 'bool' },
    ],
    name: 'limitOrderListing',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'outTokenAddr', type: 'address' },
      { internalType: 'uint256', name: 'outAmt', type: 'uint256' },
      { internalType: 'uint256', name: 'timeStamp', type: 'uint256' },
      { internalType: 'uint8', name: 'orderType', type: 'uint8' },
      { internalType: 'bool', name: 'inBoundToken', type: 'bool' },
    ],
    name: 'limitOrderListingEth',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'uniRouter',
    outputs: [{ internalType: 'contract IRouter', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export default dexLimitAbi;
