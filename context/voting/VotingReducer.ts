import {
	CONNECT_WALLET,
	ERROR,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
	DISCONNECT_WALLET,
	LOAD_CONTRACT,
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
			};
		case LOAD_CONTRACT:
			return {
				...state,
				contract: action.payload,
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
