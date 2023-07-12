import { artifacts, ethers, network } from 'hardhat';
import { join } from 'path';
import { writeDeployment } from 'bank-utils/contracts/helpers';

async function main(): Promise<void> {
  if (network.name === 'hardhat') {
    console.warn(
      'The contract has been deployed to the Hardhat Network, so it got automatically created ' +
        "and destroyed. Use the Hardhat option '--network localhost'"
    );
  }

  if (network.name !== 'hardhat') {
    const networkFolderPath = join(__dirname, '../../deployments', network.name);
    const contractName = 'LoanManager';
    const [deployer] = await ethers.getSigners();
    const debtorsData = await ethers.deployContract(contractName, deployer);
    await debtorsData.waitForDeployment();
    const debtorsDataAddr = await debtorsData.getAddress();
    const deploymentPath = join(networkFolderPath, contractName + '.json');
    const artifact = artifacts.readArtifactSync(contractName);
    const blockNumber = debtorsData.deploymentTransaction()?.blockNumber;
    const deployment = {
      address: debtorsDataAddr,
      contractName: artifact.contractName,
      startBlock: blockNumber,
      abi: artifact.abi,
      bytecode: artifact.bytecode,
      deployedBytecode: artifact.deployedBytecode
    };
    writeDeployment(deployment, deploymentPath, networkFolderPath, network.config.chainId);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
