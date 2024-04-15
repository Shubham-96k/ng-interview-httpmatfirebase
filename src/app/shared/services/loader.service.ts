import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  loadingspiner$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
}
