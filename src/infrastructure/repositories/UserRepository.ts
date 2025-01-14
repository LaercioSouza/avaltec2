import { User } from "../../domain/entities/User"
import { IUserRepository } from "../../domain/repositories/IUserRepository"

export class UserRepository implements IUserRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email)
    return user || null
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}
