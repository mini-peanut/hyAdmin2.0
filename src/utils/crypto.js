import crypto from 'crypto';

const clearEncoding = 'utf8';
const cipherEncoding = 'base64';


/**
 * sha1 加密
 * @param input
 * @returns {string}
 */
export function cryptoSha1(input){
  return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}

export function cryptoMd5(input) {
  return crypto.createHash("md5").update(JSON.stringify(input)).digest('hex');
}
/**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @param iv iv值
 * @returns {string}
 */
export function encryption({data, key, iv = ""}) {
    let cipherChunks = [];
    let cipher = crypto.createCipheriv('aes-256-ecb', key, iv);

    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}

/**
 * aes解密
 * @param data 待解密内容
 * @param key 必须为32位私钥
 * @param iv iv值
 * @returns {string}
 */
export function decryption({data, key, iv = ""}) {
    if (!data) {
        return "";
    }
    let cipherChunks = [];
    let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);

    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));

    return cipherChunks.join('');
}
