import { Subject } from 'rxjs';
import { Message } from '../../app/messages/message.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../contacts/contact.model';

@Injectable(
  {
    providedIn: "root"
  }
)
export class MessageService{ 
    messageListChangedEvent = new Subject<Message[]>();
    startedEditing = new Subject<number>();
    messageSelected = new EventEmitter<Message>();
    public maxMessageId = 0;
    public messages: Message[] = [];
    public contacts: Contact[] = [];

    constructor(private http: HttpClient) { 
      // console.log(this.maxDocumentId);
    }

    
    storeMessages(messages : Message[]){
      this.http.put('https://cit-wdd430.firebaseio.com/messages.json', messages)
      .subscribe(response => {
          console.log(response);
      });

  }

     //get the latest id
  //get the latest id
        getMaxId(id: number) {
          let maxId = 0;
          for (const message of this.messages) {
            const currentId = parseInt(message.id, 10);
            if (currentId > maxId) {
              maxId = currentId;
            }
          }
          return maxId;
        }


    
    //CREATE
    addMessage(newmessage: Message) {
      if (!newmessage) {
        return;
      }
      this.maxMessageId++;
      newmessage.id = this.maxMessageId.toString();
      this.messages.push(newmessage);
      this.storeMessages(this.messages);
      this.messageListChangedEvent.next(this.messages.slice());
    }
    
    //READ
        //get document by id {Works }
        getMessage(id: string) {
          for (const message of this.messages) {
            if (message.id == id) {
              return message;
            }
          }
          return null;
        }
    
        //Get all documents {Works}
        getMessages(){
        this.http.get<Message[]>('https://cit-wdd430.firebaseio.com/messages.json')
         .subscribe((responseData) => {
          this.messages = responseData;
          this.messageListChangedEvent.next(this.messages);
          this.maxMessageId = +this.getMaxId(this.maxMessageId);
        },
          (error: any) => {
            console.log(error);
          }
        );
    }




    //UPDATE
     //UPDATE
     updateMessage(originalMessage: Message, newMessage: Message) {
      if (originalMessage === null || originalMessage === undefined || newMessage === null || newMessage === undefined) {
        return;
      }  
      const pos = this.messages.indexOf(originalMessage);
      if (pos < 0) {
        return;
      }
      newMessage.id = originalMessage.id;
      this.messages[pos] = newMessage;
      this.storeMessages(this.messages);
      this.messageListChangedEvent.next(this.messages.slice());
  }

  
    //DELETE
    deleteDocument(message: Message) {
      if (!message === null) {
        return;
      }
      const pos = this.messages.indexOf(message);
      if (pos < 0) {
        return;
      }
      this.messages.splice(pos, 1);
      this.storeMessages(this.messages);
      this.messageListChangedEvent.next(this.messages.slice());
    }

}

    