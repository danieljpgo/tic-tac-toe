import Text from '../../../common/components/Text';

interface Props {
  children: string;
  onRestartClick: () => void;
}

const Restart = (props: Props) => {
  const { children, onRestartClick } = props;

  return (
    <div className="fixed justify-self-end bottom-8 right-8 sm:bottom-auto sm:right-auto sm:relative">
      <button
        className="px-8 py-2 uppercase bg-white rounded-lg shadow-lg sm:shadow-md active:shadow disabled:shadow-md focus:outline-none"
        type="button"
        onClick={() => onRestartClick()}
      >
        <Text>
          {children}
        </Text>
      </button>
    </div>
  );
};

export default Restart;