import { gradients } from '../../constants';
import { Children } from '../../types';

const variants = {
  base: 'text-gray-400 text-base',
  sub: 'text-gray-400 text-xs',
  'gradient-blue': `text-gradient bg-gradient-to-b ${gradients.X} text-4xl font-light`,
  'gradient-pink': `text-gradient bg-gradient-to-b ${gradients.O} text-4xl font-light`,
}as const;

interface Props extends Children {
  variant?: keyof typeof variants
}

const Text = (props: Props) => {
  const {
    children,
    variant = 'base',
  } = props;

  return (
    <p className={`${variants[variant]}`}>
      {children}
    </p>
  );
};

export default Text;
