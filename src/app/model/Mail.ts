import { Contact } from './Contact'
import { MailDocument } from './MailDocument'

export class Mail {

    description: string;
    recipients: Array<Contact> = [];
    documents: Array<MailDocument> = [];

}