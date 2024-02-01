const { eventEmitter } = require('../../config/appConfig');

let setNSP = (gameIo) => {
    const auth = require('../middlewares/auth')
    const socketSessionController = require('../controllers/socketSessionController')
    console.log(`socket server listening on NameSpace : ${gameIo.name}`);
    gameIo.use(auth.isAuthorizedSocket).on('connection',async (socket) => {

        /**
         * Connection Handler.
        **/
        console.log(`one socket connected:${socket.id} with user_id:${socket.user.user_id}`);
        eventEmitter.emit('update-session',socket);
        //socket.emit('connection-ack',{socket_id:socket.id})
        
        /**
         * Socket Events For Application Logic.
        **/

        /**
         * Disconnection Handler.
        **/
        socket.on('disconnect',async () => {
            eventEmitter.emit('update-session',socket);
            console.log(`one socket disconnected:${socket.id} with user_id:${socket.user.user_id}`);
        });
    });
    eventEmitter.on('update-session',async (socket)=>{
        console.log('All Socket Data',socket)
        let updateSession = await socketSessionController.updateSession(socket);//create or update socket session in Database
        socket.emit('connection-ack',updateSession);//Send acknowledgement to requestor
    })
}

module.exports = {
    setNSP:setNSP
}