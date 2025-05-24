const {PUBLIC_AUTOLOTTO_CONTRACT_ADDRESS: address} = import.meta.env;

const autoLottoContract = {
  address,
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_lotteryOwner',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '_lotteryBonusMultiplier',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_ticketPricePercentage',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_minTickets',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_maxTicketMultiplier',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_openDuration',
          type: 'uint256'
        },
        {
          internalType: 'address',
          name: '_qrngProviderAddress',
          type: 'address'
        }
      ],
      stateMutability: 'payable',
      type: 'constructor'
    },
    {
      inputs: [],
      name: 'InvalidInitialization',
      type: 'error'
    },
    {
      inputs: [],
      name: 'NotInitializing',
      type: 'error'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'OwnableInvalidOwner',
      type: 'error'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'OwnableUnauthorizedAccount',
      type: 'error'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint64',
          name: 'version',
          type: 'uint64'
        }
      ],
      name: 'Initialized',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [],
      name: 'LotteryCanceled',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'winner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'LotteryCompleted',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'participant',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'LotteryRefunded',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'lotteryOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256'
        }
      ],
      name: 'LotteryStarted',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'participant',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'numTickets',
          type: 'uint256'
        }
      ],
      name: 'LotteryTicketPurchased',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'LotteryValueUpdated',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'requestId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'randomNumber',
          type: 'uint256'
        }
      ],
      name: 'RandomNumberReceived',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'caller',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'requestId',
          type: 'uint256'
        }
      ],
      name: 'RandomNumberRequested',
      type: 'event'
    },
    {
      inputs: [],
      name: 'cancelLottery',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'closeLottery',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'endTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getLotteryState',
      outputs: [
        {
          internalType: 'enum AutoLottoV1.LotteryState',
          name: '',
          type: 'uint8'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getLotteryValue',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getNumberOfAvailableTickets',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_lotteryOwner',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '_lotteryBonusMultiplier',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_ticketPricePercentage',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_minTickets',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_maxTicketMultiplier',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_openDuration',
          type: 'uint256'
        }
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'lastRequestId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'lotteryBonusMultiplier',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'maxTickets',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'minTickets',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'openDuration',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_numTickets',
          type: 'uint256'
        }
      ],
      name: 'purchaseTicket',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'qrngProviderAddress',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'randomNumbers',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_requestId',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_randomNumber',
          type: 'uint256'
        }
      ],
      name: 'receiveRandomNumber',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'requestStatus',
      outputs: [
        {
          internalType: 'enum QRNGConsumer.QRNGStatus',
          name: '',
          type: 'uint8'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'startTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'ticketPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'winner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      stateMutability: 'payable',
      type: 'receive'
    }
  ]
} as const;

export default autoLottoContract;
export {autoLottoContract};
