import type { History } from '../../../../common/types/game';
import { calculateNextPlayer } from '../../utils';
import Step from './Step';

interface Props {
  history: History;
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const List = (props: Props) => {
  const { history, currentStep, onSelectStep } = props;
  const currentPlayer = calculateNextPlayer(history[currentStep]) === 'O' ? 'X' : 'O';

  return (
    <ol className="grid w-full max-w-xs gap-2 pb-2 justify-self-center sm:pr-2 sm:max-w-none sm:pb-0 sm:overflow-y-auto sm:border-t sm:border-b sm:border-gray-300 sm:max-h-48 auto-rows-min">
      {history.map((_, step) => (
        <Step
          key={step.toString()}
          step={step === currentStep}
          player={currentPlayer}
          disabled={step === currentStep}
          onSelectStep={() => onSelectStep(step)}
        >
          {step === 0 ? 'Go to game start' : `Go to move #${step} `}
          {step === currentStep && '*'}
        </Step>
      ))}
    </ol>
  );
};

export default List;
