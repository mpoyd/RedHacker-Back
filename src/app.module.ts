import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1.1 Import the mongoose module
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LabModule } from './lab/lab.module'; // 2.1 Import the Lab module
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/store'), // 1.2 Setup the database
    LabModule, UserModule, AuthModule, MembershipModule, // 2.2 Add the Lab module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}