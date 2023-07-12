import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

type DeployedContractsJson = Record<
  string,
  Array<{
    name: string;
    chainId: string;
    contracts: Record<
      string,
      {
        address: string;
        abi: any[];
      }
    >;
  }>
>;
type AccountRecords = Record<string, { address: string; name: string } | null>;
type AccountRecordsRecords = Record<string, AccountRecords>;
interface Deployment {
  address: string;
  contractName: string;
  startBlock: number | null | undefined;
  abi: any[];
  bytecode: string;
  deployedBytecode: string;
}

/**
 * Write accounts addresses, contracts addresses and types, ABIs and a network config file into the given folders.
 * @param deploymentsPath path to the deployments.
 * @param networksList array with the names of the networks.
 * @param clientGeneratedFolderPath path to the generated folder in the client workspace.
 * @param clientAccountsJsonPath path to the accounts generated json file in the client workspace.
 * @param clientContractsJsonPath path to the contracts generated json file in the client workspace.
 * @param clientContractsTypesFolderPath path to the contracts types generated folder in the client workspace.
 * @param subgraphGeneratedFolderPath path to the generated folder in the subgraph workspace.
 * @param hardhatContractsTypeFolderPath path to the contracts types folder.
 * @param typesList array with the names of the types.
 * @param signerAddress address of the signer
 */
export async function shareData(
  deploymentsPath: string,
  networksList: string[],
  clientGeneratedFolderPath: string,
  clientAccountsJsonPath: string,
  clientContractsJsonPath: string,
  clientContractsTypesFolderPath: string,
  subgraphGeneratedFolderPath: string,
  hardhatContractsTypeFolderPath: string,
  typesList: string[],
  signerAddress: string
): Promise<void> {
  if (!existsSync(deploymentsPath)) {
    throw new Error('No deployments folder');
  }
  if (networksList.length === 0) {
    throw new Error('There have been no deployments so far');
  }

  const deployedContractsJson: DeployedContractsJson = {};
  const accountsJson: AccountRecordsRecords = {};

  for (let i = 0; i < networksList.length; i++) {
    const deploymentsNetworkPath = join(deploymentsPath, networksList[i]);
    const contractsJsonsList = readdirSync(deploymentsNetworkPath).filter((path) => /\.json$/.test(path));
    if (contractsJsonsList.length === 0) {
      throw new Error('There have been no deployments so far');
    }
    const chainId = readFileSync(join(deploymentsNetworkPath, '.chainId.txt'), 'utf-8');
    if (!Object.keys(deployedContractsJson).includes(chainId)) {
      deployedContractsJson[chainId] = [];
    }
    if (!Object.keys(accountsJson).includes(chainId)) {
      accountsJson[chainId] = {};
    }
    const subgraphConfigJsonPath = join(subgraphGeneratedFolderPath, networksList[i] + '.json');
    let configSubgraph = { network: networksList[i] };
    const configClient = { name: networksList[i], chainId, contracts: {} };
    let configContracts = {};
    const accountsMembers: AccountRecords = {};
    for (let j = 0; j < contractsJsonsList.length; j++) {
      const contractJson = JSON.parse(readFileSync(join(deploymentsNetworkPath, contractsJsonsList[j]), 'utf-8'));
      const contractName = contractJson.contractName;
      const contractSlug = contractsJsonsList[j].replace(/\.json/, '');
      const typePath = typesList.filter((path) => path.includes(contractName))[0];
      const typePathArray = typePath.split('/');
      configContracts = {
        ...configContracts,
        [contractSlug]: { address: contractJson.address, abi: contractJson.abi }
      };
      // write types to front-end workspace
      const clientContractTypePath = join(
        clientContractsTypesFolderPath,
        ...typePath.split('/').slice(typePathArray.length - 3, typePathArray.length - 1)
      );
      const clientContractTypeFilePath = join(clientContractTypePath, (contractName as string) + '.ts');
      const typeData = readFileSync(typePath, 'utf8');
      if (!existsSync(clientContractTypeFilePath)) {
        if (!existsSync(clientContractTypePath)) {
          mkdirSync(clientContractTypePath, { recursive: true });
        }
        writeFileSync(clientContractTypeFilePath, typeData);
      }
      // populate network config file
      configSubgraph = {
        ...configSubgraph,
        [contractSlug + 'Address']: contractJson.address,
        [contractSlug + 'StartBlock']: contractJson.startBlock
      };
      accountsMembers[signerAddress] = {
        address: contractJson.address.toLowerCase(),
        name: contractSlug
      };
    }
    // write abi to subgraph workspace
    if (!existsSync(subgraphGeneratedFolderPath)) {
      mkdirSync(subgraphGeneratedFolderPath, { recursive: true });
    }
    writeFileSync(subgraphConfigJsonPath, JSON.stringify(configSubgraph, null, 2));
    // populate config for front-end
    configClient.contracts = configContracts;
    accountsJson[chainId] = accountsMembers;
    deployedContractsJson[chainId].push(configClient);
  }
  // write contracts json to front-end workspace
  if (!existsSync(clientGeneratedFolderPath)) {
    mkdirSync(clientGeneratedFolderPath, { recursive: true });
  }
  writeFileSync(clientContractsJsonPath, JSON.stringify(deployedContractsJson, null, 2));
  writeFileSync(clientAccountsJsonPath, JSON.stringify(accountsJson, null, 2));
  // write common.ts file to front-end workspace
  const contractTypeCommon = 'common.ts';
  const contractTypeCommonPath = join(clientContractsTypesFolderPath, contractTypeCommon);
  const typeCommonData = readFileSync(join(hardhatContractsTypeFolderPath, contractTypeCommon), 'utf8');
  writeFileSync(contractTypeCommonPath, typeCommonData);
  console.log(`  ✓ Contracts types have been copied to ${clientContractsTypesFolderPath}`);
  console.log(
    `  ✓ A network config JSON file has been populated for every deployment network with the contracts' addresses, modules and start blocks and copied to ${subgraphGeneratedFolderPath}`
  );
  console.log(
    `  ✓ Accounts addresses, contract addresses and ABIs for every chain have been copied to ${clientGeneratedFolderPath}`
  );
  console.log(`  ✓ Contract type required module common.ts copied to ${clientContractsTypesFolderPath}`);
}

/**
 * Write deployment object.
 * @param deployment object of type `Deployment` with the data of the deployment
 * @param deploymentPath path to the deployment file, including name and extension of the file.
 * @param networkFolderPath path to the network folder
 * @param chainId id of the chain
 */
export function writeDeployment(
  deployment: Deployment,
  deploymentPath: string,
  networkFolderPath: string,
  chainId: number | undefined
): void {
  if (!existsSync(networkFolderPath)) {
    mkdirSync(networkFolderPath, { recursive: true });
  }
  writeFileSync(deploymentPath, JSON.stringify(deployment, undefined, 2));
  console.log(`  ✓ ${deployment.contractName} deployed at: ${JSON.stringify(deployment.address)}`);
  if (typeof chainId !== 'undefined') {
    const chainIdTxtPath = join(networkFolderPath, '.chainId.txt');
    if (!existsSync(networkFolderPath)) {
      mkdirSync(networkFolderPath, { recursive: true });
    }
    writeFileSync(chainIdTxtPath, chainId.toString());
  }
}
