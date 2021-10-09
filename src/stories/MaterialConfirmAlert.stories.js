import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@mui/material/Button';
import {
	ConfirmAlertProvider,
	useConfirmAlert,
} from '../components/MaterialConfirmAlert';

const MaterialConfirmAlertExample1 = () => {
	const confirm = useConfirmAlert();
	const handleClick = async () => {
		const result = await confirm('Do you want to delete?');
		if (result) {
			alert('User confirmed');
		} else {
			alert('User cancelled');
		}
	};
	return (
		<Button variant="contained" color="primary" onClick={handleClick}>
			Delete
		</Button>
	);
};

const MaterialConfirmAlertExample2 = () => {
	const confirm = useConfirmAlert();

	const handleClick = async () => {
		const result = await confirm({
			title: 'Do you want to delete this item?',
			description: 'This item will be deleted forever and cannot be undone',
			okButtonText: 'Yes',
			cancelButtonText: 'No',
		});
		if (result) {
			alert('User confirmed');
		} else {
			alert('User cancelled');
		}
	};
	return (
		<Button variant="contained" color="primary" onClick={handleClick}>
			Delete
		</Button>
	);
};

storiesOf('Material Confirm Alert', module).add('Example 1', () => (
	<ConfirmAlertProvider>
		<MaterialConfirmAlertExample1 />
	</ConfirmAlertProvider>
));

storiesOf('Material Confirm Alert', module).add('Example 2', () => (
	<ConfirmAlertProvider>
		<MaterialConfirmAlertExample2 />
	</ConfirmAlertProvider>
));
