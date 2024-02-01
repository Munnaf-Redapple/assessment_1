'use strict'
const { string } = require('joi');

/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  let userSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    user_age: {
        type: String,
        default: ''
    },
    user_gender: {
        type: String,
        default: ''
    },
    remarks: {
        type: String,
        default: ''
    },
    profile_photo: {
        type: String,
        default: ''
    },
    user_status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'active'
    },
    created_on: {
        type: Date,
        default: ""
    }
})


mongoose.model('User', userSchema);