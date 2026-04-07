const Redis = require('ioredis');
const redis = new Redis();

setInterval(async () => {
    const temp = (Math.random() * 10 + 20).toFixed(2);

    await redis.xadd(
        'temperature-stream',
        '*',
        'temperature',
        temp,
        'time',
        new Date().toISOString()
    );

    console.log('Sent temperature:', temp);
}, 2000);