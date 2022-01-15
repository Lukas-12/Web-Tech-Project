import { Component, OnInit } from '@angular/core';
import {Review} from "../model/review";
import {ServerServiceService} from "../server-service.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  model : Review ={
    username: "",
    description: "",
    date: ""
  }

  submitted = false;

  constructor(
    private serverService: ServerServiceService,

  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.submitted = true;

  }

  updateReview(){
    this.serverService.postReview(this.model).subscribe(model => this.model = model);

  }


}
