import { Component, OnInit, Input } from "@angular/core";
import { Contact } from "../contact.model";
import { ContactsComponent } from "../contacts.component";
import { ContactService } from "../contact.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "cms-contacts-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.css"]
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.contact = this.contactService.getContact(this.id);
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl("/contacts");
  }
}