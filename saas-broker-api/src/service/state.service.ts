import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { StateEvent } from 'saas-common';

@Injectable()
export class StateService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async updateState(event: StateEvent) {
    return this.httpService
      .put(`${this.configService.get('STATE_API_URL')}/api/state/update`, event)
      .pipe(map((resp) => resp.data))
      .toPromise();
  }
}
