import { PartialType } from '@nestjs/mapped-types';
import { CreateSnykDto } from './create-snyk.dto';

export class UpdateSnykDto extends PartialType(CreateSnykDto) {}
