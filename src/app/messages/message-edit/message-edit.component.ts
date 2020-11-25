import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subInput') subInputRef: ElementRef; 
  @ViewChild('messageInput') messageInputRef: ElementRef; 

  currentSender = "2";
  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const subInput = this.subInputRef.nativeElement.value;
    const messageInput = this.messageInputRef.nativeElement.value;
    const newMesssage = new Message("1", subInput, messageInput, this.currentSender);
    this.messageService.addMessage(newMesssage);
  }

}
