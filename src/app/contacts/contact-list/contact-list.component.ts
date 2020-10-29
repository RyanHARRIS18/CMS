import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }
              private clSubscription : Subscription;

  ngOnInit(){
    this.contacts = this.contactService.getContacts();
    this.clSubscription = this.contactService.contactChangedEvent.subscribe(
      (contact: Contact[]) => (this.contacts = contact)
    );
  }

  ngOnDestroy(){
    this.clSubscription.unsubscribe();
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}









