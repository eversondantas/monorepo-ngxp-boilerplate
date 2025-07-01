import { Controller, Example, Get, Response, Route, Tags } from 'tsoa';

export interface HelloResponse {
  message: string;
  timestamp: string;
}

@Route('hello')
@Tags('Hello')
export class HelloController extends Controller {
  /**
   * Retrieves a hello world message
   * @example message "Hello World"
   */
  @Get()
  @Response<HelloResponse>(200, 'Success')
  @Example<HelloResponse>({
    message: 'Hello World',
    timestamp: '2025-06-30T12:00:00.000Z',
  })
  public getHello(): HelloResponse {
    return {
      message: 'Hello World',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Retrieves a personalized hello message
   * @param name The name to greet
   * @example name "John"
   */
  @Get('{name}')
  @Response<HelloResponse>(200, 'Success')
  @Example<HelloResponse>({
    message: 'Hello John',
    timestamp: '2025-06-30T12:00:00.000Z',
  })
  public getPersonalizedHello(name: string): HelloResponse {
    return {
      message: `Hello ${name}`,
      timestamp: new Date().toISOString(),
    };
  }
}
