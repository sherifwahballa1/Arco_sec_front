export interface DocumentTag {
    name: string
    value: string
}

export class MailDocument {
    tags: Array<DocumentTag> = [];
    id: string
    type: string
    name: string
    hashIPFS: string

    constructor() {

    }
}
