import SideBar from 'components/SideBar';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import VotingContext from 'context/voting/VotingContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ContestantList from 'components/ContestantList';
import CreateContestant from 'components/modals/CreateContestantt';

const ContestantPage = () => {
	const votingContext = useContext(VotingContext);
	const [createContestant, setCreateContestant] = useState<boolean>(false);

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
		contestants,
		contract,
		fetchContestants,
	} = votingContext;
	const router = useRouter();
	const reconnectWallet = async () => {
		await connectWallet(router, router.pathname);
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

	return (
		<div>
			<Head>
				<title>Admin</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Toaster position='top-right' />
			<div className={`${createContestant && 'blur-lg'}`}>
				<SideBar />
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
				<h3 className='absolute left-[400px] top-[50px] text-4xl'>
					Contestants
				</h3>
				<div className='absolute left-[700px] top-[50px]'>
					<button
						onClick={() => setCreateContestant(true)}
						className='bg-[#4B60B0] flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'
					>
						create contestant
					</button>
				</div>
				<div className='flex absolute left-[400px] top-[100px] mt-8'>
					<ContestantList data={contestants} />
				</div>
			</div>
			{createContestant && (
				<div className='absolute w-[500px] top-[300px] left-[600px]'>
					<CreateContestant setCreateContestant={setCreateContestant} />
				</div>
			)}
		</div>
	);
};

export default ContestantPage;
