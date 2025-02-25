export interface JwtServicePort {
  sign(payload: { id: string; email: string }): string;
  verify(token: string): any;
}
