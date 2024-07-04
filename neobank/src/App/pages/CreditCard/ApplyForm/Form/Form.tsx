import Button from '@components/Button/Button';
import './Form.scss';

const Form: React.FC = () => {
  return (
    <div role="form" aria-label="Contact information">
      <h4 className="form-h4">Contact information</h4>
      <Button> Continue</Button>
    </div>
  );
};

export default Form;
