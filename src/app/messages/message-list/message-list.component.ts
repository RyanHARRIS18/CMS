import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Message } from "../message.model";
import { Subscription } from 'rxjs';
import { MessagesService } from "../message.service";

@Component({
  selector: "cms-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  subscription: Subscription;


  constructor(private messageService: MessagesService) {
    this.messageService.getMessages();
    console.log(this.messages);
  }

  ngOnInit() {

    this.subscription = this.messageService.messageChangeEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        });
  }
  // onAddMessage(message: Message) {
  //   this.messages.push(message);
  // }
}