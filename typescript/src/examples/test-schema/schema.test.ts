import { describe, it, expect } from "vitest";
import { dataSchema } from "@/examples/test-schema/schema";

describe("dataSchema validation", () => {
  const validData = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    isActive: true,
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-01-02T00:00:00Z"),
  };

  it("should validate correct data", () => {
    const result = dataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate data without optional updatedAt", () => {
    const { updatedAt, ...dataWithoutUpdatedAt } = validData;
    const result = dataSchema.safeParse(dataWithoutUpdatedAt);
    expect(result.success).toBe(true);
  });

  describe("id validation", () => {
    it("should reject invalid UUID", () => {
      const invalidData = { ...validData, id: "invalid-uuid" };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject missing id", () => {
      const { id, ...dataWithoutId } = validData;
      const result = dataSchema.safeParse(dataWithoutId);
      expect(result.success).toBe(false);
    });
  });

  describe("name validation", () => {
    it("should reject empty name", () => {
      const invalidData = { ...validData, name: "" };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject name longer than 100 characters", () => {
      const invalidData = { ...validData, name: "a".repeat(101) };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should accept name with exactly 100 characters", () => {
      const validDataWithMaxName = { ...validData, name: "a".repeat(100) };
      const result = dataSchema.safeParse(validDataWithMaxName);
      expect(result.success).toBe(true);
    });

    it("should reject missing name", () => {
      const { name, ...dataWithoutName } = validData;
      const result = dataSchema.safeParse(dataWithoutName);
      expect(result.success).toBe(false);
    });
  });

  describe("age validation", () => {
    it("should reject negative age", () => {
      const invalidData = { ...validData, age: -1 };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject age over 120", () => {
      const invalidData = { ...validData, age: 121 };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should accept age 0", () => {
      const validDataWithZeroAge = { ...validData, age: 0 };
      const result = dataSchema.safeParse(validDataWithZeroAge);
      expect(result.success).toBe(true);
    });

    it("should accept age 120", () => {
      const validDataWithMaxAge = { ...validData, age: 120 };
      const result = dataSchema.safeParse(validDataWithMaxAge);
      expect(result.success).toBe(true);
    });

    it("should reject non-integer age", () => {
      const invalidData = { ...validData, age: 30.5 };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject missing age", () => {
      const { age, ...dataWithoutAge } = validData;
      const result = dataSchema.safeParse(dataWithoutAge);
      expect(result.success).toBe(false);
    });
  });

  describe("email validation", () => {
    it("should reject invalid email format", () => {
      const invalidData = { ...validData, email: "invalid-email" };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject missing email", () => {
      const { email, ...dataWithoutEmail } = validData;
      const result = dataSchema.safeParse(dataWithoutEmail);
      expect(result.success).toBe(false);
    });
  });

  describe("isActive validation", () => {
    it("should accept false value", () => {
      const validDataWithFalse = { ...validData, isActive: false };
      const result = dataSchema.safeParse(validDataWithFalse);
      expect(result.success).toBe(true);
    });

    it("should reject non-boolean value", () => {
      const invalidData = { ...validData, isActive: "true" };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject missing isActive", () => {
      const { isActive, ...dataWithoutIsActive } = validData;
      const result = dataSchema.safeParse(dataWithoutIsActive);
      expect(result.success).toBe(false);
    });
  });

  describe("createdAt validation", () => {
    it("should reject invalid date", () => {
      const invalidData = { ...validData, createdAt: "invalid-date" };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject missing createdAt", () => {
      const { createdAt, ...dataWithoutCreatedAt } = validData;
      const result = dataSchema.safeParse(dataWithoutCreatedAt);
      expect(result.success).toBe(false);
    });
  });

  describe("updatedAt validation", () => {
    it("should reject invalid date when provided", () => {
      const invalidData = { ...validData, updatedAt: "invalid-date" };
      const result = dataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
