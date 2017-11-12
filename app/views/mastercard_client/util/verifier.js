const crypto = require('crypto');

export function verifier(data, publicKey, signature) {
  const verify = crypto.createVerify('SHA256');
  verify.write(JSON.stringify(data));
  return verify.verify(stringToBuffer(publicKey), signature, 'hex')
}

export function signer(data, privateKey) {
  const sign = crypto.createSign('SHA256');
  sign.update(JSON.stringify(data));
  const signature = sign.sign(stringToBuffer(privateKey), 'hex');
  return signature;
};

function stringToBuffer(str) {
  return Buffer.from(str, 'utf8');
}
