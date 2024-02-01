const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/passwordLib');
const response = require('./../libs/responseLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib');
const appConfig = require('../../config/appConfig');
const { date } = require('joi');
const eventEmitter = appConfig.eventEmitter;

/* Models */
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')
const Socket = mongoose.model('Socket')

let updateSession= async (socketdt) =>
{
try
{
    if(socketdt.connected)
    {
        let userOldData= await Socket.findOne({user_id: socketdt.user.user_id});

        if(check.isEmpty(userOldData))
        {
            let socketobj= new Socket({
                user_id : socketdt.user.user_id,
                socket_id: socketdt.id,
                room_name: '',
                is_online: 1,
                createdOn: time.now(),
                updatedOn: ''
               });
            
               let socketresult= await socketobj.save().lean();

               console.log('New User Online Data : ',socketresult);
        }
        else
        {
            let socketobjupdate={
                socket_id: socketdt.id,
                room_name: '',
                is_online: 1,
                updatedOn: time.now()
               }
    
            let updateuserprofileressult = await Socket.findOneAndUpdate( {user_id: socketdt.user.user_id}, socketobjupdate, {new: true}).lean();

            console.log('Updated User Online Data : ',updateuserprofileressult);
        }

    }
    if(socketdt.disconnected)
    {
            let socketobjupdate={
                room_name: '',
                is_online: 0,
                updatedOn: time.now()
               }
    
            let updateuserprofileressult = await Socket.findOneAndUpdate( {user_id: socketdt.user.user_id}, socketobjupdate, {new: true}).lean();

            console.log('Updated User Ofline Data : ',updateuserprofileressult);
    }




}
catch(err)
{
    let apiResponse = response.generate(true,`login failed : ${err.message}`,null);
}
}

module.exports = {
    
    updateSession:updateSession,
}