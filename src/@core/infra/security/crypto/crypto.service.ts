import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {

    private readonly iv: Buffer;

    constructor() {
        this.iv = randomBytes(16);
    }

    async encrypt(text: string): Promise<string> {
        const scryptAsync = promisify(scrypt);
        const key: Buffer = await scryptAsync(process.env.CRYPTO_KEY, 'salt', 32) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, this.iv);
        const encryptedText = Buffer.concat([
            cipher.update(text),
            cipher.final(),
        ]);
        return `${ this.iv.toString('base64') }:${ encryptedText.toString('base64') }`
    }

    async decrypt(encryptedText: string) {
        const parts = encryptedText.split(':');
        const iv = Buffer.from(parts[0], 'base64');
        const encryptedData = Buffer.from(parts[1], 'base64');
        const scryptAsync = promisify(scrypt);
        const key: Buffer = await scryptAsync(process.env.CRYPTO_KEY, 'salt', 32) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, iv);

        return Buffer.concat([
            decipher.update(encryptedData),
            decipher.final(),
        ]).toString();
    }

}
