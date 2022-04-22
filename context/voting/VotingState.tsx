import React, { useReducer } from 'react';
import VotingContext from './VotingContext';
import VotingReducer from './VotingReducer';
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
	CREATE_USER,
	CREATE_CONTESTANT,
	CHANGE_USER_TYPE,
} from '../types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import VotingJson from 'artifacts/voting.json';
import convertToEther from 'helpers/convertToEther';

const VotingState = (props: any) => {
	const initialState = {
		address: null,
		isConnected: false,
		balance: '',
		error: null,
		message: null,
		web3: null,
		provider: null,
		providerOptions: null,
		web3Modal: null,
		contract: null,
		isChairman: false,
		users: [],
		contestants: [],
		isVotingEnabled: true,
		isVoteVisible: false,
		user: null,
	};

	const [state, dispatch] = useReducer(VotingReducer, initialState);

	//Connect Wallet
	const connectWallet = async (router: any, path: string = '') => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: process.env.NEXT_PUBLIC_INFURA_APP_ID,
				},
			},
		};
		const web3Modal = new Web3Modal({
			theme: 'dark',
			network: 'mainnet', // optional
			cacheProvider: true, // optional
			providerOptions, // required
			//disableInjectedProvider: false
		});
		try {
			const provider = await web3Modal.connect();

			const web3 = new Web3(provider);

			//  Get Accounts
			const accounts = await web3.eth.getAccounts();

			if (accounts.length > 0) {
				//Get Balance
				let balance;
				await web3.eth.getBalance(`${accounts[0]}`, function (err, result) {
					if (err) {
						dispatch({
							type: ERROR,
							payload: err.message,
						});
					} else {
						balance = convertToEther(web3, result);
					}
				});
				const contract = await loadContract(web3);
				const isChairman = await contract.methods
					.checkIfChairman(accounts[0])
					.call();
				dispatch({
					type: CONNECT_WALLET,
					payload: {
						balance,
						accounts,
						web3,
						web3Modal,
						providerOptions,
						provider,
						isChairman,
					},
				});
				localStorage.setItem('isWalletConnected', 'true');
				localStorage.setItem('count', '1');
				if (path) {
					localStorage.setItem('isChairman', 'true');
					return router.push(path);
				}
				if (isChairman) {
					router.push('/admin');
					localStorage.setItem('isChairman', 'true');
				} else {
					router.push('/dashboard');
				}
			}
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//Load Contract
	const loadContract = async (web3: any) => {
		try {
			const contract = new web3.eth.Contract(
				VotingJson.abi,
				`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
			);
			dispatch({
				type: LOAD_CONTRACT,
				payload: contract,
			});
			return contract;
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//fetch contestants
	const fetchContestants = async (contract: any) => {
		try {
			const res = await contract.methods.getContestants().call();
			let contestants: any = [];
			res.map((dat: any) => {
				let item: any = {};
				item.id = dat.id;
				item.name = dat.name;
				item.numberOfVotes = dat.numberOfVotes;
				item.hasWon = dat.hasWon;
				contestants.push(item);
			});
			dispatch({
				type: FETCH_CONTESTANTS,
				payload: contestants,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//fetch users
	const fetchUsers = async (contract: any, address: any) => {
		try {
			const res = await contract.methods.getUsers().call();
			let users: any = [];
			res.map((dat: any) => {
				let item: any = {};
				item.userId = dat.userId;
				item.userAddress = dat.userAddress;
				item.userType = dat.userType;
				item.hasVoted = dat.hasVoted;
				users.push(item);
			});
			let user = users.filter((user: any) => user.userAddress === address);
			dispatch({
				type: FETCH_USERS,
				payload: { users, user },
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	const createUser = async (
		contract: any,
		address: string,
		userAddress: any,
		userType: any
	) => {
		try {
			await contract.methods.createUser(userAddress, userType).send({
				from: address,
			});
			await fetchUsers(contract, address);
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};
	const createContestant = async (
		contract: any,
		address: string,
		name: string
	) => {
		try {
			await contract.methods.createContestant(name).send({
				from: address,
			});
			await fetchContestants(contract);
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};
	const changeUserType = async (
		contract: any,
		address: string,
		userId: any,
		userType: any
	) => {
		try {
			await contract.methods.changeUserType(userId, userType).send({
				from: address,
			});
			await fetchUsers(contract, address);
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//is vote visible
	const isVoteVisble = async (contract: any) => {
		try {
			const response = await contract.methods.isVotingVisible().call();
			dispatch({
				type: IS_VOTING_VISIBLE,
				payload: response,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//is vote enabled
	const isVoteEnabled = async (contract: any) => {
		try {
			const response = await contract.methods.isVotingEnabled().call();
			dispatch({
				type: IS_VOTING_ENABLED,
				payload: response,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//enable voting
	const enableVoting = async (contract: any, address: string) => {
		try {
			await contract.methods.enableVote().send({
				from: address,
			});
			await isVoteEnabled(contract);
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//disable voting
	const disableVoting = async (contract: any, address: string) => {
		try {
			await contract.methods.disbaleVote().send({
				from: address,
			});
			await isVoteEnabled(contract);
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//show votes
	const showVotes = async (contract: any, address: string, userType: any) => {
		try {
			await contract.methods.showVotesVisibility(userType).send({
				from: address,
			});
			await isVoteVisble(contract);
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//hide votes
	const hideVotes = async (contract: any, address: string, userType: any) => {
		try {
			await contract.methods.hideVotesVisibility(userType).send({
				from: address,
			});
			await isVoteVisble(contract);
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: (error as Error).message,
			});
		}
	};

	//Clear Error
	const clearError = () => {
		dispatch({
			type: CLEAR_ERROR,
		});
	};

	//Clear Message
	const clearMessage = () => {
		dispatch({
			type: CLEAR_MESSAGE,
		});
	};

	//Disconnect wallet
	const disconnectWallet = async (modal: any, router: any) => {
		modal.clearCachedProvider();
		dispatch({
			type: DISCONNECT_WALLET,
		});
		localStorage.removeItem('isWalletConnected');
		localStorage.removeItem('count');
		localStorage.removeItem('isChairman');
		router.push('/');
	};

	return (
		<VotingContext.Provider
			value={{
				address: state.address,
				isConnected: state.isConnected,
				balance: state.balance,
				error: state.error,
				message: state.message,
				web3: state.web3,
				provider: state.provider,
				providerOptions: state.providerOptions,
				web3Modal: state.web3Modal,
				contract: state.contract,
				isChairman: state.isChairman,
				users: state.users,
				contestants: state.contestants,
				isVotingEnabled: state.isVotingEnabled,
				isVoteVisible: state.isVoteVisible,
				user: state.user,
				clearError,
				connectWallet,
				disconnectWallet,
				clearMessage,
				loadContract,
				fetchContestants,
				fetchUsers,
				isVoteEnabled,
				isVoteVisble,
				enableVoting,
				disableVoting,
				hideVotes,
				showVotes,
				changeUserType,
				createContestant,
				createUser,
			}}
		>
			{props.children}
		</VotingContext.Provider>
	);
};

export default VotingState;
