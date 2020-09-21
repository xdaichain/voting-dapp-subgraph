import { ProposalCreated, Voted, Space } from '../generated/Space/Space';
import { Proposal, Vote } from '../generated/schema';


export function handleProposalCreated(event: ProposalCreated): void {
  let space = Space.bind(event.address)
  let id = space.name() + '-' + event.params.id.toString();
  let proposal = new Proposal(id);
  proposal.space = space.name();
  proposal.proposalId = event.params.id;
  let proposalDetails = space.getProposal(event.params.id);
  proposal.title = proposalDetails.value0;
  proposal.description = proposalDetails.value1;
  proposal.options = proposalDetails.value2;
  proposal.startTimestamp = proposalDetails.value3;
  proposal.duration = proposalDetails.value4;
  proposal.creator = proposalDetails.value5;
  proposal.votes = [];
  proposal.save();
}
