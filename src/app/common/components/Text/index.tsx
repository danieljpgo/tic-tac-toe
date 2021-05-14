import type { Children } from '../../types';

const variants = {
  sub: 'text-gray-400 text-xs',
  base: 'text-gray-400 text-base',
  title: 'text-gray-400 text-lg',
} as const;

type Props = Children & {
  variant?: keyof typeof variants;
}

const Text = (props: Props) => {
  const { children, variant = 'base' } = props;

  return (
    <p className={`${variants[variant]}`}>{children}</p>
  );
};

export default Text;
