import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { ConfirmAlertProvider, useConfirmAlert } from '../components/MaterialConfirmAlert';

const MaterialConfirmAlertExample1 = () => {
	const confirm = useConfirmAlert();
	const handleClick = () => {
		confirm('Do you want to delete?', (result) => {
			if (result) {
				alert(`User selected 'OK'`);
			} else {
				alert(`User selected 'Cancel'`);
			}
		});
	};
	return (
		<Button variant="contained" color="primary" onClick={handleClick}>
			Delete
		</Button>
	);
};

const MaterialConfirmAlertExample2 = () => {
	const confirm = useConfirmAlert();
	const handleClick = () => {
		confirm(
			{
				title: 'Do you want to delete this item?',
				description: 'This item will be deleted forever and cannot be undone',
				okButtonText: 'Yes',
				cancelButtonText: 'No',
			},
			(result) => {
				if (result) {
					alert(`User selected 'OK'`);
				} else {
					alert(`User selected 'Cancel'`);
				}
			}
		);
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
