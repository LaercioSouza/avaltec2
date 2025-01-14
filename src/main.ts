import { EmailValidator } from "./infrastructure/services/EmailValidator"
import { UserRepository } from "./infrastructure/repositories/UserRepository"
import { SignUpUseCase } from "./application/usecases/signup/SignUpUseCase"

const userRepository = new UserRepository()
const emailValidator = new EmailValidator()
const signUpUseCase = new SignUpUseCase(userRepository, emailValidator)

async function main() {
  try {
    const result = await signUpUseCase.execute({
      name: "Antônio Ivo",
      email: "antonio@example.com",
      cpf: "123.456.789-00",
      password: "normalPassword1234",
      userType: "PASSENGER",
    })
    console.log("User created:", result)
  } catch (error) {
    console.error("Error:", error)
  }
}

main()
