import { FactoryProvider } from '@nestjs/common/interfaces';
import { getMailerToken } from './sendgrid-mail.helper';
import { SendgridMailModuleOptions } from './interfaces';
import { SENDGRID_MAIL_MODULE_OPTIONS } from './sendgrid-mail.constant';
import { MailService } from '@sendgrid/mail';

export const createSendgridMailer: (name?: string) => FactoryProvider = (name?: string) => ({
  provide: getMailerToken(name),
  useFactory: (options: SendgridMailModuleOptions) => {
    MailService.setApiKey(options.apiKey);
    if (options.substitutionWrappers) {
      MailService.setSubstitutionWrappers(options.substitutionWrappers.left, options.substitutionWrappers.right);
    }
    return MailService;
  },
  inject: [SENDGRID_MAIL_MODULE_OPTIONS],
});
