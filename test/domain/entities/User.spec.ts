import { TestFactory } from "./../../helpers/TestFactory"

describe("User Entity", () => {
  it("should create a valid passenger user", () => {
    const userOrError = TestFactory.makeUser()

    expect(userOrError.isRight()).toBe(true)
    if (userOrError.isRight()) {
      const user = userOrError.value
      expect(user.name).toBe("Antônio")
      expect(user.email).toBe("antonio@example.com")
    }
  })

  it("should validate driver vehicle requirement", () => {
    const userOrError = TestFactory.makeUser({
      userType: "DRIVER",
    })

    expect(userOrError.isLeft()).toBe(true)
    if (userOrError.isLeft()) {
      expect(userOrError.value.message).toBe("Driver must have a vehicle")
    }
  })

  it("should create valid driver with vehicle", () => {
    const vehicle = TestFactory.makeVehicle()
    const userOrError = TestFactory.makeUser({
      userType: "DRIVER",
      vehicle,
    })

    expect(userOrError.isRight()).toBe(true)
    if (userOrError.isRight()) {
      expect(userOrError.value.vehicle).toBeDefined()
    }
  })
})
