import React, { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import Image from 'next/image';

const VoterCard = () => {
	const [user, setUser] = useState<any>(null);
	const fetchUserImage = async () => {
		const res = await axios.get('https://randomuser.me/api/');
		console.log(res.data.results[0].picture);
		setUser(res.data.results[0].picture);
	};

	useEffect(() => {
		if (user === null) {
			fetchUserImage();
		}
	}, [user]);
	return (
		<div className='bg-white drop-shadow-md flex flex-col justify-center items-center rounded-lg'>
			<h4 className='my-4 font-bold'>Voter details</h4>
			{user && (
				<div className='border rounded-full w-24 h-24 mb-4'>
					<Image
						src={`${user.medium}`}
						className='rounded-full'
						alt=''
						height={100}
						width={100}
					/>
				</div>
			)}

			<p className='font-bold'>Nkemjika Obi</p>
			<p className='text-base text-gray-500 my-4'>47 votes</p>
			<p className='flex items-center justify-center'>
				<FiCheckCircle className='mr-2 text-green-500' />
				You can vote.
			</p>
			<p className='flex items-center justify-center'>
				<AiOutlineClose className=' text-red-500' />
				Already voted.
			</p>
			<button className='bg-[#4B60B0] w-2/3 my-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'>
				vote
			</button>
		</div>
	);
};

export default VoterCard;
