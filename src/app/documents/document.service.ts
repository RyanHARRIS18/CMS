import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Document} from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
  })
export class DocumentService{ 
    documentListChangedEvent = new Subject<Document[]>();
    documentSelected = new EventEmitter<Document>();

    
    private documents: Document[] = [];
    private maxDocumentId = 0;
    
    constructor() { 
      this.documents = MOCKDOCUMENTS;
      this.maxDocumentId = this.getMaxId(this.maxDocumentId);
    }

     //get the latest id
     getMaxId(id: number) {
      let maxId = 0;
      for (const document of this.documents) {
        id = +document.id;
        if (id > maxId) {
          id = maxId;
        }
      }
      return maxId;
    }

    //get document by id
    getDocument(id: string) {
      for (const document of this.documents) {
        if (document.id == id) {
          return document;
        }
      }
      return null;
    }

    //Get all documents
    getDocuments(){
      return this.documents
      .slice();
    }

    //CREATE
    addDocument(newDocument: Document) {
      if (newDocument == undefined || newDocument == null) {
        return;
      }
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      this.documentListChangedEvent.next(this.documents.slice());
    }

    //UPDATE
    updateDocument(originalDocument: Document, newDocument: Document) {
      if (originalDocument === null || newDocument === null) {
        return;
      }  
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
        return;
      }
      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      this.documentListChangedEvent.next(this.documents.slice());
  }


    //DELETE
    deleteDocument(document: Document) {
      if (!document === null) {
        return;
      }
      const pos = this.documents.indexOf(document);
      if (pos < 0) {
        return;
      }
      this.documents.splice(pos, 1);
      this.documentListChangedEvent.next(this.documents.slice());
    }

}

    