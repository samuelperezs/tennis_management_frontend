export class User {
  constructor(
    public name: string,
    public email: string,
    public role: number,
    public club: Object,
    public token: string
  ) {}
}
