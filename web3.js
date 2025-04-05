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
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];
      document.getElementById("wallet").innerText = userAddress;

      contract = new web3.eth.Contract(abi, contractAddress);

      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      const balance = await contract.methods.balanceOf(userAddress).call();

      document.getElementById("name").innerText = name;
      document.getElementById("symbol").innerText = symbol;
      document.getElementById("balance").innerText = web3.utils.fromWei(balance);
    } catch (error) {
      alert("Connection failed: " + error.message);
    }
  } else {
    alert("MetaMask is not installed.");
  }
}
