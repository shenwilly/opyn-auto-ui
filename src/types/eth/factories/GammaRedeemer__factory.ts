/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { GammaRedeemer, GammaRedeemerInterface } from "../GammaRedeemer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_gammaAddressBook",
        type: "address",
      },
      {
        internalType: "address",
        name: "_automator",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "otoken",
        type: "address",
      },
    ],
    name: "OrderCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "cancelled",
        type: "bool",
      },
    ],
    name: "OrderFinished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "addressBook",
    outputs: [
      {
        internalType: "contract IAddressBook",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "automator",
    outputs: [
      {
        internalType: "contract IPokeMe",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "calculator",
    outputs: [
      {
        internalType: "contract IMarginCalculator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "cancelOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "controller",
    outputs: [
      {
        internalType: "contract IGammaController",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_otoken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "shortOtokens",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "longOtokens",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "collateralAssets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "shortAmounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "longAmounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "collateralAmounts",
            type: "uint256[]",
          },
        ],
        internalType: "struct MarginVault.Vault",
        name: "_vault",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_typeVault",
        type: "uint256",
      },
    ],
    name: "getExcessCollateral",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOrdersLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_otoken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "getRedeemPayout",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_otoken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "getRedeemableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "shortOtokens",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "longOtokens",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "collateralAssets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "shortAmounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "longAmounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "collateralAmounts",
            type: "uint256[]",
          },
        ],
        internalType: "struct MarginVault.Vault",
        name: "_vault",
        type: "tuple",
      },
    ],
    name: "getVaultOtoken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "getVaultWithDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "shortOtokens",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "longOtokens",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "collateralAssets",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "shortAmounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "longAmounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "collateralAmounts",
            type: "uint256[]",
          },
        ],
        internalType: "struct MarginVault.Vault",
        name: "",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_otoken",
        type: "address",
      },
    ],
    name: "hasExpiredAndSettlementAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "isOperatorOf",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_otoken",
        type: "address",
      },
    ],
    name: "isSettlementAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "isValidVaultId",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_otoken",
        type: "address",
      },
    ],
    name: "isWhitelistedOtoken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orders",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "otoken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vaultId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isSeller",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "toETH",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "finished",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "processOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "refreshConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setAddressBook",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "shouldProcessOrder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_otoken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "shouldRedeemOtoken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_vaultId",
        type: "uint256",
      },
    ],
    name: "shouldSettleVault",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "whitelist",
    outputs: [
      {
        internalType: "contract IWhitelist",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class GammaRedeemer__factory {
  static readonly abi = _abi;
  static createInterface(): GammaRedeemerInterface {
    return new utils.Interface(_abi) as GammaRedeemerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GammaRedeemer {
    return new Contract(address, _abi, signerOrProvider) as GammaRedeemer;
  }
}
