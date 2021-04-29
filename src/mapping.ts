import { log } from '@graphprotocol/graph-ts';
import { ProposalCreated, Voted, Space } from '../generated/xDaiSpace/Space';
import { Proposal, Vote } from '../generated/schema';


export function handleProposalCreated(event: ProposalCreated): void {
  let space = Space.bind(event.address);
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
  proposal.save();
}

export function handleVoted(event: Voted): void {
  let space = Space.bind(event.address);
  let proposalId = space.name() + '-' + event.params.proposalId.toString();
  let voteId = proposalId + '-' + event.params.voter.toHex();
  let vote = Vote.load(voteId);
  if (vote == null) {
    vote = new Vote(voteId);
    vote.voter = event.params.voter;
    vote.proposal = proposalId;
  }
  vote.optionId = event.params.optionId;
  vote.save();
}
