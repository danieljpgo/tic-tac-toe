import { History } from '../types';
import { calculateNextValue } from '../utils';
import Step from './Step';

interface Props {
  history: History;
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const List = (props: Props) => {
  const { history, currentStep, onSelectStep } = props;

  const currentPlayer = calculateNextValue(history[currentStep]) === 'O' ? 'X' : 'O';

  return (
    <ol className="grid gap-2 pl-1 pr-2 ml-2 overflow-y-auto border-t border-b border-gray-200 sm:max-h-48 auto-rows-min">
      {history.map((_, step) => (
        <Step
          key={step.toString()}
          disabled={currentStep === step}
          onSelectStep={() => onSelectStep(step)}
          currentPlayer={currentPlayer}
          currentStep={step === currentStep}
        >
          {step === 0 ? 'Go to game start' : `Go to move #${step} `}
          {step === currentStep && '(current)'}
        </Step>
      ))}
    </ol>
  );
};

export default List;
