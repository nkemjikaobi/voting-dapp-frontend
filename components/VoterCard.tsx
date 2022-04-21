import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

const VoterCard = () => {
	return (
		<div className='bg-white drop-shadow-md flex flex-col justify-center items-center rounded-lg'>
			<h4 className='my-4 font-bold'>Voter details</h4>
			<div className='border rounded-full border-[#4B60B0] w-24 h-24 mb-4'></div>
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
