import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case "P2002": {
        const status = HttpStatus.CONFLICT;
        const target = (exception.meta?.target as string[])?.join(", ");
        response.status(status).json({
          statusCode: status,
          message: `Conflict: A record with the same unique value for field(s): [${target}] already exists.`,
        });
        break;
      }
      case "P2025": {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message:
            "Record not found. The requested resource could not be found to perform the operation.",
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
