interface Props {
  label: string;
  player: string;
}

const Status = (props: Props) => {
  const { label, player } = props;

  return (
    <div className="rounded-md shadow-lg px-4 py-6 bg-white w-screen fixed top-0">
      <span>
        {label}
      </span>
      <span>
        {player}
      </span>
    </div>
  );
};

export default Status;
