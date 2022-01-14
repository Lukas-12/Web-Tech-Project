import { Component, OnInit } from '@angular/core';
import {ServerServiceService} from "../server-service.service";
import {Item} from "../model/item";
import {Review} from "../model/review";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  constructor(
    private serverService: ServerServiceService
  ) { }

  reviewList: Review[] | undefined;

  ngOnInit(): void {
    this.getReviews()
  }

  getReviews():void{
    this.serverService.getReviews().subscribe(reviewList => this.reviewList = reviewList);
  }

}
