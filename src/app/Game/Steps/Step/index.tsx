import { Children } from '../../../common/types';

interface Props extends Children {
  disabled: boolean;
  onClick: () => void;
}

const Step = (props: Props) => {
  const { children = '', disabled, onClick } = props;

  return (
    <li>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};

export default Step;
