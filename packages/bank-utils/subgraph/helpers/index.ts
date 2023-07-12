import handlebars from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Generate subgraph from template.
 * @param networkName name of the network.
 * @param subgraphPath path to the subgraph.
 * @param subgraphFilePath path to the subgraph file including name and extension.
 * @param templateSubgraphFile  template subgraph file.
 */
export const generateSubgraph = (
  networkName: string,
  subgraphPath: string,
  subgraphFilePath: string,
  templateSubgraphFile: string
): void => {
  const contentJson = JSON.parse(readFileSync(join(subgraphPath, 'src/generated/', networkName + '.json'), 'utf-8'));
  const compile = handlebars.compile(templateSubgraphFile);
  const filledSubgraph = compile(contentJson);
  writeFileSync(subgraphFilePath, filledSubgraph);
  console.log(`  ✓ subgraph.yaml has been generated from subgraph.template.yaml and copied to ${subgraphPath}`);
};
