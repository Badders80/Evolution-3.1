import type { Preview } from '@storybook/nextjs-vite'
import React, { useEffect } from 'react'

// Import your app styles so Tailwind utilities/classes work in stories
import '../src/styles/brand.css'
import '../src/styles/globals.css'

const withDarkMode = (Story: React.FC) => {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    return () => document.documentElement.classList.remove('dark')
  }, [])
  return <Story />
}

const preview: Preview = {
  decorators: [withDarkMode],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Keep a11y checks visible in UI but do not fail CI by default
    a11y: { test: 'todo' },
    // Optional: make canvas background match site background
    backgrounds: {
      default: 'black',
      values: [
        { name: 'black', value: '#000000' },
        { name: 'surface', value: '#111113' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
}

export default preview;