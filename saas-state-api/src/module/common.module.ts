import { Module } from '@nestjs/common';
import { DbService } from 'src/service/db.service';

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class CommonModule {}
