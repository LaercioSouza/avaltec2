export class Vehicle {
  constructor(
    private readonly plate: string,
    private readonly year: number,
    private readonly model: string,
  ) {
    this.validate()
  }

  get getPlate(): string {
    return this.plate
  }

  get getModel(): string {
    return this.model
  }

  get getYear(): number {
    return this.year
  }

  private isValidPlate(plate: string): boolean {
    return /^[A-Z]{3}\d{4}$/.test(plate)
  }

  private isValidYear(year: number): boolean {
    const currentYear = new Date().getFullYear()
    return year >= 1900 && year <= currentYear
  }

  private validate(): void {
    if (!this.isValidPlate(this.plate)) {
      throw new Error("Invalid plate")
    }
    if (!this.model || this.model.length < 2) {
      throw new Error("Invalid model")
    }
    if (!this.isValidYear(this.year)) {
      throw new Error("Invalid year")
    }
  }
}
