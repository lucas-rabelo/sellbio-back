import { Module } from '@nestjs/common';
import { CompareBcryptService } from './application/services/compare/compare-bcrypt.service';
import { EncryptedBcryptService } from './application/services/encrypted/encrypted-bcrypt.service';

@Module({
  providers: [CompareBcryptService, EncryptedBcryptService],
  exports: [CompareBcryptService, EncryptedBcryptService],
})
export class BcryptModule {}
