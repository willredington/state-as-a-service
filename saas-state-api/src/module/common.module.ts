import { Module } from '@nestjs/common';
import { DbService } from 'src/service/db.service';
import { RegistryService } from 'src/service/registry.service';

@Module({
  providers: [DbService, RegistryService],
  exports: [DbService, RegistryService],
})
export class CommonModule {}
