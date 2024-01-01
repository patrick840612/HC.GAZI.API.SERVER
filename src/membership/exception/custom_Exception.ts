import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class CustomHttpExceptionFilter extends BaseExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const status = exception.getStatus();

        let message: any = exception.getResponse();
        if (typeof message === 'object' && 'message' in message) {
            message = message.message;
        }

        response.status(status).json({
            resultCode: status,
            resultMessage: message,
        });
    }
}