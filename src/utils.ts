import { Log } from 'forta-agent';
import { utils } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';
import uniqBy from 'lodash/uniqBy';

import { CompoundNetworkConfigs, CompoundNetworkInterfaces } from './constants';

export class CompoundHelper {
  private readonly compoundInterface: utils.Interface;

  public readonly GOVERNANCE_ADDRESS: string; // current network address

  constructor(networkName: string) {
    const networkConfig = CompoundNetworkConfigs[networkName] as any;
    const abiConfig = CompoundNetworkInterfaces[networkName] as any;

    this.GOVERNANCE_ADDRESS = networkConfig.Governor?.GovernorBravo?.address;

    if (!this.GOVERNANCE_ADDRESS) {
      throw new Error(`No GovernorBravo address found in "${networkName}" network`);
    }

    if (!abiConfig.GovernorBravo) {
      throw new Error(`No GovernorBravo ABI found in "${networkName}" network`);
    }

    // official configs contains duplicates
    const governanceAbi = uniqBy(abiConfig.GovernorBravo, (e: any) => e.name);

    this.compoundInterface = new utils.Interface(governanceAbi);
  }

  public parseLog(log: Log) {
    return this.compoundInterface.parseLog(log);
  }

  public parseMetadata(log: LogDescription) {
    const metadata: { [x: string]: string } = {};

    // filter named properties
    let index = 0;
    const shift = log.args.length; // named properties are not countable
    for (const key in log.args) {
      if (index >= shift) metadata[key] = log.args[key].toString();
      index++;
    }

    return metadata;
  }
}
