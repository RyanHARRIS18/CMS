import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contact.model";
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ContactService {

  maxContactId: number;
  contactChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];


  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getContact(id: string): any {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;

  }

  getContacts() {
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts/')
      .subscribe((responseData) => {
        this.contacts = responseData.contacts;
        console.log(this.contacts);
        this.sortAndSend();
      },
        (error: any) => {
          console.log(error);
        }
      );
  }
  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const strContact = JSON.stringify(contact);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      strContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }
    this.http.delete('http://localhost:3000/contacts/' + contact.id).subscribe(
      (respose: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/contacts/' + originalContact.id, newContact, { headers: headers }).subscribe(
      (response: Response) => {
        this.contacts[pos] = newContact;
      });
  }
}