import redisStore from 'cache-manager-redis-store'
import type { RedisClientOptions } from 'redis'

import { CacheModule, CacheOptions } from '@nestjs/cache-manager'
import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

export class AppCacheModule {
  public static forRoot(cacheOptions: CacheOptions = {}): DynamicModule {
    return {
      module: AppCacheModule,
      imports: [
        CacheModule.registerAsync<RedisClientOptions>({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            ...cacheOptions,
            store: redisStore,
            host: configService.getOrThrow<string>('redis.host', 'localhost'),
            port: configService.getOrThrow<number>('redis.port', 6379),
          }),
        }),
      ],
    }
  }
}
