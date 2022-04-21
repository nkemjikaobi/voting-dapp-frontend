import React from 'react';
import { AiFillEdit } from 'react-icons/ai';

const UserList = ({ setChangeUserType }: any) => {
	return (
		<div>
			<table className='table-auto w-[900px] bg-white rounded-lg'>
				<thead>
					<tr className='border-b-2 text-left h-16'>
						<th>S/N</th>
						<th>Address</th>
						<th>User Type</th>
						<th>hasUserVoted</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody className=''>
					<tr
						className='border-b-2 h-16 hover:bg-gray-200 cursor-pointer'
						key=''
					>
						<td className=''>1</td>
						<td>0x6917889Fe7922AA9A88aB4FfdBf71391fdb06A40</td>
						<td>Teacher</td>
						<td>No</td>
						<td>
							<AiFillEdit
								className='text-2xl'
								onClick={() => setChangeUserType(true)}
							/>
						</td>
					</tr>
					<tr
						className='border-b-2 h-16 hover:bg-gray-200 cursor-pointer'
						key=''
					>
						<td className=''>2</td>
						<td>0x6917889Fe7922AA9A88aB4FfdBf71391fdb06A40</td>
						<td>Student</td>
						<td>Yes</td>
						<td>
							<AiFillEdit
								className='text-2xl'
								onClick={() => setChangeUserType(true)}
							/>
						</td>
					</tr>
					<tr
						className='border-b-2 h-16 hover:bg-gray-200 cursor-pointer'
						key=''
					>
						<td className=''>3</td>
						<td>0x6917889Fe7922AA9A88aB4FfdBf71391fdb06A40</td>
						<td>Board Member</td>
						<td>Yes</td>
						<td>
							<AiFillEdit
								className='text-2xl'
								onClick={() => setChangeUserType(true)}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
