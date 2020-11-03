import { Injectable } from '@angular/core';
import IpfsHttpClient from 'ipfs-http-client';
const { globSource } = IpfsHttpClient

// connect to ipfs daemon API server
const ipfs = IpfsHttpClient('http://localhost:5001') // (the default in Node.js)

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  constructor() { }

  async addFile(path: string) : Promise<string> {
    /**
     * @return {path: string,
                cid: CID(string),
                size: number}
     */
    return await ipfs.add(globSource(path));
  }

  async getFile(ipfsHash) {
    // todo not tested
    //src https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsgetipfspath-options
    const file = await ipfs.get(ipfsHash);
    const content = []
    for await (const chunk of file.content) {
        content.push(chunk)
      }
    return content;
  }
}
