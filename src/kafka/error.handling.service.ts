import { Injectable } from '@nestjs/common';
import { ConsumerService } from '@Kafka/consumer.service';

@Injectable()
export class ErrorHandlingService {
  private errorCounts: { [key: string]: number } = {}; // 토픽별 에러 카운트를 저장하는 객체

  constructor(private readonly consumerService: ConsumerService) {}

  async handleErrorMessage(topic: string, error: Error, maxErrorCount = 5) {
    if (this.errorCounts.hasOwnProperty(topic)) {
      this.errorCounts[topic]++;
    } else {
      this.errorCounts[topic] = 1;
    }
  }
}
