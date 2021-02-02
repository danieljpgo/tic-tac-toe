import Text from '../../common/components/Text';

interface Props {
  onRestartClick: () => void;
}

const Actions = (props: Props) => {
  const { onRestartClick } = props;

  return (
    <div className="fixed justify-self-end bottom-8 right-8 sm:bottom-auto sm:right-auto sm:relative">
      <button
        type="button"
        className="px-8 py-2 bg-white rounded-lg shadow-lg active:shadow disabled:shadow-md focus:outline-none"
        onClick={onRestartClick}
      >
        <Text contrast>
          RESTART
        </Text>
      </button>
    </div>
  );
};

export default Actions;
