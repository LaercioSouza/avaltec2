import { Either, left, right } from "../../../infrastructure/shared/either"
import { User } from "../../../domain/entities/User"
import { Vehicle } from "../../../domain/entities/Vehicle"
import { IUserRepository } from "../../../domain/repositories/IUserRepository"
import { IEmailValidator } from "../../../domain/services/IEmailValidator"
import { SignUpData } from "./SignUpData"
import { SignUpResponse } from "./SignUpResponse"

export class SignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly emailValidator: IEmailValidator,
  ) {}

  async execute(input: SignUpData): Promise<Either<Error, SignUpResponse>> {
    try {
      if (!this.emailValidator.isValid(input.email)) {
        return left(new Error("Invalid email"))
      }

      const existingUser = await this.userRepository.findByEmail(input.email)
      if (existingUser) {
        return left(new Error("Email already in use"))
      }

      let vehicle: Vehicle | undefined
      if (input.vehicle) {
        try {
          vehicle = new Vehicle(
            input.vehicle.plate,
            input.vehicle.year,
            input.vehicle.model,
          )
        } catch (error) {
          return left(error as Error)
        }
      }

      const userOrError = User.create({
        name: input.name,
        email: input.email,
        cpf: input.cpf,
        password: input.password,
        userType: input.userType,
        vehicle,
      })

      if (userOrError.isLeft()) {
        return left(userOrError.value)
      }

      const user = userOrError.value
      await this.userRepository.save(user)

      return right({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
      })
    } catch (error) {
      return left(error as Error)
    }
  }
}
