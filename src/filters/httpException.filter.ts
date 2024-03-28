import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpExceptionOptions,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const exceptionOptions: HttpExceptionOptions =
      (exception as any).options || {};
    let msg = 'unknown';
    if (typeof exceptionResponse === 'string') {
      msg = exceptionResponse;
    } else if (typeof exceptionResponse === 'object') {
      msg = (exceptionResponse as any).message || 'unknown';
    }

    response.status(status).json({
      data: exceptionResponse,
      msg,
      success: false,
      description: exceptionOptions.description || '',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
