import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import VotingContext from 'context/voting/VotingContext';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const CreateUser = ({ setCreateUser }: any) => {
	const [loading, setLoading] = useState(false);
	const [address, setAddress] = useState<string>('');
	const [userType, setUserType] = useState<any>(2);
	return (
		<div className='text-white bg-black rounded-lg p-10'>
			<Toaster position='top-right' />
			<div className='flex justify-end items-center cursor-pointer'>
				<AiOutlineClose onClick={() => setCreateUser(false)} />
			</div>
			<div className=''>
				<div>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						User Address
					</label>
					<input
						type='text'
						className='bg-zinc-900 w-full text-white rounded-lg p-5 border border-stone-400'
						placeholder='user address'
						value={address}
						onChange={e => setAddress(e.target.value)}
					/>
				</div>
				<div className='mt-8'>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						User Type
					</label>
					<select
						className='bg-zinc-900 w-full text-white rounded-lg p-5 border border-stone-400'
						value={userType}
						onChange={e => setUserType(e.target.value)}
					>
						<option value={0}>Board Member</option>
						<option value={1}>Teacher</option>
						<option selected value={2}>
							Student
						</option>
					</select>
				</div>
				<button
					//onClick={() => handleShare()}
					className='flex justify-center items-center mt-10 bg-[#4B60B0] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900'
				>
					{loading ? (
						<>
							<FaSpinner className='animate-spin h-5 w-5 mr-3' />
							Creating
						</>
					) : (
						<>Create User</>
					)}
				</button>
			</div>
		</div>
	);
};

export default CreateUser;
