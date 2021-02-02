import Text from '../../common/components/Text';
import { Children } from '../../common/types';

interface Props extends Children {}

const Status = (props: Props) => {
  const { children } = props;

  return (
    <div className="fixed flex justify-center w-full px-4 py-4 bg-white rounded-lg shadow-md sm:relative sm:w-auto sm:py-2">
      <Text>
        {children}
      </Text>
    </div>
  );
};

export default Status;
