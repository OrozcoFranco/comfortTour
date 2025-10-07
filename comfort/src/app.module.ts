import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { ConfigModule} from '@nestjs/config';
import { AppNestModule } from './mcp/mcp.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb://localhost/proyectoFinal'),
    AuthModule,
    UsersModule,
    AppNestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
