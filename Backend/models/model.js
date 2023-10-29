const mongoose=require('mongoose')

const invoiceSchema =  mongoose.Schema({
    InvoiceDate: Date,
    InvoiceNumber: Number,
    InvoiceAmount: Number,
  });

const InvoiceModel=mongoose.model("Invoice",invoiceSchema)

module.exports={
    InvoiceModel
}