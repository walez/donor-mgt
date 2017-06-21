import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class StorageService {

  constructor() { }

  /**
   * Get item from localstorage
   */
  getStorageItem(key) {
    const item = JSON.parse(localStorage.getItem(key));
    return item;
  }

  /**
   * store item in localstorage
   */
  setStorageItem(key, data) {
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
    return;
  }
}
