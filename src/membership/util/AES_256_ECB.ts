import * as base64 from 'base64-js';
import * as crypto from 'crypto';

export class AES_256_ECB {
  private secretKey: Buffer;

  constructor(reqSecretKey: string) {
    // String reqSecretKey = "Hcnottrestfulapiservice20221111s";
    // 바이트 배열로부터 SecretKey를 구축
    this.secretKey = Buffer.from(reqSecretKey, 'utf-8');
  }

  // AES ECB PKCS5Padding 암호화(Hex | Base64)
  AesECBEncode(plainText: string): string {
    // Cipher 객체 인스턴스화(Java에서는 PKCS#5 = PKCS#7이랑 동일)
    const c = crypto.createCipheriv('aes-256-ecb', this.secretKey, Buffer.alloc(0));

    // Encrpytion/Decryption
    const encrpytionByte = Buffer.concat([c.update(plainText, 'utf-8'), c.final()]);

    // Base64 Encode
    return base64.fromByteArray(encrpytionByte);
  }

  // AES ECB PKCS5Padding 복호화(Hex | Base64)
  AesECBDecode(encodeText: string): string {
    // Cipher 객체 인스턴스화(Java에서는 PKCS#5 = PKCS#7이랑 동일)
    const c = crypto.createDecipheriv('aes-256-ecb', this.secretKey, Buffer.alloc(0));

    // Decode Base64
    const decodeByte = Buffer.concat([c.update(base64.toByteArray(encodeText)), c.final()]);

    return decodeByte.toString('utf-8');
  }

  enc_aes_object(obj: any): string {
    const jsonString = JSON.stringify(obj);
    if (!jsonString || jsonString.length === 0) {
      throw new Error('Fail to ENCRYPT.');
    }
    return this.AesECBEncode(jsonString);
  }

  dec_aes_object(data: string): string {
    if (!data || data.length === 0) {
      throw new Error('Fail to ENCRYPT.');
    }
    return this.AesECBDecode(data);
  }

  dec_aes(data: string): string {
    return this.AesECBDecode(data);
  }

  dec_aes_map(data: string): Record<string, string> | null {
    const decStr = this.dec_aes_object(data);
    if (!decStr || decStr.length === 0) {
      return null;
    }

    return JSON.parse(decStr);
  }
}