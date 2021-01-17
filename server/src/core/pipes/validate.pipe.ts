import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidationInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        const errorResponse = error.getResponse()['message'];
        throw new UnprocessableEntityException(this.handleError(errorResponse));
      }
    }
  }

  private handleError(errors) {
    return errors.map((error) => error);
  }
}
