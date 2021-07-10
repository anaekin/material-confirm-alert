import { Fragment, useState, useContext, createContext } from 'react';
import { ConfirmationDialog } from './ConfirmationDialog';

export const ConfirmAlertContext = createContext();
/**
 * @typedef {Object} Options
 * @property {string} [okButtonText] Sets the 'Ok' button text (Default: Ok)
 * @property {string} [cancelButtonText] Sets the 'Cancel' button text (Default: Cancel)
 * @property {string} [title] Sets the title for confirmation dialog (Default: Are you sure?)
 * @property {string} [description] Sets the description for confirmation dialog
 */
/**
 * This function is used to call the confirmation dialog.
 * @typedef {function((Options|string), function(boolean))} confirm
 * @param {(Options|string)} options Sets the options for the Confirmation dialog
 * @param {function(boolean)} cb The callback that handles the user confirmation or rejection.
 */
/**
 * Custom hook which provides the confirm function
 * @returns {confirm} Returns confirm function which can be used to call confirmation dialog
 */
export const useConfirmAlert = () => {
	const context = useContext(ConfirmAlertContext);
	return context;
};

const defaultOptions = {
	okButtonText: 'Ok',
	cancelButtonText: 'Cancel',
	title: 'Are you sure?',
	description: '',
};

export const ConfirmAlertProvider = (props) => {
	const [open, setOpen] = useState(false);
	const [callback, setCallback] = useState();
	const [options, setOptions] = useState(defaultOptions);

	const confirm = (options, cb) => {
		if (!cb || typeof cb !== 'function') {
			throw new Error(`callback function is required in useConfirmAlert 'confirm' function`);
		}
		if (typeof options === 'string') {
			options = { title: options };
		} else {
			options = {};
		}
		const confirmOptions = { ...defaultOptions, ...options };
		setOptions(confirmOptions);
		setOpen(true);
		setCallback(() => cb);
	};

	const onClose = (result) => {
		setOpen(false);
		callback(result);
		setCallback();
	};

	return (
		<Fragment>
			<ConfirmAlertContext.Provider value={confirm}>
				{props.children}
			</ConfirmAlertContext.Provider>
			<ConfirmationDialog open={open} onClose={onClose} options={options} />
		</Fragment>
	);
};
