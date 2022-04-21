import Web3 from 'web3';

const formatUserType = (userType: string) => {
	if (userType === 'BoardMember') {
		return 0;
	} else if (userType === 'Teacher') {
		return 1;
	} else if (userType === 'Student') {
		return 2;
	}
};

export default formatUserType;
