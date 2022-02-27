import { DialogProps } from '@mui/material';
import React from 'react';

export interface Options {
	title?: string;
	description?: string;
	okButtonText?: string;
	cancelButtonText?: string;
}

export interface ConfirmationDialogProps {
	open: boolean;
	options: Options;
	onClose: (result: boolean) => void;
}

export function ConfirmFunction(options?: Options | string): Promise<boolean>;

export interface ConfirmAlertProviderProps {
	children: React.ReactNode;
}

export function ConfirmAlertProvider(
	props: ConfirmAlertProviderProps
): React.ReactElement;

export function useConfirmAlert(): typeof ConfirmFunction;

export function ConfirmationDialog(
	props: ConfirmationDialogProps & DialogProps
): React.ReactElement;
