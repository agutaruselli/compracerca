import { TestBed } from '@angular/core/testing';

import { CommerceDetailResolverService } from './commerce-detail-resolver.service';

describe('CommerceDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommerceDetailResolverService = TestBed.get(CommerceDetailResolverService);
    expect(service).toBeTruthy();
  });
});
