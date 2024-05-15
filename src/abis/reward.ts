export const rewardABI = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'claim',
    inputs: [
      { name: '_poolId', type: 'uint8', internalType: 'uint8' },
      { name: '_amount', type: 'uint256', internalType: 'uint256' },
      { name: '_proof', type: 'bytes32[]', internalType: 'bytes32[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createRewardPool',
    inputs: [
      {
        name: '_rewardPool',
        type: 'tuple',
        internalType: 'struct Reward.RewardPool',
        components: [
          { name: 'unlocked', type: 'bool', internalType: 'bool' },
          { name: 'rewardToken', type: 'address', internalType: 'address' },
          { name: 'whitelistRoot', type: 'bytes32', internalType: 'bytes32' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'emergencyWithdraw',
    inputs: [
      { name: '_token', type: 'address', internalType: 'address' },
      { name: '_amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'rewardPools',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'unlocked', type: 'bool', internalType: 'bool' },
      { name: 'rewardToken', type: 'address', internalType: 'address' },
      { name: 'whitelistRoot', type: 'bytes32', internalType: 'bytes32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateRewardPool',
    inputs: [
      { name: '_poolId', type: 'uint8', internalType: 'uint8' },
      {
        name: '_pool',
        type: 'tuple',
        internalType: 'struct Reward.RewardPool',
        components: [
          { name: 'unlocked', type: 'bool', internalType: 'bool' },
          { name: 'rewardToken', type: 'address', internalType: 'address' },
          { name: 'whitelistRoot', type: 'bytes32', internalType: 'bytes32' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'userRewards',
    inputs: [
      { name: '', type: 'uint8', internalType: 'uint8' },
      { name: '', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RewardClaimed',
    inputs: [
      { name: 'poolId', type: 'uint8', indexed: true, internalType: 'uint8' },
      {
        name: 'account',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RewardPoolCreated',
    inputs: [
      { name: 'poolId', type: 'uint8', indexed: true, internalType: 'uint8' },
      { name: 'unlocked', type: 'bool', indexed: false, internalType: 'bool' },
      {
        name: 'rewardToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'whitelistRoot',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RewardPoolUpdated',
    inputs: [
      { name: 'poolId', type: 'uint8', indexed: true, internalType: 'uint8' },
      { name: 'unlocked', type: 'bool', indexed: false, internalType: 'bool' },
      {
        name: 'rewardToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'whitelistRoot',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
] as const
