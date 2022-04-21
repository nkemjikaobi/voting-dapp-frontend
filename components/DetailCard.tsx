import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { ImUsers } from 'react-icons/im';

const DetailCard = ({ name, count }: any) => {
	return (
		<div className='bg-white drop-shadow-md rounded-lg p-5'>
			<div className='flex justify-between items-center'>
				<p>{name}</p>
				<FaUsers className='text-4xl' />
			</div>

			<p className='text-4xl text-gray-500 my-4'>
				{count ? count.length : 0}
			</p>
		</div>
	);
};

export default DetailCard;
