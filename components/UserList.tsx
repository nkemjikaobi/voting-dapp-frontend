import React from 'react';
import { AiFillEdit } from 'react-icons/ai';

const UserList = ({ setChangeUserType, data, setUserId, setUserType }: any) => {
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
				{data.length > 0 ? (
					data.map((d: any, index: number) => (
						<tbody className='' key={index}>
							<tr
								className='border-b-2 h-16 hover:bg-gray-200 cursor-pointer'
								key=''
							>
								<td className=''>{d.userId}</td>
								<td>{d.userAddress}</td>
								<td>{d.userType}</td>
								<td>{d.hasVoted ? 'Yes' : 'No'}</td>
								<td>
									<AiFillEdit
										className='text-2xl'
										onClick={() => {
											setChangeUserType(true);
											setUserId(d.userId);
											setUserType(d.userType);
										}}
									/>
								</td>
							</tr>
						</tbody>
					))
				) : (
					<div className='my-4 ml-4'>No users yet...</div>
				)}
			</table>
		</div>
	);
};

export default UserList;
