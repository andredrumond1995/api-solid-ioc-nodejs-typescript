export class User {
  constructor(name: string, email: string, id?: number) {
    this.name = name;
    this.email = email;
    this.id = id;
  }
  public name: string;
  public email: string;
  public id: number;
}
