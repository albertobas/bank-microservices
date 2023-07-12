import yargs from 'yargs';
import { readFileSync } from 'fs';
import { join } from 'path';
import { generateSubgraph } from 'bank-utils/subgraph/helpers';

const subgraphPath = join(__dirname, '..');
const subgraphFilePath = join(subgraphPath, 'subgraph.yaml');
const templateSubgraphFilePath = join(subgraphPath, 'templates/subgraph.template.yaml');
const templateSubgraphFile = readFileSync(templateSubgraphFilePath, 'utf-8');

yargs
  .command(
    'generateSubgraph',
    'Generate subgraph.yaml from subgraph.template.yaml',
    (yargs) => {
      return yargs.option('networkName', { type: 'string', default: 'hardhat' });
    },
    async ({ networkName }) => generateSubgraph(networkName, subgraphPath, subgraphFilePath, templateSubgraphFile)
  )
  .help().argv;
