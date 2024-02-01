const crypto = require("crypto");

const hash =  (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(128).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

const verify =  (password, hash) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}


let c = async ()=>{
    try{
        let result =await hash('pass');
        console.log(result);
    }catch(err){
        console.log(err)
    }finally{

    }
}

c()


module.exports = {
    hash : hash,
    verify : verify
}