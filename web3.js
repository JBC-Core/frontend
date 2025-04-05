const contractAddress = "0x34a1C4ea57105a39685F613E3F3C9e4Daf1C2496";
const abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

let web3;
let contract;
let userAddress;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];
      document.getElementById("wallet").textContent = userAddress;

      contract = new web3.eth.Contract(abi, contractAddress);
      const balance = await contract.methods.balanceOf(userAddress).call();
      const decimals = 18; // BEP-20 için genelde 18
      const formatted = balance / Math.pow(10, decimals);
      document.getElementById("balance").textContent = formatted.toFixed(4);
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  } else {
    alert("MetaMask not found. Please install it.");
  }
}
