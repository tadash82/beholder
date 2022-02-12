require('dotenv').config();
const aes  = require('aes-js');

// console.log(process.env.AES_KEY)
const key = aes.utils.utf8.toBytes(process.env.AES_KEY);
// console.log(key.length)

if(key.length !== 32) throw new Error('Invalid key for AES. Must be 256-bit / 32 bytes.')

function encrypt(text) {
  const bytesInfo = aes.utils.utf8.toBytes(text);
  const aesCTR = new aes.ModeOfOperation.ctr(key);
  const encryptedBytes = aesCTR.encrypt(bytesInfo);
  const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
  // console.log(encryptedHex);
  return encryptedHex;
}

function decrypt(encryptedHex) {
  const encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
  const aesCTR = new aes.ModeOfOperation.ctr(key);
  const decryptedBytes = aesCTR.decrypt(encryptedBytes);
  const text = aes.utils.utf8.fromBytes(decryptedBytes);
  // console.log(text);
  return text;
}

module.exports = {
  encrypt,
  decrypt
}