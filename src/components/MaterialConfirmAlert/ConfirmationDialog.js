import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

export const ConfirmationDialog = ({
	open,
	options: { title, description, okButtonText, cancelButtonText },
	onClose,
	...props
}) => {
	const handleCancel = () => {
		onClose(false);
	};

	const handleOk = () => {
		onClose(true);
	};

	return (
		<Dialog id="confirmation-dialog" fullWidth open={open} {...props}>
			<DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
			{description && (
				<DialogContent>
					<DialogContentText id="confirmation-dialog-description">
						{description}
					</DialogContentText>
				</DialogContent>
			)}
			<DialogActions id="confirmation-dialog-actions">
				<Button autoFocus onClick={handleCancel} variant="outlined" color="secondary">
					{cancelButtonText}
				</Button>
				<Button onClick={handleOk} variant="contained" color="primary">
					{okButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
