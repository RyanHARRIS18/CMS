import { Injectable, EventEmitter } from "@angular/core";
import { Document } from "./document.model";

import { Subject } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  private documents: Document[] = [];

  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  // getDocument(id: string): any {
  //   return this.http.get<{ message: string, document: Document}>('http://localhost3000/documents/' + id);
  //  }
 
  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }

  getDocuments() {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents/')
      .subscribe((responseData) => {
        this.documents = responseData.documents;
        this.sortAndSend();
      },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    const strDocument = JSON.stringify(newDocument);
    console.log(strDocument);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents/',
      strDocument,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(newDocument);
          this.sortAndSend();
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(c => c.id === document.id);
    if (pos < 0) {
      return;
    }
    this.http.delete('http://localhost:3000/documents/' + document.id).subscribe(
      (respose: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex(c => c.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/documents/' + originalDocument.id, newDocument, { headers: headers }).subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
      });
  }
}