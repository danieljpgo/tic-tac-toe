import type { Children } from '../../../common/types';

interface Props extends Children {}

const Container = (props: Props) => {
  const { children } = props;

  return (
    <div className="grid gap-4 px-4 overflow-y-auto sm:overflow-y-visible sm:px-0 sm:grid-cols-2 sm:auto-cols-min">
      {children}
    </div>
  );
};

export default Container;
