interface Props {
  onRestartClick: () => void;
}

const Actions = (props: Props) => {
  const { onRestartClick } = props;

  return (
    <div className="rounded-md shadow-lg px-4 py-6 bg-white w-screen fixed bottom-0">
      <button
        type="button"
        // className="sm:col-span-2"
        onClick={onRestartClick}
      >
        Restart
      </button>
    </div>
  );
};

export default Actions;
