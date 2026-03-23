import { TestBed } from '@angular/core/testing';

import { SessionLinkService } from './session-link.service';

describe('SessionLinkService', () => {
  let service: SessionLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
