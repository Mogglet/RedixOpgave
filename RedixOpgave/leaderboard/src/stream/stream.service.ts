import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class StreamService implements OnModuleInit {
    private redis: Redis;

    onModuleInit() {
        this.redis = new Redis(); 
        this.listenToStream();
    }

    async listenToStream() {
        let lastId = '$'; 

        while (true) {
            const response = await this.redis.xread(
                'BLOCK',
                0,
                'STREAMS',
                'temperature-stream',
                lastId
            );

            if (response) {
                const [_, messages] = response[0];

                for (const message of messages) {
                    const [id, data] = message;
                    lastId = id;

                    console.log('Temperature event:', data);
                }
            }
        }
    }
}