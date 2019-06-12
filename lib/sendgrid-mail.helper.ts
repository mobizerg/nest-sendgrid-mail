import { upperCase } from 'lodash';

export function getMailerToken(name?: string): string {
  return name ? `SENDGRID_MAILER_${upperCase(name)}` : 'SENDGRID_MAILER_DEFAULT';
}
