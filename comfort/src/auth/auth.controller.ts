import { Controller, Post, Body, ConflictException, HttpCode, HttpStatus, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createRegisterDto: CreateRegisterDto) { //recepeción y delegación
        return this.authService.register(createRegisterDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login') //recepción y delegación a authservice.ts
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard('jwt')) // patrón decorador
    @Get('validated')
    async getProfile(@Request() req) {
        return {
            id: req.user.id,
            fullname: req.user.fullname,
            email: req.user.email,
        };
    }

}