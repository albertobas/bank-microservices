import { readdirSync } from 'fs';
import { ethers } from 'hardhat';
import { join } from 'path';
import globby = require('globby');
import { shareData } from 'bank-utils/contracts/helpers';

const deploymentsPath = join(__dirname, '../../deployments');
const networksList = readdirSync(deploymentsPath);
const clientGeneratedFolderPath = join(__dirname, '../../../../client/src/generated/loans');
const clientContractsJsonPath = join(clientGeneratedFolderPath, 'contracts.json');
const clientAccountsJsonPath = join(clientGeneratedFolderPath, 'accounts.json');
const clientContractsTypesFolderPath = join(clientGeneratedFolderPath, 'types');
const subgraphGeneratedFolderPath = join(__dirname, '../../../subgraph/src/generated');
const hardhatContractsTypeFolderPath = join(__dirname, '../../../types');
const typesList = globby.sync([
  hardhatContractsTypeFolderPath + '/contracts/**/*.ts',
  '!' + hardhatContractsTypeFolderPath + '/**/index.ts'
]);

async function main(): Promise<void> {
  const [signer] = await ethers.getSigners();
  await shareData(
    deploymentsPath,
    networksList,
    clientGeneratedFolderPath,
    clientAccountsJsonPath,
    clientContractsJsonPath,
    clientContractsTypesFolderPath,
    subgraphGeneratedFolderPath,
    hardhatContractsTypeFolderPath,
    typesList,
    signer.address
  );
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
