import { Component, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';


@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent{
  messages: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(){
    this.messages = this.messageService.getMessages();
    this.messageService.messagesChanged.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    )
  }

}
