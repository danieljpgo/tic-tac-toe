import type { Children } from '../../types';

const variants = {
  sub: 'text-gray-400 text-xs',
  base: 'text-gray-400 text-base',
  title: 'text-gray-400 text-lg',
} as const;

interface Props extends Children {
  variant?: keyof typeof variants;
}

const Text = ({ children, variant = 'base' }: Props) => (
  <p className={`${variants[variant]}`}>{children}</p>
);

export default Text;
