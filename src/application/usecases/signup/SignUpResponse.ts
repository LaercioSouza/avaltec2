import { UserType } from "../../../domain/entities/User"

export interface SignUpResponse {
  success: boolean
  user: {
    id: string
    name: string
    email: string
    userType: UserType
  }
}
