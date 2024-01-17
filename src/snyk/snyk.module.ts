import { Module } from '@nestjs/common';
import { SnykService } from './services/snyk.service';
import { SnykController } from './controllers/snyk.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SnykController],
  providers: [SnykService]
})
export class SnykModule {}
