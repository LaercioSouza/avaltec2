import { Either, left, right } from "../../infrastructure/shared/either"
import { Vehicle } from "./Vehicle"

export type UserType = "PASSENGER" | "DRIVER"

export interface UserProps {
  name: string
  email: string
  cpf: string
  password: string
  userType: UserType
  vehicle?: Vehicle
}

export class User {
  private constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _cpf: string,
    private readonly _password: string,
    private readonly _userType: UserType,
    private readonly _vehicle?: Vehicle,
  ) {}

  static create(props: UserProps): Either<Error, User> {
    if (!this.validateName(props.name)) {
      return left(new Error("Invalid name"))
    }
    if (!this.validateCPF(props.cpf)) {
      return left(new Error("Invalid CPF"))
    }
    if (!this.validatePassword(props.password)) {
      return left(new Error("Invalid password"))
    }
    if (props.userType === "DRIVER" && !props.vehicle) {
      return left(new Error("Driver must have a vehicle"))
    }

    return right(
      new User(
        crypto.randomUUID(),
        props.name,
        props.email,
        props.cpf,
        props.password,
        props.userType,
        props.vehicle,
      ),
    )
  }

  private static validateName(name: string): boolean {
    return name.length >= 3
  }

  private static validateCPF(cpf: string): boolean {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)
  }

  private static validatePassword(password: string): boolean {
    return password.length >= 8
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get cpf(): string {
    return this._cpf
  }

  get userType(): UserType {
    return this._userType
  }

  get vehicle(): Vehicle | undefined {
    return this._vehicle
  }
}
