import { Module } from "@nestjs/common";
import { InfraModule } from "@/src/infra/infra.module";

import { UsersModule } from "./users/users.module";

const entities = [InfraModule, UsersModule];

@Module({
  imports: entities,
  exports: entities,
})
export class AppplicationModule { };
