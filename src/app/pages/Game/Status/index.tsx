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
    <div className="fixed flex items-center justify-center w-full gap-2 px-4 py-2 bg-white rounded-b-full shadow-md h-14 sm:rounded-lg sm:relative sm:w-auto">
      <Text variant="title">
        {(label === x || label === o)
          ? (`${title}:`)
          : (`${children}`)}
      </Text>
      {(label === x || label === o) && (
        <div className="w-8 text-center">
          <Text variant={label === x ? 'gradient-blue' : 'gradient-pink'}>
            {label}
          </Text>
        </div>
      )}
    </div>
  );
};

export default Status;
