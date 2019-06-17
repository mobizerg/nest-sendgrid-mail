export function getMailerToken(name?: string): string {
  return name ? `SENDGRID_MAILER_${name.toUpperCase()}` : 'SENDGRID_MAILER_DEFAULT';
}
