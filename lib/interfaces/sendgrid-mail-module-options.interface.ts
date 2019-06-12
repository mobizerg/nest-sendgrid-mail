import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface SendgridMailModuleOptions {
  name?: string;
  apiKey: string;
  substitutionWrappers?: { left: string; right: string };
}

export interface SendgridMailOptionsFactory {
  createSendgridMailOptions(name?: string): Promise<SendgridMailModuleOptions> | SendgridMailModuleOptions;
}

export interface SendgridMailModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<SendgridMailOptionsFactory>;
  useClass?: Type<SendgridMailOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<SendgridMailModuleOptions> | SendgridMailModuleOptions;
  inject?: any[];
}
