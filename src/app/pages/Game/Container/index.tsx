import type { Children } from '../../../common/types';

interface Props extends Children {}

const Container = (props: Props) => {
  const { children } = props;

  return (
    <div className="grid gap-6 px-8 overflow-y-auto sm:gap-4 sm:overflow-y-visible sm:px-0 sm:grid-cols-2 sm:auto-cols-min">
      {children}
    </div>
  );
};

export default Container;
