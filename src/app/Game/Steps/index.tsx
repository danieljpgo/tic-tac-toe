import Step from './Step';

interface Props {
  history: []; // @TODO add typing
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const Steps = (props: Props) => {
  const { history, currentStep, onSelectStep } = props;

  return (
    <ol>
      {history.map((_, step) => (
        <Step
          disabled={currentStep === step}
          onClick={() => onSelectStep(step)}
        >
          {step === 0 ? 'Go to game start' : `Go to move #${step} `}
          {step === currentStep && '(current)'}
        </Step>
      ))}
    </ol>
  );
};

export default Steps;
