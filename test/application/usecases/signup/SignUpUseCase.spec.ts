import { SignUpUseCase } from "../../../../src/application/usecases/signup/SignUpUseCase"
import { MockUserRepository } from "./mocks/MockUserRepository"
import { MockEmailValidator } from "./mocks/MockEmailValidator"
import { MockUser } from "../../../domain/mocks/MockUser"

describe("SignUpUseCase", () => {
  let sut: SignUpUseCase
  let userRepository: MockUserRepository
  let emailValidator: MockEmailValidator

  beforeEach(() => {
    userRepository = new MockUserRepository()
    emailValidator = new MockEmailValidator()
    sut = new SignUpUseCase(userRepository, emailValidator)
  })

  it("should handle repository errors", async () => {
    const repositoryError = new Error("Database connection failed")
    userRepository.setError(repositoryError)

    const input = {
      name: "John Doe",
      email: "john@example.com",
      cpf: "123.456.789-00",
      password: "validPass123",
      userType: "PASSENGER" as const,
    }

    const result = await sut.execute(input)

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe("Database connection failed")
    }
  })

  it("should handle email validator errors", async () => {
    const validatorError = new Error("Email validation service unavailable")
    emailValidator.setError(validatorError)

    const input = {
      name: "John Doe",
      email: "john@example.com",
      cpf: "123.456.789-00",
      password: "validPass123",
      userType: "PASSENGER" as const,
    }

    const result = await sut.execute(input)

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe("Email validation service unavailable")
    }
  })

  it("should handle vehicle creation errors", async () => {
    const input = {
      name: "John Driver",
      email: "driver@example.com",
      cpf: "123.456.789-00",
      password: "validPass123",
      userType: "DRIVER" as const,
      vehicle: {
        plate: "INVALID",
        model: "Toyota Corolla",
        year: 2020,
      },
    }

    const result = await sut.execute(input)

    expect(result.isLeft()).toBe(true)
    if (result.isLeft()) {
      expect(result.value.message).toBe("Invalid plate")
    }
  })
})
