import React, { useEffect, useState, useContext } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import Image from 'next/image';
import VotingContext from 'context/voting/VotingContext';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { GiPodiumWinner } from 'react-icons/gi';

const VoterCard = ({ contestant }: any) => {
	const [user1, setUser] = useState<any>(null);
	const fetchUserImage = async () => {
		const res = await axios.get('https://randomuser.me/api/');
		setUser(res.data.results[0].picture);
	};
	const [loading, setLoading] = useState(false);
	const [winnerId, setWinnerId] = useState<any>();
	const votingContext = useContext(VotingContext);

	const {
		user,
		isVotingEnded,
		isVotingEnabled,
		isVoteVisible,
		vote,
		contract,
		address,
		contestants,
		fetchUsers,
	} = votingContext;

	useEffect(() => {
		if (user1 === null) {
			fetchUserImage();
		}
	}, [user1]);

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

	const checkIfValidUser = async (contract: any, address: any) => {
		try {
			const res = await contract.methods.isValidUser(address).call();
			return res;
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	const handleVote = async () => {
		setLoading(true);
		const res = await checkIfValidUser(contract, address);
		if (!res) {
			setLoading(false);
			return toast.error('Contact the chairman to add you as a user');
		}
		try {
			await vote(contract, address, contestant.id, user.userId);
			toast.success('Vote successful');
		} catch (error) {
			toast.error((error as Error).message);
		}
		setLoading(false);
	};

	const compileResult = () => {
		const max =
			contestants &&
			contestants.reduce(function (prev: any, current: any) {
				return prev.numberOfVotes > current.numberOfVotes ? prev : current;
			});
		setWinnerId(max.id);
	};

	useEffect(() => {
		let mounted = true;
		if (mounted && contestants.length > 0) {
			compileResult();
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [contestants]);

	return (
		<div className='bg-white drop-shadow-md flex flex-col justify-center items-center rounded-lg'>
			<h4 className='my-4 font-bold'>Voter details</h4>
			{user1 && (
				<div className='border rounded-full w-24 h-24 mb-4'>
					<Image
						src={`${user1.medium}`}
						className='rounded-full'
						alt=''
						height={100}
						width={100}
					/>
				</div>
			)}

			<p className='font-bold'>{contestant.name}</p>
			{isVoteVisible && (
				<p className='text-base text-gray-500 my-4'>
					{contestant.numberOfVotes} votes
				</p>
			)}

			{user && user.hasVoted ? (
				<p className='flex items-center justify-center'>
					<AiOutlineClose className=' text-red-500' />
					Already voted.
				</p>
			) : (
				<p className='flex items-center justify-center'>
					<FiCheckCircle className='mr-2 text-green-500' />
					You can vote.
				</p>
			)}
			{/* {winnerId === contestant.id ? (
				<button className='bg-green-500 mb-8 w-2/3 my-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'>
					winner
				</button>
			) : (
				<button
					className={`bg-[#4B60B0] mb-8 w-2/3 my-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900 ${
						!isVotingEnabled ||
						(user && user.hasVoted && 'pointer-events-none opacity-30')
					}`}
					onClick={() => handleVote()}
				>
					{loading ? (
						<>
							<FaSpinner className='animate-spin h-5 w-5 mr-3' />
							casting vote
						</>
					) : (
						<>vote</>
					)}
				</button>
			)} */}
			<button
				className={`bg-[#4B60B0] mb-8 w-2/3 my-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900 ${
					!isVotingEnabled ||
					(user && user.hasVoted && 'pointer-events-none opacity-30')
				}`}
				onClick={() => handleVote()}
			>
				{loading ? (
					<>
						<FaSpinner className='animate-spin h-5 w-5 mr-3' />
						casting vote
					</>
				) : (
					<>vote</>
				)}
			</button>
		</div>
	);
};

export default VoterCard;
