import GoerliConfig from 'compound-config/networks/goerli.json';
import GoerliAbiConfig from 'compound-config/networks/goerli-abi.json';
import KovanConfig from 'compound-config/networks/kovan.json';
import KovanAbiConfig from 'compound-config/networks/kovan-abi.json';
import MainnetConfig from 'compound-config/networks/mainnet.json';
import MainnetAbiConfig from 'compound-config/networks/mainnet-abi.json';
import RinkebyConfig from 'compound-config/networks/rinkeby.json';
import RinkebyAbiConfig from 'compound-config/networks/rinkeby-abi.json';
import RopstenConfig from 'compound-config/networks/ropsten.json';
import RopstenAbiConfig from 'compound-config/networks/ropsten-abi.json';

export const CompoundNetworkNames = {
  GOERLI: 'goerli',
  KOVAN: 'kovan',
  MAINNET: 'mainnet',
  RINKEBY: 'rinkeby',
  ROPSTEN: 'ropsten'
};

export const GovernanceSignatures = {
  PROPOSAL_CREATED:
    'ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)',
  VOTE_CAST: 'VoteCast(address,uint256,uint8,uint256,string)',
  PROPOSAL_CANCELED: 'ProposalCanceled(uint256)',
  PROPOSAL_QUEUED: 'ProposalQueued(uint256,uint256)',
  PROPOSAL_EXECUTED: 'ProposalExecuted(uint256)',
  VOTING_DELAY_SET: 'VotingDelaySet(uint256,uint256)',
  VOTING_PERIOD_SET: 'VotingPeriodSet(uint256,uint256)',
  NEW_IMPLEMENTATION: 'NewImplementation(address,address)',
  PROPOSAL_THRESHOLD_SET: 'ProposalThresholdSet(uint256,uint256)',
  NEW_PENDING_ADMIN: 'NewPendingAdmin(address,address)',
  NEW_ADMIN: 'NewAdmin(address,address)'
};

export const CompoundNetworkConfigs = {
  [CompoundNetworkNames.GOERLI]: GoerliConfig,
  [CompoundNetworkNames.KOVAN]: KovanConfig,
  [CompoundNetworkNames.MAINNET]: MainnetConfig,
  [CompoundNetworkNames.RINKEBY]: RinkebyConfig,
  [CompoundNetworkNames.ROPSTEN]: RopstenConfig
};

export const CompoundNetworkInterfaces = {
  [CompoundNetworkNames.GOERLI]: GoerliAbiConfig,
  [CompoundNetworkNames.KOVAN]: KovanAbiConfig,
  [CompoundNetworkNames.MAINNET]: MainnetAbiConfig,
  [CompoundNetworkNames.RINKEBY]: RinkebyAbiConfig,
  [CompoundNetworkNames.ROPSTEN]: RopstenAbiConfig,
}
