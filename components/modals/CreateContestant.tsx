import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import VotingContext from 'context/voting/VotingContext';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const CreateContestant = ({ setCreateContestant }: any) => {
	const votingContext = useContext(VotingContext);
	const { createContestant, contract, address } = votingContext;
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const handleSubmit = async () => {
		if (name === '') {
			return toast.error('Provide a name');
		}
		setLoading(true);
		try {
			await createContestant(contract, address, name);
			toast.success('Contestant added');
		} catch (error) {
			toast.error((error as Error).message);
		}
		setLoading(false);
		setCreateContestant(false);
	};
	return (
		<div className='text-white bg-black rounded-lg p-10'>
			<Toaster position='top-right' />
			<div className='flex justify-end items-center cursor-pointer'>
				<AiOutlineClose onClick={() => setCreateContestant(false)} />
			</div>
			<div className=''>
				<div>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						Contestant Name
					</label>
					<input
						type='text'
						className='bg-zinc-900 w-full text-white rounded-lg p-5 border border-stone-400'
						placeholder='contestant name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<button
					onClick={() => handleSubmit()}
					className='flex justify-center items-center mt-10 bg-[#4B60B0] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900'
				>
					{loading ? (
						<>
							<FaSpinner className='animate-spin h-5 w-5 mr-3' />
							Creating
						</>
					) : (
						<>Create Contestant</>
					)}
				</button>
			</div>
		</div>
	);
};

export default CreateContestant;
