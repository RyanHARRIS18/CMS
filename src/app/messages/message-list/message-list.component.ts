import { Component, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';


@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent{
  messages: Message[] = [
    new Message(
      "1",
      "barzeer@byui.edu",
      "The grades for this assignment have been posted",
      "Bro Jackson"
      ),
    new Message(
      "2",
       "jacksonk@byui.edu",
       "When is assignment 3 due",
       "Steve Johnson"
    ),
    new Message(
      "2",
       "jacksonk@byui.edu",
       "Assignment 3 is due on Saturday at 11:30pm",
       "Bro Jackson"
    ),
    new Message(
      "2",
       "jacksonk@byui.edu",
       "Can I meet with you sometime I need help with assignment 3",
       "Mark Smith"
    ),
    new Message(
      "1",
      "barzeer@byui.edu",
      "I can meet with you today at 4:00pm in my office",
      "Bro Jackson"
      ),
  ];
  constructor() { }


  onMessageAdded(message: Message) {
    this.messages.push(message);
  }

}
