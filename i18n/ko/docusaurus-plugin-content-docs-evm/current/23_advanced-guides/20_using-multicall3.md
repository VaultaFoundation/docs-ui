---
title: 멀티콜3 사용
---

Multicall3는 EOS EVM에 배포된 계약으로, 여러 통화를 단일 통화로 일괄 처리할 수 있습니다.이는 다음을 의미합니다
단일 거래에서 하나 이상의 계약을 여러 번 호출할 수 있다는 것입니다.

이는 데이터를 읽거나 쓰기 위해 수행해야 하는 트랜잭션 수를 줄이는 데 유용합니다.예를 들어 다음과 같은 경우
여러 계약에서 데이터를 읽어야 합니다. Multicall3를 사용하여 단일 트랜잭션에서 모든 데이터를 읽을 수 있으므로
다음을 보장할 수 있습니다. 

- 거래에 대해 가능한 가장 낮은 비용을 지불합니다.
- 동일한 블록에서 데이터를 가져옵니다.
- 여러 거래가 완료될 때까지 기다릴 필요가 없습니다
- 거래 순서 (경쟁 조건) 에 대해 걱정할 필요가 없습니다.
- 거래 중 **하나**가 실패할지 (전부 또는 전혀) 걱정할 필요가 없습니다.

## 사용

Multicall3는 계약이므로 모든 EVM 호환 자바스크립트 라이브러리와 함께 사용할 수 있습니다.이 예제에서는 다음을 사용할 것입니다.
[에테르](https://docs.ethers.io/).

### ABI 잡기

멀티콜3 계약을 사용하려면 ABI를 가져와야 합니다.ABI는 다음에서 찾을 수 있습니다. [멀티콜3 웹사이트](https://www.multicall3.com/abi#json)
또는 이 확장 가능한 섹션에서:

<details>
 <summary>멀티콜3 ABI</summary>

```json
[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "aggregate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes[]",
        "name": "returnData",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "allowFailure",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call3[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "aggregate3",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "allowFailure",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call3Value[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "aggregate3Value",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "blockAndAggregate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "blockHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBasefee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "basefee",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }
    ],
    "name": "getBlockHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "blockHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBlockNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getChainId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "chainid",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentBlockCoinbase",
    "outputs": [
      {
        "internalType": "address",
        "name": "coinbase",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentBlockDifficulty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "difficulty",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentBlockGasLimit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "gaslimit",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentBlockTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getEthBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLastBlockHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "blockHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "requireSuccess",
        "type": "bool"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "tryAggregate",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "requireSuccess",
        "type": "bool"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "tryBlockAndAggregate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "blockHash",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          },
          {
            "internalType": "bytes",
            "name": "returnData",
            "type": "bytes"
          }
        ],
        "internalType": "struct Multicall3.Result[]",
        "name": "returnData",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
]
```
</details>


### 코드 작성

JSON ABI를 저장했으면 이제 이더와 함께 사용할 수 있습니다.

```typescript title="multicall3.ts"
import { Contract, Interface, JsonRpcProvider } from 'ethers';

// Import the ABI you copied
import MULTICALL3_ABI from "./multicall3.json";

// This is the address of the contract on mainnet
const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

const RPC_URL = 'https://api.evm.eosnetwork.com/';

const test = async () => {
    const provider = new JsonRpcProvider(RPC_URL, undefined, {
        batchMaxCount: 1
    });
    const multicallContract = new Contract(MULTICALL3_ADDRESS, MULTICALL3_ABI, provider);
    const multicallInterface = new Interface(MULTICALL3_ABI);

    const calls = [
        {
            target: MULTICALL3_ADDRESS,
            allowFailure: false,
            callData: multicallInterface.encodeFunctionData('getEthBalance', [MULTICALL3_ADDRESS]),
        },
        {
            target: MULTICALL3_ADDRESS,
            allowFailure: false,
            // WEOS address
            callData: multicallInterface.encodeFunctionData('getEthBalance', ['0xc00592aA41D32D137dC480d9f6d0Df19b860104F']),
        }
    ];

    type Aggregate3Response = { success: boolean; returnData: string };
    const results: Aggregate3Response[] = await multicallContract.aggregate3.staticCall(calls);

    for (const { success, returnData } of results) {
        console.log('success', success);
        console.log('returnData', returnData);

        // Decode the returnData
        const decoded = multicallInterface.decodeFunctionResult('getEthBalance', returnData);
        console.log('decoded', decoded);
    }
}

test();
```

위의 코드는 a를 설정합니다. `provider`, 인스턴스화합니다 `multicall` 계약을 한 다음 전화를 겁니다. `aggregate3` 를 사용한 함수 `calls` 배열. 

더 `aggregate3` 함수는 다음 배열을 반환합니다. `success` 과 `returnData` 가치. 

더 `returnData` 인코딩되므로 다음을 사용하여 디코딩해야 합니다. `decodeFunctionResult` 에서 제공하는 함수 `Interface` 클래스.

