import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class LeaderboardService implements OnModuleInit {
    private redisClient;
    private leaderboardKey = 'leaderboard';

    async onModuleInit() {
        this.redisClient = createClient({
            url: 'redis://localhost:6379',
        });

        await this.redisClient.connect();
    }

    async createPlayer(name: string) {
        await this.redisClient.zAdd(this.leaderboardKey, {
            score: 0,
            value: name,
        });

        return { message: `Player ${name} created` };
    }

    async addScore(name: string, score: number) {
        await this.redisClient.zAdd(this.leaderboardKey, {
            score,
            value: name,
        });

        return { message: `Score updated for ${name}` };
    }

    async getLeaderboard() {
        const data = await this.redisClient.zRangeWithScores(
            this.leaderboardKey,
            0,
            -1
        );

        console.log('RAW:', data);

        return data;
    }

    async getRank(name: string) {
        const rank = await this.redisClient.zRevRank(
            this.leaderboardKey,
            name
        );

        if (rank === null) return { message: 'Player not found' };

        return { player: name, rank: rank + 1 };
    }

    async deletePlayer(name: string) {
        await this.redisClient.zRem(this.leaderboardKey, name);

        return { message: `Player ${name} removed` };
    }
}