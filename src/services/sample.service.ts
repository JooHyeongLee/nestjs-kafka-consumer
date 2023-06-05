import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '@Kafka/consumer.service';
import configuration from '@Common/configuration';

@Injectable()
export class SampleService implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['sample'] },
      SampleService.name,
      {
        eachMessage: async ({
          topic,
          partition,
          message,
          heartbeat,
          pause,
        }) => {
          try {
            console.log('process...');
          } catch (error) {
            console.error('error!');
          }
        },
      },
    );
  }
}
