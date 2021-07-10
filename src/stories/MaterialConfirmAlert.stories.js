import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { ConfirmAlertProvider, useConfirmAlert } from '../components/MaterialConfirmAlert';

const MaterialConfirmAlert = () => {
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

storiesOf('Material Confirm Alert', module).add('Example 1', () => (
	<ConfirmAlertProvider>
		<MaterialConfirmAlert />
	</ConfirmAlertProvider>
));
