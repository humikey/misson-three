// import ethers.js
const { ethers } = require("hardhat");
//create main function
async function main() {
    // create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    // deploy contract from factory
    console.log("Deploying contract...");
    const fundMe = await fundMeFactory.deploy(300);
    await fundMe.waitForDeployment();
    console.log("Contract deployed to:", fundMe.target);

    // await hre.run("verify:verify",{
    //     address: fundMe.target,
    //     constructorArguments: [10],
    // });
    // 初始化两个账户
    const [firstAccount, secondAccount] = await ethers.getSigners();
    // 第一个账户充值一笔
    const fundTx = await fundMe.fund({value: ethers.parseEther("0.001")})
    await fundTx.wait()
    console.log("firstAccount充值成功")
    // 检查余额
    const balanceOfContract = await ethers.provider.getBalance(fundMe.target)
    console.log(`合约余额为${balanceOfContract}`)

    // 第二个账户充值一笔
    const fundTx2 = await fundMe.connect(secondAccount).fund({value: ethers.parseEther("0.002")})
    await fundTx2.wait()

    // 检查余额
    const balanceOfContract2 = await ethers.provider.getBalance(fundMe.target)
    console.log(`合约余额为${balanceOfContract2}`)

    // 查看账户余额
    const balanceOfFirstAccount = await fundMe.fundersToAmount(firstAccount.address);
    const balanceOfSecondAccount = await fundMe.fundersToAmount(secondAccount.address);
    console.log(`${firstAccount.address}的余额为${balanceOfFirstAccount}`);
    console.log(`${secondAccount.address}的余额为${balanceOfSecondAccount}`);


}
//execute main function

main().then().catch((error) => {
    console.error(error);
    process.exit(1)
});