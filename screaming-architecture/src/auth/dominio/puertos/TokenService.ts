export interface TokenService {
  generate(payload: Record<string, unknown>): Promise<string>;
  verify<T = any>(token: string): Promise<T>;
}
