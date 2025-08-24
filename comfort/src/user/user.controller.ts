import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('logueado')
    async getLogueado(@Req() req: any) {
        const { userId } = req.user;
        const user = await this.usersService.findById(userId);
        return { user };
    }


    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }
}