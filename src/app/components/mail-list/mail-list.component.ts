import { Component, OnInit } from '@angular/core';
import { Mail } from '../../model/Mail';
import { MailDocument, IDocumentTag } from '../../model/MailDocument';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit {

  mails : Array<Mail>;

  constructor() { }

  ngOnInit() {
    const mail = this.getDummyMail();
    this.mails.push(mail)
  }

  getDummyMail() : Mail {
    const mail = new Mail()
    mail.description = "lorem ipsum"
    const document_1 = new MailDocument()
    document_1.tags.push({name: "tag1", value: "value1"}, {name: "tag1", value: "value1"})
    const document_2 = new MailDocument()
    document_2.tags.push({name: "tag1", value: "value2"}, {name: "tag3", value: "value3"})
    mail.documents.push(document_1, document_2)
    return mail
  }

}
