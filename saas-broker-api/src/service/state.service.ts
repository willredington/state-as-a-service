import { HttpService, Injectable } from '@nestjs/common';
import { StateEvent } from 'src/model/event';
import { map } from 'rxjs/operators';
import { StateItem } from 'src/model/state';

@Injectable()
export class StateService {
  constructor(private readonly httpService: HttpService) {}

  async updateState(event: StateEvent): Promise<StateItem> {
    return this.httpService
      .put('http://localhost:5000/api/state/update', event)
      .pipe(map((resp) => resp.data))
      .toPromise();
  }
}
