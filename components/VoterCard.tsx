import React, { useEffect, useState, useContext } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import Image from 'next/image';
import VotingContext from 'context/voting/VotingContext';

const VoterCard = ({ contestant }: any) => {
	const [user1, setUser] = useState<any>(null);
	const fetchUserImage = async () => {
		const res = await axios.get('https://randomuser.me/api/');
		setUser(res.data.results[0].picture);
	};
	const votingContext = useContext(VotingContext);

	const { user, isVotingEnabled, isVoteVisible } = votingContext;

	useEffect(() => {
		if (user1 === null) {
			fetchUserImage();
		}
	}, [user1]);
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

			<button
				className={`bg-[#4B60B0] mb-8 w-2/3 my-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900 ${
					!isVotingEnabled && 'pointer-events-none opacity-30'
				}`}
			>
				vote
			</button>
		</div>
	);
};

export default VoterCard;
