// jest-axe ships matchers for Jest's expect; this augments Vitest's
// Assertion interface so `expect(results).toHaveNoViolations()` typechecks.
declare module "vitest" {
  interface Assertion<T> {
    toHaveNoViolations(): T;
  }
  interface AsyncAssertion<T> {
    toHaveNoViolations(): T;
  }
}

// Make this file a module so the block above augments the real package.
export {};
