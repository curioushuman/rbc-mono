import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): unknown;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    console.log('in serialiser');
    return handler.handle().pipe(
      map((data: any) => {
        console.log('Seriliazing data', data);
        const serialized = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        console.log('Serialized', serialized);
        return serialized;
      }),
    );
  }
}
