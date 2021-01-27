import { Body, Controller, Post } from '@nestjs/common';
import { CreateRegistryDto } from 'src/dto/registry';
import { RegistryService } from 'src/service/registry.service';

@Controller('api/registry')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Post('create')
  async createState(@Body() dto: CreateRegistryDto) {
    // return this.registryService.create(dto);
  }
}
