import React from 'react';

const ContestantList = ({ data }: any) => {
	return (
		<div>
			<table className='table-auto  w-[900px] bg-white rounded-lg'>
				<thead>
					<tr className='border-b-2 text-left h-16'>
						<th>S/N</th>
						<th>Name</th>
						<th>Number of Votes</th>
					</tr>
				</thead>
				{data.length > 0 ? (
					data.map((d: any, index: number) => (
						<tbody className='' key={index}>
							<tr
								className='border-b-2 h-16 hover:bg-gray-200 cursor-pointer'
								key=''
							>
								<td className=''>{d.id}</td>
								<td>{d.name}</td>
								<td>{d.numberOfVotes}</td>
							</tr>
						</tbody>
					))
				) : (
					<div className='my-4 ml-4'>No contestants yet...</div>
				)}
			</table>
		</div>
	);
};

export default ContestantList;
