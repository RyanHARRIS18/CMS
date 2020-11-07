import { Injectable, EventEmitter } from "@angular/core";
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  startedEditing = new Subject<number>();
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];
  public maxContactId = 0;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = +this.getMaxId(this.maxContactId);
    console.log(this.maxContactId);
  }

  
//get the latest id
  getMaxId(id: number) {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

//CREATE 
  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
  }

//READ
  //get document by id    
  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  }

  //get all contacts
  getContacts() {
    return this.contacts.slice();
  }
  
//UPDATE
  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == undefined || originalContact == null || newContact == undefined || newContact == null) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
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