import { TestBed } from '@angular/core/testing';

import { IpfsDaemonServiceService } from './ipfs-daemon-service.service';

describe('IpfsDaemonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpfsDaemonServiceService = TestBed.get(IpfsDaemonServiceService);
    expect(service).toBeTruthy();
  });
});
