import { Subject } from 'rxjs';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from '../../app/documents/document.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable(
  {
    providedIn: "root"
  }
)
export class DocumentService{ 
    documentListChangedEvent = new Subject<Document[]>();
    startedEditing = new Subject<number>();
    documentSelected = new EventEmitter<Document>();
    public maxDocumentId = 0;
    public documents: Document[] = [];

    constructor(private http: HttpClient) { 
      // console.log(this.maxDocumentId);
    }

    
    storeDocuments(documents : Document[]){
      this.http.put('https://cit-wdd430.firebaseio.com/documents.json', documents)
      .subscribe(response => {
          console.log(response);
      });

  }

    sortAndSend(documents: Document[]) {
      documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
      this.documentListChangedEvent.next(this.documents.slice());
    }

     //get the latest id
  //get the latest id
        getMaxId(id: number) {
          let maxId = 0;
          for (const document of this.documents) {
            const currentId = parseInt(document.id, 10);
            if (currentId > maxId) {
              maxId = currentId;
            }
          }
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
      this.storeDocuments(this.documents);
      this.documentListChangedEvent.next(this.documents.slice());
    }
    
    //READ
        //get document by id {Works }
        getDocument(id: string) {
          for (const document of this.documents) {
            if (document.id == id) {
              return document;
            }
          }
          return null;
        }
    
        //Get all documents {Works}
        getDocuments(){
        this.http.get<Document[]>('https://cit-wdd430.firebaseio.com/documents.json')
         .subscribe((responseData) => {
          this.documents = responseData;
          this.documentListChangedEvent.next(this.documents);
          this.maxDocumentId = +this.getMaxId(this.maxDocumentId);
        },
          (error: any) => {
            console.log(error);
          }
        );
    }


    //UPDATE
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
      this.storeDocuments(this.documents);
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
      this.storeDocuments(this.documents);
      this.documentListChangedEvent.next(this.documents.slice());
    }

}

    