import { DynamicModule, Inject, Module, Provider } from '@nestjs/common';
import { SENDGRID_MAIL_MODULE_OPTIONS } from './sendgrid-mail.constant';
import { SendgridMailModuleAsyncOptions, SendgridMailModuleOptions, SendgridMailOptionsFactory } from './interfaces';
import { createSendgridMailer } from './sendgrid-mail.provider';
import { getMailerToken } from './sendgrid-mail.helper';

@Module({})
export class SendgridMailModule {

  constructor(@Inject(SENDGRID_MAIL_MODULE_OPTIONS)
              private readonly options: SendgridMailModuleOptions) {}

  static register(options: SendgridMailModuleOptions): DynamicModule {
    return {
      module: SendgridMailModule,
      providers: [
        createSendgridMailer(options.name),
        { provide: SENDGRID_MAIL_MODULE_OPTIONS, useValue: options },
      ],
      exports: [getMailerToken(options.name)],
    };
  }

  static registerAsync(options: SendgridMailModuleAsyncOptions): DynamicModule {
    return {
      module: SendgridMailModule,
      imports: options.imports || [],
      providers: [
        createSendgridMailer(options.name),
        ...this.createAsyncProviders(options),
      ],
      exports: [getMailerToken(options.name)],
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
