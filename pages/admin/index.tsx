import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';
import VotingContext from 'context/voting/VotingContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from 'components/SideBar';
import DetailCard from 'components/DetailCard';
import Switch from 'react-switch';
import formatUserType from 'helpers/formatUserType';
import { FaSpinner } from 'react-icons/fa';

const AdminPage: NextPage = () => {
	const votingContext = useContext(VotingContext);
	const [loading1, setLoading1] = useState<boolean>(false);
	const [loading2, setLoading2] = useState<boolean>(false);
	const [loading3, setLoading3] = useState(false);
	const [loading4, setLoading4] = useState(false);

	const {
		connectWallet,
		message,
		error,
		clearMessage,
		clearError,
		balance,
		address,
		web3Modal,
		disconnectWallet,
		fetchContestants,
		fetchUsers,
		contract,
		contestants,
		users,
		isVotingEnabled,
		isVoteVisible,
		enableVoting,
		disableVoting,
		showVotes,
		hideVotes,
		user,
		votes,
		isVoteEnabled,
		checkIfEnded,
		checkIfContractIsDisabled,
		isVoteVisble,
		fetchVotes,
		isVotingEnded,
		isContractDisabled,
		collateResults,
	} = votingContext;
	const router = useRouter();

	const reconnectWallet = async () => {
		await connectWallet(router);
	};

	//Reconnect wallet on page refresh
	useEffect(() => {
		let mounted = true;

		if (mounted && localStorage?.getItem('isWalletConnected') === 'true') {
			reconnectWallet();
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, []);

	//Handle Messages
	useEffect(() => {
		let mounted = true;

		if (mounted && message !== null) {
			toast.success(message);
			setTimeout(() => clearMessage(), 3000);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [message]);

	//Handle Errors
	useEffect(() => {
		let mounted = true;

		if (mounted && error !== null) {
			toast.error(error);
			setTimeout(() => clearError(), 3000);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		let mounted = true;

		if (mounted && contract !== null) {
			isVoteEnabled(contract);
			checkIfEnded(contract);
			checkIfContractIsDisabled(contract);
			isVoteVisble(contract);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [contract]);

	//Fetch users
	useEffect(() => {
		let mounted = true;
		if (mounted && address !== null && contract !== null) {
			fetchUsers(contract, address);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [address, contract]);

	//Fetch contestants
	useEffect(() => {
		let mounted = true;
		if (mounted && address !== null && contract !== null) {
			fetchContestants(contract);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [address, contract]);

	//Fetch votes
	useEffect(() => {
		let mounted = true;
		if (mounted && address !== null && contract !== null) {
			fetchVotes(contract);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [address, contract]);

	const handleVotes = async () => {
		if (isVotingEnabled) {
			try {
				setLoading1(true);
				await disableVoting(contract, address);
				toast.success('Voting disabled');
				setLoading1(false);
			} catch (error) {
				toast.error((error as Error).message);
				setLoading1(false);
			}
		} else {
			try {
				setLoading1(true);
				await enableVoting(contract, address);
				toast.success('Voting enabled');
				setLoading1(false);
			} catch (error) {
				toast.error((error as Error).message);
				setLoading1(false);
			}
		}
	};
	const handleVotesVisiblity = async () => {
		const type = formatUserType(user.userType);
		if (isVoteVisible) {
			try {
				setLoading2(true);
				await hideVotes(contract, address, type);
				toast.success('Votes are now hidden');
				setLoading2(false);
			} catch (error) {
				toast.error((error as Error).message);
				setLoading2(false);
			}
		} else {
			try {
				setLoading2(true);
				await showVotes(contract, address, type);
				toast.success('Votes are now visible');
				setLoading2(false);
			} catch (error) {
				toast.error((error as Error).message);
				setLoading2(false);
			}
		}
	};

	const handleEndVotes = async () => {
		setLoading3(true);
		try {
			const type = formatUserType(user.userType);
			await collateResults(contract, address, type);
		} catch (error) {
			toast.error((error as Error).message);
		}
		setLoading3(false);
	};

	const handleDisableContract = async () => {
		setLoading4(true);
		if (isContractDisabled) {
			try {
				await contract.methods.enableContract().send({
					from: address,
				});
				toast.success('Contract is now active');
			} catch (error) {
				toast.error((error as Error).message);
			}
		} else {
			try {
				await contract.methods.disableContract().send({
					from: address,
				});
				toast.success('Contract has been disabled');
			} catch (error) {
				toast.error((error as Error).message);
			}
		}
		setLoading4(false);
	};
	return (
		<div>
			<Head>
				<title>Admin</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Toaster position='top-right' />
			<main className='container mx-auto'>
				<div>
					<SideBar />
				</div>
				<div className='flex absolute right-10 mt-8'>
					<button className='bg-[#4B60B0] mr-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'>
						{balance} ETH |{' '}
						{address && (
							<span className='ml-2 text-purple-300'>{`${address.slice(
								0,
								3
							)}...${address.slice(-3)}`}</span>
						)}
					</button>
					<button
						onClick={() => disconnectWallet(web3Modal, router)}
						className='bg-[#4B60B0] flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'
					>
						disconnect
					</button>
				</div>
				<div className=' grid grid-cols-1 md:grid-cols-3 gap-8 w-4/6 ml-32 absolute top-32 left-[300px]'>
					<DetailCard name='Contestants' icon='ImUsers' count={contestants} />
					<DetailCard name='Users' icon='FaUsers' count={users} />
					<DetailCard name='Votes' count={votes} />
				</div>
				<div className='absolute top-[350px] left-[400px]'>
					<label className='flex items-center'>
						<span className='mr-4'>Enable / Disable voting</span>
						<Switch onChange={() => handleVotes()} checked={isVotingEnabled} />
						{loading1 && <p className='ml-2'>please wait...</p>}
					</label>
					<label className='flex items-center mt-8'>
						<span className='mr-4'>Show votes</span>
						<Switch
							onChange={() => handleVotesVisiblity()}
							checked={isVoteVisible}
						/>
						{loading2 && <p className='ml-2'>please wait...</p>}
					</label>
					<button
						onClick={() => handleEndVotes()}
						className='bg-[#4B60B0] mt-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'
					>
						{loading3 ? (
							<>
								<FaSpinner className='animate-spin h-5 w-5 mr-3' />
								ending
							</>
						) : isVotingEnded ? (
							<>voting ended</>
						) : (
							<>end vote</>
						)}
					</button>
					<button
						onClick={() => handleDisableContract()}
						className='bg-[#4B60B0] mt-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'
					>
						{loading4 ? (
							<>
								<FaSpinner className='animate-spin h-5 w-5 mr-3' />
								changing state...
							</>
						) : isContractDisabled ? (
							<>contract disabled</>
						) : (
							<>change state of contract</>
						)}
					</button>
				</div>
			</main>
		</div>
	);
};

export default AdminPage;
