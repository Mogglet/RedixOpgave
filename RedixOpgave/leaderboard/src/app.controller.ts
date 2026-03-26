import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { createClient } from 'redis';

@Controller()
export class AppController {

    // Redis klient connects via redis serveren som kører localhost
    private redisClient = createClient({
        url: 'redis://localhost:6379',
    });


    constructor(private readonly appService: AppService) {
        // connect én gang (ved opstart)
        this.redisClient.connect();


    }

   



}
