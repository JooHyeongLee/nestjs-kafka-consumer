import { Logger } from '@nestjs/common';
import { Kafka, Message, Partitioners, Producer } from 'kafkajs';
import { IProducer } from './producer.interface';
import { Util } from '@Common/util';

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;
  private readonly util: Util;

  constructor(
    private readonly topic: string,
    broker1: string,
    broker2: string,
  ) {
    this.kafka = new Kafka({
      brokers: [broker1, broker2],
    });
    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
    this.logger = new Logger(topic);
    this.util = new Util();
  }

  async produce(message: Message) {
    await this.producer.send({ topic: this.topic, messages: [message] });
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await this.util.sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
