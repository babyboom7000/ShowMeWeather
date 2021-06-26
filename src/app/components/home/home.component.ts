import { Component, OnInit } from '@angular/core';
import {ProgressBarService} from "../../services/progressBarService/progress-bar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  progressBarShow: boolean = true;

  constructor(private progressBarService: ProgressBarService) { }

  ngOnInit(): void {
    this.progressBarService.currentProgressBar.subscribe(value => {
      this.progressBarShow = value;
    })
  }

}
