import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encryptData(data: string, pass: string) {
    return CryptoJS.AES.encrypt(data, pass).toString()
  }

  decryptData(data: string, pass: string) {
    const bytes= CryptoJS.AES.decrypt(data, pass)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}
