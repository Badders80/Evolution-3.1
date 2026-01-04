import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from '../ui/Button';

const meta: Meta<typeof Button> = {
  title: 'Evolution Stables/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    children: 'Click Me',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Button (default)
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Get Started',
  },
};

// Outline Button
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Login',
  },
};

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Learn More',
  },
};

// Ghost Button
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cancel',
  },
};

// Size Variants
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

// Evolution Stables branded buttons
export const EvolutionPrimary: Story = {
  args: {
    variant: 'primary',
    className: 'bg-brand-gold text-brand-black hover:bg-yellow-400',
    children: 'Join the Revolution',
  },
};

export const EvolutionOutline: Story = {
  args: {
    variant: 'outline',
    className: 'border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black',
    children: 'Explore Opportunities',
  },
};
