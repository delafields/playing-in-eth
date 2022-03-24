const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("wassa");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of hi's lol
      let txn = await domainContract.register("hi",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    console.log("Minted domain hi.wassa");
  
    txn = await domainContract.setRecord("hi", "Am I a hi or a wassa??");
    await txn.wait();
    console.log("Set record for hi.wassa");
  
    const address = await domainContract.getAddress("hi");
    console.log("Owner of domain hi:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();