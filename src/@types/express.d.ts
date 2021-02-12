declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
      role: import('@modules/users/constants/UserPermission').default;
    };
  }
}
