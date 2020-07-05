import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChoicesService } from 'src/app/services/choices.service'

@Component({
  selector: 'app-my-choice',
  templateUrl: './my-choice.component.html',
  styleUrls: ['./my-choice.component.scss']
})

export class MyChoiceComponent implements OnInit {
 
  timer = 0;
  choicesList = [];
  
  choicesForm = this.fb.group({
    name: ['', Validators.required],
    votes: [0]
  });
  
  constructor(
    private fb: FormBuilder,
    private ch: ChoicesService
  ) { }
  
  ngOnInit() {
  
    setInterval(
      () => { this.timer += 1; }, 1000
    );
  
    this.ch.choices.subscribe(
      data => {
        this.choicesList = data;
      }
    );
  
  }
  
  
  submitForm() {
    this.ch.addChoice(this.choicesForm.value);
    this.choicesForm.get('name').reset();
  }
  
  upvote(choice){
    this.ch.addVote(choice);
  }
 }
 