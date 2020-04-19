import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  findFaloneResult: any;
  timeTaken: number;
  IsSuccess: boolean;
  failureMessage: string;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.findFaloneResult = this.dataService.findFalconeResult;
    if (this.findFaloneResult.status === 'success') {
      this.IsSuccess = true;
    } else if (this.findFaloneResult.status === 'false') {
      this.IsSuccess = false;
      this.failureMessage = 'Failed. Could not find the Falcone.';
    } else {
      this.IsSuccess = false;
      this.failureMessage = this.findFaloneResult.error;
    }
    this.timeTaken = this.dataService.timeTaken;
  }

  redirect(): void {
    this.router.navigate(['/findFalcone']);
  }

}
