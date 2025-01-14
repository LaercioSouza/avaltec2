import { User, UserType } from "./../../../src/domain/entities/User"
import { Vehicle } from "./../../../src/domain/entities/Vehicle"
import { Either, right } from "./../../../src/infrastructure/shared/either"

export class MockUser {
  static create(
    override: Partial<{
      id: string
      name: string
      email: string
      cpf: string
      password: string
      userType: UserType
      vehicle?: Vehicle
    }> = {},
  ): Either<Error, User> {
    const defaultProps = {
      name: override.name ?? "Test User",
      email: override.email ?? "test@example.com",
      cpf: override.cpf ?? "123.456.789-00",
      password: override.password ?? "validPassword123",
      userType: override.userType ?? "PASSENGER",
      vehicle: override.vehicle,
    }

    return User.create(defaultProps)
  }

  static createValid(): Either<Error, User> {
    return this.create()
  }

  static createValidDriver(): Either<Error, User> {
    const vehicle = new Vehicle("ABC1234", 2024, "Test Car Model")
    return this.create({
      userType: "DRIVER",
      vehicle,
    })
  }
}
