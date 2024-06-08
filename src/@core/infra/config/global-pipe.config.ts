import { INestApplication, INestMicroservice, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { TrimPipe } from "../utils/pipes/trim-pipe";

export const GLOBAL_PIPE_CONFIG: ValidationPipeOptions = {
    whitelist: true,
    transform: true,
};

export const configureGlobalPipes = (app: INestApplication | INestMicroservice) => {
    app.useGlobalPipes(new ValidationPipe(GLOBAL_PIPE_CONFIG), new TrimPipe());
}
