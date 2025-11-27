export interface TokenService {
  generate(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}
