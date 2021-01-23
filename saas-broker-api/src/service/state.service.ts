import { HttpService, Injectable } from '@nestjs/common';
import { StateEvent } from 'src/model/event';
import { map } from 'rxjs/operators';

@Injectable()
export class StateService {
  constructor(private readonly httpService: HttpService) {}

  updateState(event: StateEvent) {
    return this.httpService
      .put('http://localhost:5000/api/state/update', event)
      .pipe(map((resp) => resp.data));
  }
}
