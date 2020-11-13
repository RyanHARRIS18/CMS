import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document} from '../document.model'
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }
              private dlSubscription : Subscription;

              ngOnInit() {
                this.documentService.getDocuments();
                this.dlSubscription = this.documentService.documentListChangedEvent
                  .subscribe((documents: Document[]) => {
                    this.documents = documents;
                  });
                this.documentService.getDocuments();
              }

              ngOnDestroy() {
                this.dlSubscription.unsubscribe();
              }

              onNewDocument() {
                this.router.navigate(['new'], {relativeTo: this.route});
              }
        
            }




