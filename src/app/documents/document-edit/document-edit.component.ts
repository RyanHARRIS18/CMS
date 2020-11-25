import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('form', { static: false }) docForm: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private documentService: DocumentService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.originalDocument = this.documentService.getDocument('id');
    });
  }

  onSubmit() {
    let newDocument = new Document(
      this.documentService.getMaxId.toString(),
      this.docForm.value.name,
      this.docForm.value.description,
      this.docForm.value.url,
      []
    )
    this.documentService.addDocument(newDocument);
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}