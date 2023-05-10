import { HttpStatus } from '@nestjs/common';

export const messages = {
  success: 'success',
  no_data: 'no data found',
};

export function invalidresponse(statuscode: number, message: string) {
  return {
    status: false,
    statusCode: statuscode,
    message: message,
  };
}

export function successResponse(data: any, statusCode: number) {
  return {
    status: true,
    statusCode: statusCode,
    message: messages.success,
    data: data,
  };
}

export function noDataFoundReponse() {
  return {
    status: true,
    statusCode: HttpStatus.NO_CONTENT,
    message: messages.no_data,
    data: [],
  };
}

export function errorResponse(message: string) {
  return {
    status: false,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: message,
  };
}