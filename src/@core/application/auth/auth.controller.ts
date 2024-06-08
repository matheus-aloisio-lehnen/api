import { Controller, Post, Body, UseGuards, Get, Req, Param, Put } from '@nestjs/common';
import { Request } from "express";

import { AuthService } from './auth.service';
import { LocalAuthGuard } from "../../infra/security/guards/local-auth.guard";
import { JwtAuthGuard } from "../../infra/security/guards/jwt-auth.guard";
import { ForgotPasswordDto } from "../../domain/dto/auth/reset-password/forgot-password.dto";
import { RecursivePartial } from "../../domain/type/recursive-partial.type";
import { ResetPassword } from "../../domain/model/reset-password";
import { toDomain, toEntity } from "../../infra/utils/mapper/mapper.utils";
import { ChangePasswordDto } from "../../domain/dto/auth/reset-password/change-password.dto";
import { User } from "../../domain/model/user";
import { Result } from "../../domain/type/result.type";

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('sign-in')
    @UseGuards(LocalAuthGuard)
    signIn(@Req() req: Request) {
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user;
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<Result<boolean>> {
        return {
            data: await this.authService.forgotPassword(forgotPasswordDto),
            message: "Email de redefinição de senha enviado com sucesso."
        };
    }

    @Get('has-valid-reset-password/:id')
    async hasValidResetPassword(@Param('id') id: string): Promise<Result<RecursivePartial<ResetPassword>>> {
        return {
            data: await this.authService.hasValidResetPassword(id),
            message: "O link de redefinição de senha está válido. Prossiga com a troca de senha."
        };
    }

    @Put('change-password/:id')
    async changeUserPassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
        const user: RecursivePartial<User> = toDomain(changePasswordDto)
        return {
            data: await this.authService.changeUserPassword(id, toEntity(user)),
            message: "Sua senha foi redefinida com sucesso."
        };
    }

}
