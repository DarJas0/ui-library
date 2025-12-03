import type { Preview } from '@storybook/react-vite'
import React from 'react';
import "../lib/styles/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {

      test: 'todo'
    }
  },
  globalTypes: {
    theme: {
      description: 'Global Theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;
      const isDark = theme === 'dark';
      const isPage = context.title.startsWith('Pages/');
      
      return (
        <div className={`${isDark ? 'dark' : ''} w-full ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          <div className={isPage ? "" : "p-12 w-fit"}>
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;