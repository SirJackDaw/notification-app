import { Controller, Post,Get, Body, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto){
    return this.authService.login(dto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@CurrentUser() user: User) {
    return this.authService.logout(user.id)
  }

  @Post('refresh')
  async refresh(@Body() token: { token: string }) {
    return this.authService.refreshToken(token.token)
  }
}
