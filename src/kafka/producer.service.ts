import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Message } from 'kafkajs';
import { KafkajsProducer } from './kafkajs.producer';
import { IProducer } from './producer.interface';
import configuration from 'src/common/configuration';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();

  async produce(topic: string, message: Message) {
    const producer = await this.getProducer(topic);
    await producer.produce(message);
  }

  private async getProducer(topic: string) {
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkajsProducer(
        topic,
        configuration().kafka.broker1,
        configuration().kafka.broker2,
      );
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }
}
