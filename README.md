<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A Sendgrid mail integration module for Nest.js framework.
</p>

### Installation

**Yarn**
```bash
yarn add @mobizerg/nest-sendgrid-mail @sendgrid/mail
```

**NPM**
```bash
npm install @mobizerg/nest-sendgrid-mail @sendgrid/mail --save
```

### Description
Sendgrid Mail integration module for [Nest.js](https://github.com/nestjs/nest) based on the [Sendgrid Mail](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail) package.

### Usage

Import the **SendgridMailModule** in `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { SendgridMailModule } from '@mobizerg/nest-sendgrid-mail';

@Module({
    imports: [
        SendgridMailModule.register(options),
    ],
})
export class AppModule {}
```
With Async
```typescript
import { Module } from '@nestjs/common';
import { SendgridMailModule } from '@mobizerg/nest-sendgrid-mail';

@Module({
    imports: [
        SendgridMailModule.registerAsync({
            imports: [ConfigModule],
            useExisting: SendgridMailConfigService,
        }),
    ],
})
export class AppModule {}
```

Example config file (async)
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { SendgridMailModuleOptions, SendgridMailOptionsFactory } from '@mobizerg/nest-sendgrid-mail';

@Injectable()
export class SendgridMailConfigService implements SendgridMailOptionsFactory {

  constructor(private readonly config: ConfigService) {}

  createSendgridMailOptions(name?: string): SendgridMailModuleOptions {
      
    return {
      name,
      apiKey: 'your-api-key',
      substitutionWrappers: {
        left: '{{',
        right: '}}',
      },
    };
  }
}
```

Importing inside services
```typescript
import { Injectable } from '@nestjs/common';
import { SendgridMailService } from '@mobizerg/nest-sendgrid-mail';
import { ClientResponse } from "@sendgrid/client/src/response";

@Injectable()
export class MailService {
    
      constructor(private readonly mailer: SendgridMailService) {}
                  
      async send(): Promise<ClientResponse> {
          return await this.mailer.send({
            to: "",
            from: "",
            subject: "",
            text: "",
            html: ""
          });
      }           
}
```

### License

MIT
