import {
  Finding,
  FindingSeverity,
  FindingType,
  HandleTransaction,
  Network,
  TransactionEvent
} from 'forta-agent';
import { CompoundHelper } from './utils';
import { GovernanceEvents } from './events';

export const FAILED_EVENT_ALERT_ID = 'COMP-GOVERNMENT-0';
export const SUCCESS_EVENT_ALERT_ID = 'COMP-GOVERNMENT-1';
export const COMPOUND_NETWORK = Network.MAINNET;

const compound = new CompoundHelper(COMPOUND_NETWORK);

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];

  for (const governanceEvent of GovernanceEvents) {
    const logs = txEvent.filterEvent(governanceEvent.signature, compound.GOVERNANCE_ADDRESS);

    if(logs.length > 0) {
      require('fs').writeFileSync('event.json', JSON.stringify(txEvent), { encoding: 'utf8' });
    }

    for (const log of logs) {
      const parsedLog = compound.parseLog(log);
      const metadata = compound.parseMetadata(parsedLog);
      const description = governanceEvent.getDescription(parsedLog);

      if (txEvent.status) {
        findings.push(
          Finding.fromObject({
            name: `Compound Governance Event: ${parsedLog.name}`,
            description: description,
            alertId: SUCCESS_EVENT_ALERT_ID,
            protocol: 'Compound',
            severity: FindingSeverity.Info,
            type: FindingType.Unknown,
            metadata: metadata
          })
        );
      } else {
        findings.push(
          Finding.fromObject({
            name: `Compound Governance Failed Event: ${parsedLog.name}`,
            description: description,
            alertId: FAILED_EVENT_ALERT_ID,
            protocol: 'Compound',
            type: FindingType.Suspicious,
            severity: FindingSeverity.High,
            metadata: metadata
          })
        );
      }
    }
  }

  return findings;
};

export default {
  handleTransaction
};
