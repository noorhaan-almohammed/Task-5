import { Modal, Button } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
};

const ConfirmModal = ({ show, onHide, onConfirm, title }: Props) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" className="custom-dialog ">
      <Modal.Body className="text-center">
        <p className="fs-5 fw-semibold text-uppercase mb-4">{title}</p>
        <div className="d-flex justify-content-center gap-4">
          <Button
            className="px-4 py-2 text-white fw-medium bg-color-orange w-200"
            onClick={onConfirm}
          >
            Yes
          </Button>
          <Button
            className="px-4 py-2 text-white fw-medium bg-color-orange w-200"
            onClick={onHide}
          >
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
