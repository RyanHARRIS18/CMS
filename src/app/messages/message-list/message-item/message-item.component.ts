import { Component, OnInit, Input, Output } from "@angular/core";
import { Message } from "../../message.model";
import { ContactService } from "src/app/contacts/contact.service";
import { Contact } from "src/app/contacts/contact.model";

@Component({
  selector: "cms-message-item",
  templateUrl: "./message-item.component.html",
  styleUrls: ["./message-item.component.css"]
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "";
  canEdit: boolean = false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    let contact: Contact;
    contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact ? contact.name : "Contact Not Loaded";
    console.log(contact);
  }
}
