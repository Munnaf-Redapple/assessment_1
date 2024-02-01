const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const Socket = new Schema({
 user_id: {
  type: Schema.Types.ObjectId
},
  socket_id: {
    type: String,
    unique: true
  },
  room_name:{
    type:String
  },
  is_online:{
    type:Number
  },
  createdOn: {
    type: Date
  },
  updatedOn:{
    type:Date
  }
})

module.exports = mongoose.model('Socket', Socket)