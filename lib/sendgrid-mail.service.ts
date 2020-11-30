import * as sgMail from '@sendgrid/mail';
import { Inject, Injectable } from '@nestjs/common';
import { ClientResponse } from "@sendgrid/client/src/response";
import { ResponseError } from "@sendgrid/helpers/classes";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import { SENDGRID_MAIL_MODULE_OPTIONS } from './sendgrid-mail.constant';
import { SendgridMailModuleOptions } from './interfaces';

@Injectable()
export class SendgridMailService {

  constructor(@Inject(SENDGRID_MAIL_MODULE_OPTIONS)
              private readonly options: SendgridMailModuleOptions) {
    if (!(options && options.apiKey)) throw new Error('SendGrid API Key is not defined');
    sgMail.setApiKey(options.apiKey);
    if (options.substitutionWrappers && options.substitutionWrappers.left && options.substitutionWrappers.right) {
      sgMail.setSubstitutionWrappers(options.substitutionWrappers.left, options.substitutionWrappers.right);
    }
  }

  send(data: MailDataRequired | MailDataRequired[], isMultiple?: boolean, cb?: (err: Error|ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]> {
    return sgMail.send(data, isMultiple, cb);
  }

  sendMultiple(data: MailDataRequired, cb?: (error: Error|ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]> {
    return sgMail.sendMultiple(data, cb);
  }
}
