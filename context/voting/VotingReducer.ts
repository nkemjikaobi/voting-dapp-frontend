import {
	CONNECT_WALLET,
	ERROR,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
	DISCONNECT_WALLET,
	LOAD_CONTRACT,
	FETCH_CONTESTANTS,
	FETCH_USERS,
	IS_VOTING_ENABLED,
	IS_VOTING_VISIBLE,
	FETCH_VOTES,
	IS_VOTING_ENDED,
	IS_CONTRACT_DISABLED
} from '../types';

const VotingReducer = (state: any, action: any) => {
	switch (action.type) {
		case CONNECT_WALLET:
			return {
				...state,
				address: action.payload.accounts[0],
				isConnected: true,
				balance: action.payload.balance,
				web3: action.payload.web3,
				web3Modal: action.payload.web3Modal,
				providerOptions: action.payload.providerOptions,
				provider: action.payload.provider,
				isChairman: action.payload.isChairman,
			};
		case LOAD_CONTRACT:
			return {
				...state,
				contract: action.payload,
			};

		case IS_VOTING_VISIBLE:
			return {
				...state,
				isVoteVisible: action.payload,
			};
		case IS_VOTING_ENDED:
			return {
				...state,
				isVotingEnded: action.payload,
			};
		case IS_CONTRACT_DISABLED:
			return {
				...state,
				isContractDisabled: action.payload,
			};
		case IS_VOTING_ENABLED:
			return {
				...state,
				isVotingEnabled: action.payload,
			};

		case FETCH_CONTESTANTS:
			return {
				...state,
				contestants: action.payload,
			};
		case FETCH_VOTES:
			return {
				...state,
				votes: action.payload,
			};
		case FETCH_USERS:
			return {
				...state,
				users: action.payload.users,
				user: action.payload.user[0],
			};

		case DISCONNECT_WALLET:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
				web3: null,
				web3Modal: null,
				providerOptions: null,
				provider: null,
				isChairman: false,
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case CLEAR_MESSAGE:
			return {
				...state,
				message: null,
			};
		default:
			return state;
	}
};
export default VotingReducer;
