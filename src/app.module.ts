import { Module} from '@nestjs/common';
import { SnykModule } from './snyk/snyk.module';



@Module({
  imports: [SnykModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
