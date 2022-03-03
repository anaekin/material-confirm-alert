import { createContext, useContext } from 'react';
// import { ConfirmAlertContextType } from './ConfirmAlertContext.types';

export type Options = {
	title?: string;
	description?: string;
	okButtonText?: string;
	cancelButtonText?: string;
};

export type ConfirmAlertContextType = {
	confirm: (options: Options | string) => Promise<boolean> | undefined;
};

export const ConfirmAlertContext = createContext<ConfirmAlertContextType>(
	{} as ConfirmAlertContextType
);

export const useConfirmAlert = () => {
	const { confirm } = useContext(ConfirmAlertContext);
	return confirm;
};
