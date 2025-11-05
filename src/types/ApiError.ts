import type { HttpStatusCode } from 'axios';

export type ApiError = {
  type: string;
  title: string;
  status: HttpStatusCode;
  detail: string;
  code: string;
  traceId: string;
  stackTrace: string;
  message: string;
  details: Record<string, string[]>;
};
