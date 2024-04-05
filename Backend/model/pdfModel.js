const mongoose = require('mongoose');

const pdfSchema = mongoose.Schema({
  filename : {
    type : String,
    required : true,
  },
  data : {
    type  : Buffer,
    required : true 
  },
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "USER"
  }
})

module.exports = mongoose.model("PDF" , pdfSchema);