import { InjectionToken } from '@angular/core';
import * as IpfsHttpClient from 'ipfs-http-client'


export const ipfsToken = new InjectionToken('The IPFS Token', {
    providedIn: 'root',
    factory: () => {
        try {
            return new IpfsHttpClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
            // return new IpfsHttpClient({ host: 'localhost', port: '5001', protocol: 'http' });
        } catch (err) {
            console.log('Error', err);
            throw new Error('Unable to access IPFS node daemon on Infura network');
        }
    }
});