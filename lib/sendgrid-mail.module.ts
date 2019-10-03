import { DynamicModule, Module } from '@nestjs/common';
import { SendgridMailModuleAsyncOptions, SendgridMailModuleOptions } from './interfaces';
import { SendgridMailCoreModule } from './sendgrid-mail-core.module';

@Module({})
export class SendgridMailModule {

  static register(options: SendgridMailModuleOptions): DynamicModule {
    return {
      module: SendgridMailModule,
      imports: [SendgridMailCoreModule.register(options)],
    };
  }

  static registerAsync(options: SendgridMailModuleAsyncOptions): DynamicModule {
    return {
      module: SendgridMailModule,
      imports: [SendgridMailCoreModule.registerAsync(options)],
    };
  }
}
