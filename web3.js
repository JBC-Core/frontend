const contractAddress = "0x34a1C4ea57105a39685F613E3F3C9e4Daf1C2496";
const abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function"
  }
];

let web3;
let contract;
let userAddress;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];
    document.getElementById("wallet").textContent = userAddress;

    contract = new web3.eth.Contract(abi, contractAddress);

    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const balance = await contract.methods.balanceOf(userAddress).call();

    document.getElementById("name").textContent = name;
    document.getElementById("symbol").textContent = symbol;
    document.getElementById("balance").textContent = web3.utils.fromWei(balance, "ether");
  } else {
    alert("Please install MetaMask!");
  }
}
