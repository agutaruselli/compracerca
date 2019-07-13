import { TestBed } from '@angular/core/testing';

import { ResultadosBusquedaService } from './resultados-busqueda.service';

describe('ResultadosBusquedaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultadosBusquedaService = TestBed.get(ResultadosBusquedaService);
    expect(service).toBeTruthy();
  });
});
