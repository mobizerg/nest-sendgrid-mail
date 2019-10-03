import { Inject, Injectable } from '@nestjs/common';
import * as sendgridMail from '@sendgrid/mail';
import { ClientResponse } from "@sendgrid/client/src/response";
import { ResponseError } from "@sendgrid/helpers/classes";
import { MailData } from "@sendgrid/helpers/classes/mail";
import { SENDGRID_MAIL_MODULE_OPTIONS } from './sendgrid-mail.constant';
import { SendgridMailModuleOptions } from './interfaces';

@Injectable()
export class SendgridMailService {

  constructor(@Inject(SENDGRID_MAIL_MODULE_OPTIONS)
              private readonly options: SendgridMailModuleOptions) {

    if (!(options && options.apiKey)) throw new Error('SendGrid API Key is not defined');
    sendgridMail.setApiKey(options.apiKey);
    if (options.substitutionWrappers && options.substitutionWrappers.left && options.substitutionWrappers.right) {
      sendgridMail.setSubstitutionWrappers(options.substitutionWrappers.left, options.substitutionWrappers.right);
    }
  }

  send(data: MailData | MailData[], isMultiple?: boolean, cb?: (err: Error|ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]> {
    if (Array.isArray(data)) {
      return sendgridMail.send(data, isMultiple, cb);
    } else {
      return sendgridMail.send(data, isMultiple, cb);
    }
  }

  sendMultiple(data: MailData, cb?: (error: Error|ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]> {
    return sendgridMail.sendMultiple(data, cb);
  }
}
