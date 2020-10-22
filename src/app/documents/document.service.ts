import { EventEmitter, Injectable } from '@angular/core';
import {Document} from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
  })
export class DocumentService{
    documentChangedEvent = new EventEmitter<Document[]>();
    documentSelected = new EventEmitter<Document>();

    documents: Document[] = [];


    constructor() { 
      this.documents = MOCKDOCUMENTS;
     }

    getDocuments(){
      return this.documents
      .slice();
    }

    getDocument(id: string) {
      for (const document of this.documents) {
        if (document.id == id) {
          return document;
        }
      }
      return null;
    }

    deleteDocument(document: Document) {
      if (!document === null) {
        return;
      }
      const pos = this.documents.indexOf(document);
      if (pos < 0) {
        return;
      }
      this.documents.splice(pos, 1);
      this.documentChangedEvent.emit(this.documents.slice());
    }

}

    