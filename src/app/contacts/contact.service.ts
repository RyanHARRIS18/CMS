import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
contactChangedEvent = new Subject<Contact[]>(); 
contactSelected = new EventEmitter<Contact>(); 

contacts: Contact [] =[];
private maxContactId = 0;

  constructor() { 
   this.contacts = MOCKCONTACTS;
   this.maxContactId = this.getMaxId(this.maxContactId);
  }

   //get the latest id
   getMaxId(id: number) {
    let maxId = 0;
    for (const contact of this.contacts) {
      id = +contact.id;
      if (id > maxId) {
        id = maxId;
      }
    }
    return maxId;
  }

   //get contact by id
   getContact(id: string): Contact{
    for (const contact of this.contacts)
    if (contact.id === id){
      return contact;
    }
    return null;
  }

  //get all contacts
  getContacts(): Contact[]{
    return this.contacts
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();
  }

   //CREATE
   addContact(newContact: Contact) {
    if (newContact == undefined || newContact == null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
  }

 //UPDATE
 updateContact(orginalContact: Contact, newContact: Contact) {
  if (orginalContact === null || newContact === null) {
    return;
  }  
  const pos = this.contacts.indexOf(orginalContact);
  if (pos < 0) {
    return;
  }
  newContact.id = orginalContact.id;
  this.contacts[pos] = newContact;
  this.contactChangedEvent.next(this.contacts.slice());
}

 //DELETE
  deleteContact(contact: Contact) {
    if (!contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }
}


