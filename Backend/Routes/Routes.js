const express = require('express');
const { InvoiceModel } = require('../models/model'); 

const UserRouter = express.Router();

UserRouter.post('/invoices', async (req, res) => {
  try {
    const payload = req.body;
    const invoice = new InvoiceModel(payload);
    await invoice.save();
    res.send({ message: "New invoice created" });
  } catch (err) {
    res.send({ message: "Error creating invoice" ,"err":err.message});
  }
});

UserRouter.put('/invoices/:invoiceNumber', async (req, res) => {
  const { invoiceNumber } = req.params;
  const updatedInvoiceData = req.body;

  try {
    const updatedInvoice = await InvoiceModel.findOneAndUpdate(
      { InvoiceNumber: invoiceNumber },
      updatedInvoiceData,
      { new: true }
    );

    if (updatedInvoice) {
      console.log(updatedInvoice)
      res.send(updatedInvoice);
    } else {
      res.send({ message: "Invoice not found" });
    }
  } catch (err) {
    res.send({ message: "Error updating invoice" });
  }
});

UserRouter.delete('/invoices/:invoiceNumber', async (req, res) => {
  const { invoiceNumber } = req.params;

  try {
    const deletedInvoice = await InvoiceModel.findOneAndDelete({ InvoiceNumber: invoiceNumber });

    if (deletedInvoice) {
      res.send({ message: "Invoice deleted" });
    } else {
      res.send({ message: "Invoice not found" });
    }
  } catch (err) {
    res.send({ message: "Error deleting invoice" });
  }
});

UserRouter.get('/invoices', async (req, res) => {
  try {
    const invoices = await InvoiceModel.find();
    res.send(invoices);
  } catch (err) {
    res.send({ message: "Error fetching invoices" });
  }
});



module.exports = UserRouter;
