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

function InitialFocusfun(InvoiceNumber) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const initialState = {
    InvoiceDate: "",
    InvoiceNumber: "",
    InvoiceAmount: "",
  };
  const [invoiceData, setInvoiceData] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postFun(invoiceData);
  };

  function postFun(updatedData) {
    console.log(InvoiceNumber);
    fetch(`http://localhost:8080/api/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then(() => {
        console.log(updatedData);
        setInvoiceData(initialState);
        console.log("posted");
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add Invoice
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Invoice Number</FormLabel>
              <Input
                type="text"
                name="InvoiceNumber"
                value={invoiceData.InvoiceNumber}
                onChange={handleInputChange}
              />

              <FormLabel>Invoice Amount</FormLabel>
              <Input
                type="number"
                name="InvoiceAmount"
                value={invoiceData.InvoiceAmount}
                onChange={handleInputChange}
              />

              <FormLabel>Invoice Date</FormLabel>
              <Input
                type="date"
                name="InvoiceDate"
                value={invoiceData.InvoiceDate}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InitialFocusfun;
