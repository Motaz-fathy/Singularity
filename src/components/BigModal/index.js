import {Fragment, useState} from "react"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

const BidModal = ({
  children,
  withConfirmButton,
  modal,
  setModal,
  toggleModal,
  modalHeader,
  centered = false
}) => {
  return (
    <div className="demo-inline-spacing">
      <Modal
        isOpen={modal}
        toggle={() => toggleModal()}
        className={`modal-dialog-centered modal-xl`}
        centered={centered}
      >
        <ModalHeader toggle={() => toggleModal()}>{modalHeader}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {withConfirmButton ? (
            <Button onClick={setModal} color="primary">
              Confirm Location{" "}
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default BidModal
