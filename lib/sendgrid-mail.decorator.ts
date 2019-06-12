import { Inject } from '@nestjs/common';
import { getMailerToken } from './sendgrid-mail.helper';

export function InjectMailer(name?: string): ParameterDecorator {
  return Inject(getMailerToken(name));
}
