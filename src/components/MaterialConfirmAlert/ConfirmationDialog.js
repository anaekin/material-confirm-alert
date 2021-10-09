import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

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
				<Button
					autoFocus
					onClick={handleCancel}
					variant="outlined"
					color="secondary"
				>
					{cancelButtonText}
				</Button>
				<Button onClick={handleOk} variant="contained" color="primary">
					{okButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
