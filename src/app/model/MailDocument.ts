export interface IDocumentTag {
    name: string
    value: string
}

export class MailDocument {
    tags: Array<IDocumentTag> = [];
    id: string
    type: string
    name: string
    hashIPFS: string

    constructor() {

    }
}
