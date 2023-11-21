import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from '@/typing/auth';
import { RoleEnum } from '@/decorators/role.decorator';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login(loginDto: LoginDto) {
    const payload: ITokenPayload = {
      id: '1',
      name: loginDto.name,
      role: RoleEnum.common,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
