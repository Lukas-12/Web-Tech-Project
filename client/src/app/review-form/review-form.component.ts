import { Component, OnInit } from '@angular/core';
import {Review} from "../model/review";
import {ServerServiceService} from "../server-service.service";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  model: Review = {
    username: "",
    date: new Date().getDate().toString(),
    description: ""
  };

  submitted = false;

  constructor(
    private serverService: ServerServiceService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }

  newReview(){
    this.model.date = new Date().getDate().toString();
    this.model.description = "";
    this.model.username = "";
    //this.serverService.postReview(this.model).subscribe(model => this.model = model);
  }

}
