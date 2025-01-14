import { IEmailValidator } from "../../../../../src/domain/services/IEmailValidator"

export class MockEmailValidator implements IEmailValidator {
  private shouldValidate: boolean = true
  private error: Error | null = null

  isValid(email: string): boolean {
    if (this.error) throw this.error

    if (!this.shouldValidate) return false

    return email.includes("@") && email.includes(".")
  }

  // Métodos auxiliares para testes
  setShouldValidate(value: boolean): void {
    this.shouldValidate = value
  }

  setError(error: Error): void {
    this.error = error
  }

  clearError(): void {
    this.error = null
  }
}
