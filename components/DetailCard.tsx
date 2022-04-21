import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { ImUsers } from 'react-icons/im';

const DetailCard = ({ name, icon }: any) => {
	return (
		<div className='bg-white drop-shadow-md rounded-lg p-5'>
			<div className='flex justify-between items-center'>
				<p>{name}</p>
				<FaUsers className='text-4xl'/>
			</div>

			<p className='text-4xl text-gray-500 my-4'>47 votes</p>
		</div>
	);
};

export default DetailCard;
