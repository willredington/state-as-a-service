import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import * as redis from 'redis';
import { promisify } from 'util';

const TTL = 60 * 60 * 5;

@Injectable()
export class RedisService implements OnApplicationShutdown {
  private client: redis.RedisClient;

  private getAsync: (key: string) => Promise<string>;
  private setAsync: (key: string, ttl: number, value: string) => Promise<void>;
  private getKeyAsync: (regex: string) => Promise<string[]>;

  constructor() {
    this.client = redis.createClient();
    this.setAsync = promisify(this.client.setex).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.getKeyAsync = promisify(this.client.keys).bind(this.client);
  }

  async getItem(key: string) {
    return this.getAsync(key);
  }

  async setItem(key: string, value: string) {
    return this.setAsync(key, TTL, value);
  }

  async getAllKeys() {
    return this.getKeyAsync('*');
  }

  onApplicationShutdown() {
    if (this.client) {
      this.client.quit();
    }
  }
}
