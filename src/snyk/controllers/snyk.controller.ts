import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SnykService } from '../services/snyk.service';

@Controller('v1')
export class SnykController {
  constructor(private readonly snykService: SnykService) {}

  @Get('projects')
  findAll() {
    return this.snykService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snykService.findOne(id);
  }

}
