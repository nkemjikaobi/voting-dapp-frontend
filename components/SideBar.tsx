import Link from 'next/link';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { ImUsers } from 'react-icons/im';
import { RiDashboardLine } from 'react-icons/ri';
import { MdLogout } from 'react-icons/md';
import VotingContext from 'context/voting/VotingContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

const SideBar = () => {
	const votingContext = useContext(VotingContext);

	const { web3Modal, disconnectWallet } = votingContext;
	const router = useRouter();
	return (
		<div className='bg-black text-white w-1/6 absolute left-0 h-full p-5'>
			<Link href='/admin'>
				<a href='#' className='text-2xl font-bold'>
					Voting Dapp
				</a>
			</Link>
			<Link href='/admin'>
				<a
					href='#'
					className='flex items-center mt-16 hover:text-[#498feb] cursor-pointer'
				>
					<RiDashboardLine className='text-3xl mr-4' /> Manage
				</a>
			</Link>
			<Link href='/admin/contestants'>
				<a
					href='#'
					className='flex items-center mt-16 hover:text-[#498feb] cursor-pointer'
				>
					<ImUsers className='text-3xl mr-4' /> Contestants
				</a>
			</Link>
			<Link href='/admin/users'>
				<a
					href='#'
					className='flex items-center mt-16 hover:text-[#498feb] cursor-pointer'
				>
					<FaUsers className='text-3xl mr-4' /> Users
				</a>
			</Link>
			<button
				onClick={() => disconnectWallet(web3Modal, router)}
				className='flex items-center mt-16 hover:text-[#498feb] cursor-pointer'
			>
				<MdLogout className='text-3xl mr-4' /> Logout
			</button>
		</div>
	);
};

export default SideBar;
