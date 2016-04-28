import { 
  FETCH_PROPOSALS, 
  FETCH_PROPOSAL, 
  UPDATE_PROPOSAL,
  APPEND_PROPOSALS_PAGE, 
  VOTE_PROPOSAL,
  UPDATE_ANSWER,
  FETCH_RELATED_MEETINGS,
  FETCH_REFERENCES,
  FETCH_ACTION_PLANS,
  HIDE_PROPOSAL,
  HIDE_PROPOSAL_AUTHOR,
  FLAG_PROPOSAL,
  UNFLAG_PROPOSAL,
} from './proposals.actions';

import { FOLLOW, UNFOLLOW, FETCH_FOLLOW } from '../follows/follows.actions';

export const proposals = function (state = [], action) {
  switch (action.type) {
    case FETCH_PROPOSALS:
      return action.payload.data.proposals
    case APPEND_PROPOSALS_PAGE:
      return [
        ...state,
        ...action.payload.data.proposals
      ];
    case VOTE_PROPOSAL:
      return state.map(p => proposal(p, action));
  }
  return state;
}

export const proposal = function (state = {}, action) {
  let follow = null;

  switch (action.type) {
    case FETCH_PROPOSAL:
    case UPDATE_PROPOSAL:
    case HIDE_PROPOSAL:
    case FLAG_PROPOSAL:
    case UNFLAG_PROPOSAL:
      let proposal = action.payload.data.proposal;

      return {
        ...proposal,
        meetings: state.meetings,
        references: state.references
      }
    case FOLLOW:
      follow = action.payload.data.follow;

      if (follow.following_type === "Proposal" && follow.following_id === state.id) {
        return {
          ...state,
          follow
        };
      }

      return state;
    case FETCH_FOLLOW:
      [follow] = action.payload.data.follows;

      if (follow && follow.following_type === "Proposal" && follow.following_id === state.id) {
        return {
          ...state,
          follow
        };
      }

      return state;
    case UNFOLLOW:
      follow = action.payload.data.follow;

      if (follow.following_type === "Proposal" && follow.following_id === state.id) {
        return {
          ...state,
          follow: null
        };
      }

      return state;
    case HIDE_PROPOSAL_AUTHOR:
      let author = action.payload.data.user;

      return {
        ...state,
        author
      }
    case FETCH_RELATED_MEETINGS:
      let meetings = action.payload.data.meetings;

      return {
        ...state,
        meetings
      };
    case FETCH_REFERENCES:
      let references = action.payload.data.proposals;

      return {
        ...state,
        references
      };
  case FETCH_ACTION_PLANS:
    let actionPlans = action.payload.data.action_plans;

    return {
        ...state,
      actionPlans
    };
    case UPDATE_ANSWER:
      let answer = action.payload.data.proposal_answer;

      if (state.id === answer.proposal_id) {
        return {
          ...state,
          answer
        };
      }
      return state;
    case VOTE_PROPOSAL:
      let vote = action.payload.data.vote;

      if (state.id === vote.votable.id) {
        return {
          ...state,
          total_votes: state.total_votes + 1,
          voted: true
        };
      }
      return state;
  }
  return state;
}