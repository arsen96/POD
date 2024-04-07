import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  postApi = "http://localhost:8000";
  constructor() { }
}
