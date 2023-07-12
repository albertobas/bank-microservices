import { task } from 'hardhat/config';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { encodeBytes32String } from 'ethers';
import { type CustomerManager } from '../types';

task('setState', 'Perform all the transactions').setAction(async (_, hre) => {
  if (hre.network.name === 'hardhat') {
    console.warn(
      'The faucet has been run to the Hardhat Network, so it got automatically created ' +
        "and destroyed. Use the Hardhat option '--network localhost'"
    );
  }

  const customers = [
    {
      identifier: 1,
      derogatoryPublicRecs: 1,
      dti: encodeBytes32String('19.7'),
      inquiriesLast6Mths: 2,
      fico: encodeBytes32String('700.0'),
      logAnnualIncome: encodeBytes32String('10.8')
    },
    {
      identifier: 2,
      derogatoryPublicRecs: 0,
      dti: encodeBytes32String('19.8'),
      inquiriesLast6Mths: 1,
      fico: encodeBytes32String('720.0'),
      logAnnualIncome: encodeBytes32String('10.6')
    }
  ];

  const updatedCustomer = {
    identifier: 2,
    derogatoryPublicRecs: 1,
    dti: encodeBytes32String('19.8'),
    inquiriesLast6Mths: 1,
    fico: encodeBytes32String('720.0'),
    logAnnualIncome: encodeBytes32String('10.6')
  };

  const debtorsDataAddressPath = join(__dirname, `../contracts/deployments/localhost/CustomerManager.json`);
  if (!existsSync(debtorsDataAddressPath)) {
    console.error('You need to deploy your contract first');
  }
  const debtorsDataAddressFile = readFileSync(debtorsDataAddressPath, 'utf-8');
  const debtorsDataAddress = JSON.parse(debtorsDataAddressFile).address;
  const debtorsData = (await hre.ethers.getContractAt(
    'CustomerManager',
    debtorsDataAddress
  )) as unknown as CustomerManager;
  const [deployer] = await hre.ethers.getSigners();

  for (let i = 0; i < customers.length; i++) {
    const { identifier, derogatoryPublicRecs, dti, inquiriesLast6Mths, fico, logAnnualIncome } = customers[i];
    await debtorsData
      .connect(deployer)
      .addCustomer(identifier, derogatoryPublicRecs, dti, inquiriesLast6Mths, fico, logAnnualIncome);
  }

  await debtorsData
    .connect(deployer)
    .updateCustomer(
      updatedCustomer.identifier,
      updatedCustomer.derogatoryPublicRecs,
      updatedCustomer.dti,
      updatedCustomer.inquiriesLast6Mths,
      updatedCustomer.fico,
      updatedCustomer.logAnnualIncome
    );

  console.log("The local chain has reached the state specified in the task 'setState'");
});
