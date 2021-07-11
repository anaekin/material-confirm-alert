# material-confirm-alert

[![GitHub license](https://img.shields.io/github/license/anaekin/material-confirm-alert)](https://github.com/anaekin/material-confirm-alert/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/material-confirm-alert)](https://www.npmjs.com/package/material-confirm-alert)

A simple material-ui confirmation alert based on React Context API.

## Installation

> This library requires [React](https://reactjs.org/) and [@material-ui/core](https://www.npmjs.com/package/@material-ui/core)

Install and save the package as dependencies of the project.

```sh
npm i --save material-confirm-alert
```

## Usage

First, import the `ConfirmAlertProvider` from the package and use it to wrap your component wherever you want to use the confirmation alert.
If you want to use it across the whole app, wrap your `App` component inside it.
Note: If you are using material-ui `ThemeProvider`, wrap the `ConfirmAlertProvider` inside it.

```jsx
import { ConfirmAlertProvider } from 'material-confirm-alert';
...

export const App = () => {
    return (
        <ConfirmAlertProvider>
            ...
        </ConfirmAlertProvider>
    )
}
```

Next, inside your component where you want to use the confirmation alert, import the `useConfirmAlert` hook from the package. This hook returns a `confirm` function which will be used for confirmation alert.

```jsx
import { useConfirmAlert } from 'material-confirm-alert';
...

const MyComponent = () => {
    const confirm = useConfirmAlert();
    const handleClick = () => {
        confirm('Do you want to delete?', (result) => {
            if(result) {
                // Handle operation when user confirm
                ...
            } else {
                // Handle operation when user cancel
                ...
            }
        });
    }

    return (
        <Button onClick={handleClick}>Delete</Button>
    );
}
```

## Demo

#### [material-confirm-alert-demo](https://codesandbox.io/s/material-confirm-alert-demo-30801?file=/src/App.js)

## API

### `<ConfirmAlertProvider />`

This is a Provider generated using the React Context API. The component which is using the confirmation alert requires to be wrapped inside this Provider.

##### Example -

```jsx
// Import
import { ConfirmAlertProvider } from 'material-confirm-alert';
...

// App Component
export const App = () => {
    ...
    // return
    return (
        <ConfirmAlertProvider>
            // children
            ...
        </ConfirmAlertProvider>
    )
}
```

#### `useConfirmAlert()`

returns `confirm` function

##### Example -

```jsx
// imports
import { useConfirmAlert } from 'material-confirm-alert'
...

// Inside components
const MyComponent = () => {
    const confirm = userConfirmAlert();
    ...
}
```

### `confirm(options, callback)`

This function is used to call the confirmation dialog. It takes two parameters - `options` and a `callback` function

| Parameters | Type                 | Required | Description                                                                                                                                                           |
| ---------- | -------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`  | `object` or `string` | Yes      | Sets the options for the confirmation dialog. Check `options` API for more details. If only `string` is passed, then it will be the title of the confirmation dialog. |
| `callback` | `function`           | Yes      | Sets the callback, which will be called on user actions. It takes a parameter `result` which will be `true` or `false` based on user selection.                       |

##### Example -

```jsx
// Inside Components
const MyComponent = () => {
    const confirm = useConfirmAlert();
    const handleClick = () => {
        confirm('Do you want to delete?', (result) => {
            if(result) {
                // Handle operation when user confirm
            } else {
                // Handle operation when user cancel
            }
        })
    }
    // return
    ...
}
```

### `options`

This object can be used to set the optional parameters for the confirmation dialog.

| Parameters         | Type     | Default         | Description                                      |
| ------------------ | -------- | --------------- | ------------------------------------------------ |
| `title`            | `string` | 'Are you sure?' | Sets the title for the confirmation dialog       |
| `description`      | `string` | (empty)         | Sets the description for the confirmation dialog |
| `okButtonText`     | `string` | 'Ok'            | Sets the 'Ok' button text                        |
| `cancelButtonText` | `string` | 'Cancel'        | Sets the 'Cancel' button text                    |

##### Example -

```jsx
// Inside Components
const MyComponent = () => {
    const confirm = useConfirmAlert();
    const handleClick = () => {
        confirm({
            'title': 'Do you want to delete this item?',
            'description': 'This cannot be undone once deleted!',
            'okButtonText': 'Yes',
            'cancelButtonText': 'No'
        }, (result) => {
            if(result) {
                // Handle operation when user confirm
            } else {
                // Handle operation when user cancel
            }
        })
    }
    // return
    ...
}
```
