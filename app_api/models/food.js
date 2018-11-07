var mongoose = require('mongoose');  
var foodSchema = new mongoose.Schema({  
  name: {
        type: String,
        required: true
    },
  date: { type: Date, required: true, default: Date.now },
  expiry: { type: Date, default: Date.now },
  left_overs: { type: Boolean, default: false },
  quantity: {
        type: Number,
        default: 1,
        min: 1
    },
});
mongoose.model('Food', foodSchema);