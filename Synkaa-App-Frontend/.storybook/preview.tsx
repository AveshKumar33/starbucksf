// Import necessary dependencies
import React from 'react';
import { InputProvider } from '../src/app/helpers/useInputHook';

export const decorators = [
  (Story) => (
    <InputProvider>
      <Story />
    </InputProvider>
  ),
];

// Rest of your preview.js file remains unchanged
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
