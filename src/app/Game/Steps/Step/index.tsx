import { Children } from '../../../common/types';

interface Props extends Children {
  disabled: boolean;
  onSelectStep: () => void;
}

const Step = (props: Props) => {
  const { children, disabled, onSelectStep } = props;

  return (
    <li>
      <button
        type="button"
        disabled={disabled}
        onClick={onSelectStep}
      >
        {children}
      </button>
    </li>
  );
};

export default Step;
