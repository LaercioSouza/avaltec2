import { IEmailValidator } from "../../domain/services/IEmailValidator"

export class EmailValidator implements IEmailValidator {
  isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
