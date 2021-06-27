import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProgressBarService} from "../../services/progressBarService/progress-bar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  progressBarShow: boolean = true;

  constructor(private progressBarService: ProgressBarService,
              private changeDetector : ChangeDetectorRef) { }

  ngOnInit(): void {
    // Update progressBar status.
    this.progressBarService.currentProgressBar.subscribe(value => {
      this.progressBarShow = value;
    })
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }

}
