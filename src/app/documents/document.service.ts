import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from '../../app/documents/document.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable(
  {
    providedIn: "root"
  }
)
export class DocumentService{ 
    documentListChangedEvent = new Subject<Document[]>();
    startedEditing = new Subject<number>();
    documentSelected = new EventEmitter<Document>();
    private documents: Document[] = [];
    public maxDocumentId = 0;

    constructor() { 
      this.documents = MOCKDOCUMENTS;
      this.maxDocumentId = +this.getMaxId(this.maxDocumentId);
      console.log(this.maxDocumentId);
    }

     //get the latest id
     getMaxId(id: number) {
      let maxId = this.documents.reduce((prev,current): number => {
        if(+current.id > prev) {
          return +current.id;
        }
      }, 0);
      return maxId;
    }

    //CREATE
    addDocument(newDocument: Document) {
      if (!newDocument) {
        return;
      }
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      this.documentListChangedEvent.next(this.documents.slice());
    }
    
    //READ
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
          return this.documents.slice();
        }

    //UPDATE
    updateDocument(originalDocument: Document, newDocument: Document) {
      if (originalDocument === null || originalDocument === undefined || newDocument === null || newDocument === undefined) {
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

    