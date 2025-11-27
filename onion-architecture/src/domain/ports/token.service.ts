export interface TokenService {
  generate(payload: Record<string, unknown>): Promise<string>;
  verify(token: string): Promise<any>;
}
