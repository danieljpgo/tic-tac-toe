import { gradients } from '../../../../common/constants';
import { Position as PositionType } from '../../../types';

interface Props {
  children: PositionType;
  onSelectPosition: () => void;
}

const Position = (props: Props) => {
  const { children, onSelectPosition } = props;

  return (
    <button
      className="text-4xl bg-white rounded-lg shadow-md active:shadow disabled:shadow-md focus:outline-none"
      type="button"
      disabled={Boolean(children)}
      onClick={() => onSelectPosition()}
    >
      {children && (
        <span className={`text-gradient font-light bg-gradient-to-b ${gradients[children]}`}>
          {children}
        </span>
      )}
    </button>
  );
};

export default Position;
