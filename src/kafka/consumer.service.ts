import configuration from '@Common/configuration';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
  logLevel,
} from 'kafkajs';

export class ConsumerService {
  private readonly kafka = new Kafka({
    connectionTimeout: 10000,
    clientId: 'hello-world',
    brokers: [configuration().kafka.broker1, configuration().kafka.broker2],
    retry: {
      initialRetryTime: 3000,
      retries: 10,
    },
    logLevel: logLevel.INFO,
  });
  private readonly consumers: Consumer[] = [];

  async consume(
    topic: ConsumerSubscribeTopics,
    groupId: string,
    config: ConsumerRunConfig,
    heartbeatInterval = 3000,
    sessionTimeout = 30000,
    rebalanceTimeout = 30000,
  ) {
    try {
      const consumer = this.kafka.consumer({
        groupId: groupId,
        maxWaitTimeInMs: 100,
        heartbeatInterval: heartbeatInterval,
        sessionTimeout: sessionTimeout,
        rebalanceTimeout: rebalanceTimeout,
      });
      await consumer.connect();
      await consumer.subscribe(topic);
      await consumer.run(config);
      this.consumers.push(consumer);
    } catch (error) {
      console.error(`Error consuming topic ${topic}: ${error}`);
    }
  }

  async disconnect(consumer: Consumer) {
    await consumer.disconnect();
  }

  getConsumer(topic: string): Consumer | undefined {
    return this.consumers[topic];
  }
}
