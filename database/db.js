const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const connectDatabase = () =>{
   return mongoose.connect('mongodb+srv://instagram:instagramapp@cluster0.lm5bt3w.mongodb.net/?retryWrites=true&w=majority')
}

module.exports = connectDatabase