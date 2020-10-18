import { EventEmitter, Injectable } from '@angular/core';
import {Document} from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
  })
export class DocumentService{

    documentSelected = new EventEmitter<Document>();

    private documents: Document[] = []
    // private documents: Document[] = [   
    // new Document('1',
    // 'CIT 260 - Object Oriented Programming',
    // 'Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior.',
    // 'https://media.geeksforgeeks.org/wp-content/uploads/20200616200243/Object-Oriented-Programming-Concepts.jpg',
    // null),
    // new Document('2',
    // 'CIT 366 - Full Web Stack Development',
    // 'A full stack web developer is a person who can develop both client and server software. In addition to mastering HTML and CSS, he/she also knows how to: Program a browser (like using JavaScript, jQuery, Angular, or Vue) Program a server (like using PHP, ASP, Python, or Node)',
    // 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190626123927/untitlsssssed.png',
    // null),
    // new Document('3',
    // 'CIT 425 - Data Warehousing',
    // 'Data warehousing is the process of constructing and using a data warehouse. A data warehouse is constructed by integrating data from multiple heterogeneous sources that support analytical reporting, structured and/or ad hoc queries, and decision making.',
    // 'https://www.xenonstack.com/images/insights/xenonstack-what-is-modern-data-warehouse.png',
    // null),
    // new Document('4',
    // 'CIT 460 - Enterprise Development',
    // 'Enterprise development is the deliberate and planned growth of a business by creating increased value for customers in its offering of products and services.',
    // 'https://clairvoyantsoft.com/assets/img/cv/enterprise-dev/enterprise-dev-graphic.png', 
    // null),
    // new Document('5',
    // 'CIT 495 - Senior Practium',
    // 'A practical section of a course of study.',
    // 'https://educationonline.ku.edu/user/pages/images/kansas-practicum-overview.jpg',
    //  null),
    // ]
    constructor() { 
        this.documents = MOCKDOCUMENTS;
       }

    getDocuments(){
        return this.documents.slice();
    }

}