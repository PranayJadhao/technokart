import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Heading } from "@chakra-ui/react";
import InitialFocus from "./edit";
import InitialFocusfun from "./Post";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fun();
  }, []);

  function fun() {
    fetch(`http://localhost:8080/api/invoices`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteFun(id) {
    console.log(id);
    fetch(`http://localhost:8080/api/invoices/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fun();
        alert(
          `Your Invoice for the invoice number ${id} id deleted successfully`
        );

        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <Heading as="h1" id="head">
        Invoice Dashboard
      </Heading>
      <div id="nav">
        <InitialFocusfun></InitialFocusfun>
        <Button colorScheme="teal" onClick={fun}>
          Fetch Data
        </Button>
      </div>
      

      <div>
        <Heading>Data List</Heading>
        <table>
          <thead>
            <tr>
              <th className="thead">Invoice Number</th>
              <th className="thead">Invoice Amount</th>
              <th className="thead">Invoice Date</th>
              <th className="thead">DELETE/EDIT</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="tbody">{item.InvoiceNumber}</td>
                <td className="tbody">{item.InvoiceAmount}</td>
                <td className="tbody">{item.InvoiceDate}</td>
                <td className="tbody">
                  <Button
                    colorScheme="red"
                    onClick={() => deleteFun(item.InvoiceNumber)}
                  >
                    DELETE
                  </Button>
                  <InitialFocus
                    InvoiceNumber={item.InvoiceNumber}
                  ></InitialFocus>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
