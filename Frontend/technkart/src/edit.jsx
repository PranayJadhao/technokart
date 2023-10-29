import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

function InitialFocus(InvoiceNumber) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const initialState = { InvoiceAmount: "" };
  const [invoiceData, setInvoiceData] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(invoiceData);
    editFun(invoiceData);
  };

  function editFun(data) {
    fetch(`http://localhost:8080/api/invoices/${InvoiceNumber}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        console.log(invoiceData);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        EDIT
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Invoice Amount</FormLabel>
              <Input
                type="number"
                name="InvoiceAmount"
                value={invoiceData.InvoiceAmount}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Edit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InitialFocus;
