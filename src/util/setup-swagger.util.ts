import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../../package.json';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('nestjs-sofono')
    .setVersion(version)
    .addBearerAuth()
    .addApiKey(
      { type: 'apiKey', name: 'Authentication', in: 'cookie' },
      'Authentication',
    )
    .setContact(
      'Adrian Pietrzak',
      'https://pietrzakadrian.com',
      'contact@pietrzakadrian.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
}
