import React from 'react';

const ContestantList = () => {
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
				<tbody className=''>
					<tr
						className='border-b-2 h-16 hover:bg-gray-200 cursor-pointer'
						key=''
					>
						<td className=''>1</td>
						<td>Nkemjika Obi</td>
						<td>23</td>
					</tr>
					<tr
						className='border-b-2 h-16 hover:bg-gray-200 cursor-pointer'
						key=''
					>
						<td className=''>2</td>
						<td>Ebube Okoli</td>
						<td>14</td>
					</tr>
					<tr
						className='border-b-2 h-16 hover:bg-gray-200 cursor-pointer'
						key=''
					>
						<td className=''>3</td>
						<td>Uche Uzoachi</td>
						<td>6</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ContestantList;
