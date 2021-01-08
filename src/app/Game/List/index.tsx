import { History } from '../types';
import Step from './Step';

interface Props {
  history: History;
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const List = (props: Props) => {
  const { history, currentStep, onSelectStep } = props;

  return (
    <ol>
      {history.map((_, step) => (
        <Step
          key={step.toString()}
          disabled={currentStep === step}
          onSelectStep={() => onSelectStep(step)}
        >
          {step === 0 ? 'Go to game start' : `Go to move #${step} `}
          {step === currentStep && '(current)'}
        </Step>
      ))}
    </ol>
  );
};

export default List;
