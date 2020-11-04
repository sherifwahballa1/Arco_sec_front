import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { ipfsToken } from './ipfsToken';

@Injectable({
  providedIn: 'root'
})
export class IpfsDaemonServiceService {
  constructor(@Inject(ipfsToken) private ipfs,
    private httpClient: HttpClient) { }

  public addFile(file: File): Observable<string> {
    const data = {
      path: file.name,
      content: file
    }

    const options = {
      progress: (prog) => console.log(`progress report: ${prog}`)
    };

    return from(this.ipfs.add(data, options)).pipe(
      tap((res: any) =>
        console.log(`IPFS node response json: ${JSON.stringify(res)}`)
      ),
      map((res: any) => {
        // console.log(res, '////////////////////');
        // console.log(res.cid.toString());
        // return res.cid.toString();
        return res.path;
      })
    );
  }

  // public getFile = (hash: string): Observable<Blob> =>
  //   from(this.ipfs.cat(hash)).pipe(
  //     switchMap((buffer: Buffer) => {
  //       const byteString = buffer.toString('base64');
  //       const url = `data:application/octet-stream;base64,${byteString}`;
  //       console.log(hash);

  //       return this.httpClient.get(url, {
  //         responseType: 'blob'
  //       });
  //     }
  //     ));
}
