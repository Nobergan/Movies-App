import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  set(key: string, data: any) {
    try {
      return sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      return null;
    }
  }

  get(key: string) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (error) {
      return null;
    }
  }

  remove(key: string) {
    try {
      return sessionStorage.removeItem(key);
    } catch (error) {
      return null;
    }
  }
}
