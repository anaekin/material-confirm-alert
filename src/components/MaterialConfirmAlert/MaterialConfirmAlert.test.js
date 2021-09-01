import React from 'react';
import {
	render,
	fireEvent,
	waitForElementToBeRemoved,
	cleanup,
} from '@testing-library/react';
import { ConfirmAlertProvider, useConfirmAlert } from './index';

describe('material-confirm-alert', () => {
	const userConfirmed = jest.fn();
	const userCancelled = jest.fn();

	beforeEach(() => jest.clearAllMocks());
	afterEach(cleanup);

	const callback = (result) => {
		if (result) {
			userConfirmed();
		} else {
			userCancelled();
		}
	};

	const DeleteButton = ({ options }) => {
		const confirm = useConfirmAlert();

		const handleClick = async () => {
			const result = await confirm(options);
			callback(result);
		};

		return (
			<button data-testid="delete-button" onClick={handleClick}>
				Delete
			</button>
		);
	};

	const TestComponent = ({ options, cb }) => (
		<ConfirmAlertProvider>
			<DeleteButton options={options} cb={cb} />
		</ConfirmAlertProvider>
	);
	describe('User choices', () => {
		test('when user confirmed', async () => {
			const { getByTestId, getByText, queryByText } = render(
				<TestComponent options={'Do you want to delete?'} />
			);
			expect(queryByText('Do you want to delete?')).toBeFalsy();

			// Click delete button
			fireEvent.click(getByTestId('delete-button'));
			expect(queryByText('Do you want to delete?')).toBeTruthy();

			// Click 'Ok' button to represent user confirmed
			fireEvent.click(getByText('Ok'));
			await waitForElementToBeRemoved(() =>
				queryByText('Do you want to delete?')
			);
			expect(userConfirmed).toHaveBeenCalled();
			expect(userCancelled).not.toHaveBeenCalled();
		});

		test('when user cancelled', async () => {
			const { getByTestId, getByText, queryByText } = render(
				<TestComponent options={'Do you want to delete?'} />
			);
			expect(queryByText('Do you want to delete?')).toBeFalsy();

			// Click delete button
			fireEvent.click(getByTestId('delete-button'));
			expect(queryByText('Do you want to delete?')).toBeTruthy();

			// Click 'Cancel' button to represent user cancelled
			fireEvent.click(getByText('Cancel'));
			await waitForElementToBeRemoved(() =>
				queryByText('Do you want to delete?')
			);
			expect(userCancelled).toHaveBeenCalled();
			expect(userConfirmed).not.toHaveBeenCalled();
		});
	});

	describe('Different options', () => {
		test('options as string', async () => {
			const { getByTestId, queryByText } = render(
				<TestComponent options="Do you want to delete?" />
			);
			fireEvent.click(getByTestId('delete-button'));
			expect(queryByText('Do you want to delete?')).toBeTruthy();
			expect(queryByText('Ok')).toBeTruthy();
			expect(queryByText('Cancel')).toBeTruthy();
		});

		test('options as object', async () => {
			const { getByTestId, queryByText } = render(
				<TestComponent
					options={{
						title: 'Do you want to delete this item?',
						description:
							'This will delete this item forever and cannot be undone',
						okButtonText: 'Yes',
						cancelButtonText: 'No',
					}}
					cb={callback}
				/>
			);

			// Click delete button
			fireEvent.click(getByTestId('delete-button'));
			expect(queryByText('Do you want to delete this item?')).toBeTruthy();
			expect(
				queryByText('This will delete this item forever and cannot be undone')
			).toBeTruthy();
			expect(queryByText('Yes')).toBeTruthy();
			expect(queryByText('No')).toBeTruthy();
		});

		test('options as null object', async () => {
			const { getByTestId, queryByText } = render(
				<TestComponent options={null} />
			);
			expect(queryByText('Are you sure?')).toBeFalsy();

			// Click delete button
			fireEvent.click(getByTestId('delete-button'));
			expect(queryByText('Are you sure?')).toBeTruthy();
		});

		test('options as empty string', async () => {
			const { getByTestId, queryByText } = render(
				<TestComponent options={''} />
			);
			expect(queryByText('Are you sure?')).toBeFalsy();

			// Click delete button
			fireEvent.click(getByTestId('delete-button'));
			expect(queryByText('Are you sure?')).toBeTruthy();
		});

		test('options as undefined', async () => {
			const { getByTestId, queryByText } = render(<TestComponent />);
			expect(queryByText('Are you sure?')).toBeFalsy();

			// Click delete button
			fireEvent.click(getByTestId('delete-button'));
			expect(queryByText('Are you sure?')).toBeTruthy();
		});

		test('options as neither object nor string', async () => {
			const { getByTestId, queryByText } = render(
				<TestComponent options={() => {}} />
			);
			expect(queryByText('Are you sure?')).toBeFalsy();

			const consoleError = jest
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			// Click delete button
			fireEvent.click(getByTestId('delete-button'));
			expect(consoleError).toHaveBeenCalled();
			expect(consoleError.mock.calls[0][0]).toEqual(
				new Error(
					`options should be either 'string' or 'object' in useConfirmAlert 'confirm' function`
				)
			);
			consoleError.mockRestore();
		});
	});
});
