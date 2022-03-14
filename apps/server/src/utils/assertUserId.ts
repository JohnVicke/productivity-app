import { Request } from 'express';
import { SerializedUser } from '../types';

type RequestWithUser = Request & { user: SerializedUser };

export function assertUserId(req: Request): asserts req is RequestWithUser {
  if (!('user' in req)) {
    throw new Error('request object was found without user unexpectedly');
  }
}
