import Modal from "./Modal";
import Button from "../FormElements/Button";

interface ErrorModalProps {
  error: string;
  onClear: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClear }) => {
  return (
    <Modal
      onClose={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
