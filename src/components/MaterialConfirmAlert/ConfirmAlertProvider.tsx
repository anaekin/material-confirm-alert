import React from 'react';
import { useState } from 'react';
import { ConfirmAlertContext } from './ConfirmAlertContext';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Options } from './ConfirmAlertContext';

export type ResolveObject = (value?: boolean | PromiseLike<boolean>) => void;

export type RejectObject = (reason?: any) => void;

export type PromiseObject = (ResolveObject | RejectObject)[] | [];

export type ConfirmAlertProviderProps = {
	children: React.ReactNode;
};

const defaultOptions: Options = {
	okButtonText: 'Ok',
	cancelButtonText: 'Cancel',
	title: 'Are you sure?',
	description: '',
};

const ConfirmAlertProvider = (props: ConfirmAlertProviderProps) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState(defaultOptions);
	const [promiseObject, setPromiseObject] = useState<PromiseObject>([]);

	const confirm = (
		options: Options | string = defaultOptions
	): Promise<boolean> | undefined => {
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

	const onClose = (result: boolean, promiseObject: PromiseObject) => {
		const [resolve] = promiseObject;
		setOpen(false);
		if (result) {
			resolve(true);
		} else {
			resolve(false);
		}
	};

	return (
		<React.Fragment>
			<ConfirmAlertContext.Provider value={{ confirm }}>
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

export { ConfirmAlertProvider };
