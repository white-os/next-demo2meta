import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 生成密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// 保存公钥
fs.writeFileSync(path.join(__dirname, '..', 'public', 'public.pem'), publicKey);
// 保存私钥
fs.writeFileSync(path.join(__dirname, '..', 'private.pem'), privateKey);

console.log('密钥对生成成功！');
console.log('公钥保存在: public/public.pem');
console.log('私钥保存在: private.pem'); 