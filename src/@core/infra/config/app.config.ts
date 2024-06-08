import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    envFilePath: '.env',
    isGlobal: true,
    nest: {
        port: parseInt(process.env.PORT) || 3000,
    },
    cors: {
        enabled: true,
    },
    swagger: {
        enabled: !!process.env.SWAGGER_ENABLED || true,
        title: process.env.SWAGGER_TITLE || 'Startup API',
        description: process.env.SWAGGER_DESCRIPTION || 'Startup API',
        version: process.env.SWAGGER_VERSION,
        path: 'api',
    },
}));



