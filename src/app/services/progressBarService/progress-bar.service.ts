import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private progressBarSource = new BehaviorSubject(<boolean>false);
  currentProgressBar = this.progressBarSource.asObservable();

  constructor() { }

  changeProgressBar(show: boolean) {
    this.progressBarSource.next(show);
  }
}
