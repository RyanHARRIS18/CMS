import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  maxMessageId: number;
  messageChangeEvent = new Subject<Message[]>();
  private messages: Message[] = [];

  constructor(private http: HttpClient) { }

  getMessage(id: string): any {
   return this.http.get<{ message: string, messages: Message}>('http://localhost3000/messages/' + id);
  }


   
  getMessages() {
    this.http
    .get<{ message: string, messages: Message[] }>(
      'http://localhost:3000/messages/')
      .subscribe((responseData) => {
        this.messages = responseData.messages;
        console.log(this.messages);
        this.messageChangeEvent.next(this.messages.slice());
      },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    const strMessage = JSON.stringify(message);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    this.http.post<{ message: string, messages: Message }>('http://localhost:3000/messages',
      strMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.messages);
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
