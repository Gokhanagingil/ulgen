import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@InjectRepository(Log) private readonly logs: Repository<Log>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const user = request.user || {};
        const log = this.logs.create({
          method: request.method,
          path: request.url,
          userId: user.userId || null,
          tenantId: user.tenantId || null,
          timestamp: new Date(),
        });
        this.logs.save(log).catch(() => undefined);
      }),
    );
  }
}
