import { players } from '../../../common/types/game';
import Text from '../../../common/components/Text';

interface Props {
  children: string
}

const Status = (props: Props) => {
  const { children } = props;
  const { o, x } = players;
  const [title, label] = children
    .split(':')
    .map((value) => value.trim());

  return (
    <div className="fixed flex items-end justify-end w-full gap-4 px-8 pt-8 pb-4 transform scale-105 -translate-y-8 bg-white shadow-md sm:justify-center sm:items-center sm:scale-100 sm:-translate-y-0 sm:rounded-lg rotate-6 sm:rotate-0 sm:relative sm:w-auto sm:py-2">
      <div className="transform -rotate-6 sm:rotate-0">
        <Text>
          {(label === x || label === o)
            ? (`${title}:`)
            : (`${children}`)}
        </Text>
      </div>
      {(label === x || label === o) && (
        <div className="w-8 text-center transform -rotate-6 sm:rotate-0">
          <Text variant={label === x ? 'gradient-blue' : 'gradient-pink'}>
            {label}
          </Text>
        </div>
      )}
    </div>
  );
};

export default Status;
