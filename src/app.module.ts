import { Module } from '@nestjs/common';
import { SampleService } from '@Services/sample.service';
import { KafkaModule } from '@Kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [SampleService],
})
export class AppModule {}
