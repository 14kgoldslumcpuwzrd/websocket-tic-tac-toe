import { TestBed } from '@angular/core/testing';

import { WebSocketRequestService } from './web-socket-request.service';

describe('WebSocketRequestService', () => {
  let service: WebSocketRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
