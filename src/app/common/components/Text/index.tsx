import { Children } from '../../types';

interface Props extends Children {
  contrast?: boolean,
  size?: 'small' | 'base',
}

const fontSize = {
  small: 'text-xs',
  base: 'text-base',
};

const Text = (props: Props) => {
  const {
    children,
    contrast,
    size = 'base',
  } = props;

  const textSize = fontSize[size];

  return (
    <p className={`text-gray-400 ${textSize} ${contrast && 'text-white'}`}>
      {children}
    </p>
  );
};

export default Text;
