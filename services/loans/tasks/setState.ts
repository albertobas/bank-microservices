import { task } from 'hardhat/config';
import { type LoanManager } from '../types';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { encodeBytes32String } from 'ethers';

task('setState', 'Perform all the transactions').setAction(async (_, hre) => {
  if (hre.network.name === 'hardhat') {
    console.warn(
      'The faucet has been run to the Hardhat Network, so it got automatically created ' +
        "and destroyed. Use the Hardhat option '--network localhost'"
    );
  }
  const loans = [
    {
      identifier: 1,
      customerId: 1,
      purpose: encodeBytes32String('debt_consolidation'),
      intRate: encodeBytes32String('0.11'),
      installment: encodeBytes32String('500'),
      delinquencies2Yrs: 2,
      isDefault: false
    },
    {
      identifier: 2,
      customerId: 2,
      purpose: encodeBytes32String('debt_consolidation'),
      intRate: encodeBytes32String('0.15'),
      installment: encodeBytes32String('400'),
      delinquencies2Yrs: 1,
      isDefault: false
    }
  ];

  const updatedLoan = {
    identifier: 2,
    customerId: 2,
    purpose: encodeBytes32String('debt_consolidation'),
    intRate: encodeBytes32String('0.15'),
    installment: encodeBytes32String('400'),
    delinquencies2Yrs: 2,
    isDefault: false
  };

  const debtorsDataAddressPath = join(__dirname, `../contracts/deployments/localhost/LoanManager.json`);
  if (!existsSync(debtorsDataAddressPath)) {
    console.error('You need to deploy your contract first');
  }
  const debtorsDataAddressFile = readFileSync(debtorsDataAddressPath, 'utf-8');
  const debtorsDataAddress = JSON.parse(debtorsDataAddressFile).address;
  const debtorsData = (await hre.ethers.getContractAt('LoanManager', debtorsDataAddress)) as unknown as LoanManager;
  const [deployer] = await hre.ethers.getSigners();

  for (let i = 0; i < loans.length; i++) {
    const { identifier, customerId, purpose, intRate, installment, delinquencies2Yrs, isDefault } = loans[i];
    await debtorsData
      .connect(deployer)
      .addLoan(identifier, customerId, purpose, intRate, installment, delinquencies2Yrs, isDefault);
  }

  await debtorsData
    .connect(deployer)
    .updateLoan(
      updatedLoan.identifier,
      updatedLoan.purpose,
      updatedLoan.intRate,
      updatedLoan.installment,
      updatedLoan.delinquencies2Yrs,
      updatedLoan.isDefault
    );

  console.log("The local chain has reached the state specified in the task 'setState'");
});
