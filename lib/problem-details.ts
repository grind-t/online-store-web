import { getReasonPhrase } from 'http-status-codes';

export interface ProblemDetailsOptions {
  status: number;
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
}

export class ProblemDetails extends Error {
  public readonly status: number;
  public readonly type: string;
  public readonly title: string;
  public readonly detail?: string;
  public readonly instance?: string;

  constructor({
    status,
    type,
    title,
    detail,
    instance,
  }: ProblemDetailsOptions) {
    if (!type) type = 'about:blank';
    if (!title || type === 'about:blank') title = getReasonPhrase(status);
    super(detail || title);
    this.status = status;
    this.type = type;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
  }
}
