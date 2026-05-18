import { Module } from '@nestjs/common';
import { CompareBcryptService } from './application/services/compare';
import { EncryptedBcryptService } from './application/services/encrypted';

@Module({
  providers: [CompareBcryptService, EncryptedBcryptService],
  exports: [CompareBcryptService, EncryptedBcryptService],
})
export class BcryptModule {}
