import { User } from "./../../../../../src/domain/entities/User"
import { IUserRepository } from "./../../../../../src/domain/repositories/IUserRepository"

export class MockUserRepository implements IUserRepository {
  private users: User[] = []
  private error: Error | null = null

  async findByEmail(email: string): Promise<User | null> {
    if (this.error) throw this.error
    return this.users.find((user) => user.email === email) || null
  }

  async save(user: User): Promise<void> {
    if (this.error) throw this.error
    this.users.push(user)
  }

  setError(error: Error): void {
    this.error = error
  }

  clearError(): void {
    this.error = null
  }

  clearUsers(): void {
    this.users = []
  }

  getUsers(): User[] {
    return [...this.users]
  }

  addUser(user: User): void {
    this.users.push(user)
  }
}
