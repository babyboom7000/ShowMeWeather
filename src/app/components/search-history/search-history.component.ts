import { Component, OnInit } from '@angular/core';;

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.sass']
})
export class SearchHistoryComponent implements OnInit {

  displayedColumns: string[] = ['city'];
  dataSource = JSON.parse(<string>localStorage.getItem("citiesHistory"));

  constructor() { }

  ngOnInit(): void {

  }

}
