  
import React from 'react';

declare interface Options {
  title?: String;
  description?: String;
  okButtonText?: String;
  cancelButtonText?: String;
}

export const ConfirmAlertContext: React.Context<any>;

export const ConfirmAlertProvider: React.ComponentType<>;

export const useConfirmAlert: () => (options?: Options | String) => Promise<boolean>;