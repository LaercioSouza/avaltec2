import { Vehicle } from "./../../../src/domain/entities/Vehicle"

describe("Vehicle Entity", () => {
  it("should create a valid vehicle", () => {
    const vehicle = new Vehicle("ABC1234", 2020, "Toyota Corolla")
    expect(vehicle).toBeDefined()
    expect(vehicle.getPlate).toBe("ABC1234")
  })

  it("should throw error for invalid plate", () => {
    expect(() => {
      new Vehicle("INVALID", 2020, "Toyota Corolla")
    }).toThrow("Invalid plate")
  })

  it("should throw error for invalid year", () => {
    expect(() => {
      new Vehicle("ABC1234", 1800, "Toyota Corolla")
    }).toThrow("Invalid year")
  })
})
