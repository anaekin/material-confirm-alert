import React from 'react';
import { ConfirmationDialog } from './ConfirmationDialog';

const ConfirmAlertContext = React.createContext();

const useConfirmAlert = () => {
	const context = React.useContext(ConfirmAlertContext);
	return context;
};

const defaultOptions = {
	okButtonText: 'Ok',
	cancelButtonText: 'Cancel',
	title: 'Are you sure?',
	description: '',
};

const ConfirmAlertProvider = (props) => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState(defaultOptions);
	const [promiseObject, setPromiseObject] = React.useState([]);

	/**
	 * @typedef {Object} Options
	 * @property {string} [okButtonText] Sets the 'Ok' button text (Default: Ok)
	 * @property {string} [cancelButtonText] Sets the 'Cancel' button text (Default: Cancel)
	 * @property {string} [title] Sets the title for confirmation dialog (Default: Are you sure?)
	 * @property {string} [description] Sets the description for confirmation dialog
	 */
	/**
	 * This function is used to call the confirmation dialog.
	 * @function
	 * @param {(Options|string)} options Sets the options for the Confirmation dialog
	 * @returns {Promise<boolean>} returns a promise
	 */
	const confirm = (options = defaultOptions) => {
		try {
			if (typeof options !== 'object' && typeof options !== 'string') {
				throw new Error(
					"options should be either 'string' or 'object' in useConfirmAlert 'confirm' function"
				);
			}

			if (typeof options === 'string') {
				options = { title: options || defaultOptions.title };
			}

			const confirmOptions = { ...defaultOptions, ...options };
			setOptions(confirmOptions);

			return new Promise((resolve, reject) => {
				setOpen(true);
				setPromiseObject([resolve, reject]);
			});
		} catch (e) {
			console.error(e);
		}
	};

	const onClose = (result, [resolve]) => {
		setOpen(false);
		if (result) {
			resolve(true);
		} else {
			resolve(false);
		}
	};

	return (
		<React.Fragment>
			<ConfirmAlertContext.Provider value={confirm}>
				{props.children}
			</ConfirmAlertContext.Provider>
			<ConfirmationDialog
				open={open}
				onClose={(result) => onClose(result, promiseObject)}
				options={options}
			/>
		</React.Fragment>
	);
};

export { ConfirmAlertContext, useConfirmAlert, ConfirmAlertProvider };
