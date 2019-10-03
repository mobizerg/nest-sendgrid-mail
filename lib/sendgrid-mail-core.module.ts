import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SENDGRID_MAIL_MODULE_OPTIONS } from './sendgrid-mail.constant';
import { SendgridMailModuleAsyncOptions, SendgridMailModuleOptions, SendgridMailOptionsFactory } from './interfaces';
import { SendgridMailService } from './sendgrid-mail.service';

@Global()
@Module({})
export class SendgridMailCoreModule {

  static register(options: SendgridMailModuleOptions): DynamicModule {
    return {
      module: SendgridMailCoreModule,
      providers: [
        { provide: SENDGRID_MAIL_MODULE_OPTIONS, useValue: options },
        SendgridMailService,
      ],
      exports: [SendgridMailService],
    };
  }

  static registerAsync(options: SendgridMailModuleAsyncOptions): DynamicModule {
    return {
      module: SendgridMailCoreModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        SendgridMailService,
      ],
      exports: [SendgridMailService],
    };
  }

  private static createAsyncProviders(options: SendgridMailModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  private static createAsyncOptionsProvider(options: SendgridMailModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: SENDGRID_MAIL_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: SENDGRID_MAIL_MODULE_OPTIONS,
      useFactory: async (optionsFactory: SendgridMailOptionsFactory) => await optionsFactory.createSendgridMailOptions(options.name),
      inject: [options.useExisting || options.useClass],
    };
  }
}
