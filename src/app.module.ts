import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { ProductsModule } from './products/products.module';

import { CorsMiddleware } from './cors.midlleware';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
