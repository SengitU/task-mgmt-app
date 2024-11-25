import { type ReactNode } from "react";
import Modal from "react-modal";

type ModalProps = {
  displayElement: ReactNode;
  children: ReactNode;
  title: string;
  isOpen: boolean;
  closeModalHandler: () => void;
};

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalWrapper = ({
  displayElement,
  title,
  children,
  isOpen,
  closeModalHandler,
}: ModalProps) => {
  return (
    <>
      {displayElement}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModalHandler}
        style={customStyles}
      >
        <div className="relative flex flex-col h-full w-full">
          <h2 className="text-center">{title}</h2>
          <button className="absolute top-0 right-0"  onClick={closeModalHandler}>X</button>
          {children}
        </div>
      </Modal>
    </>
  );
};

export default ModalWrapper;
