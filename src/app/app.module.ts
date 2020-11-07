import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../app/app.component';
import { HeaderComponent } from '../app/header/header.component';
import { ContactsComponent } from '../app/contacts/contacts.component';
import { ContactDetailComponent } from '../app/contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from '../app/contacts/contact-list/contact-list.component';
import { ContactItemComponent } from '../app/contacts/contact-list/contact-item/contact-item.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component'
import { MessagesComponent } from '../app/messages/messages.component';
import { MessageListComponent } from '../app/messages/message-list/message-list.component';
import { MessageItemComponent } from '../app/messages/message-list/message-item/message-item.component';
import { MessageEditComponent } from '../app/messages/message-edit/message-edit.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-list/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';

import { DocumentService } from './documents/document.service';
import { ContactService } from './contacts/contact.service';

import { DropdownDirective} from './shared/dropdown.directive';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactEditComponent,
    MessagesComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    DocumentEditComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [DocumentService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
