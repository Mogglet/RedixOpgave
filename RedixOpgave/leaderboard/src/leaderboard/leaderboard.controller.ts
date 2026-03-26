import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly service: LeaderboardService) { }

    @Post('player/:name')
    createPlayer(@Param('name') name: string) {
        return this.service.createPlayer(name);
    }

    @Post('score')
    addScore(@Body() body: { name: string; score: number }) {
        return this.service.addScore(body.name, body.score);
    }

    @Get()
    getLeaderboard() {
        return this.service.getLeaderboard();
    }

    @Get('rank/:name')
    getRank(@Param('name') name: string) {
        return this.service.getRank(name);
    }

    @Delete('player/:name')
    deletePlayer(@Param('name') name: string) {
        return this.service.deletePlayer(name);
    }
}