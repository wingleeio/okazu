# Okazu

Super lightweight utilities for representing errors as values.

## Installation

```bash
npm i okazu
```

## Usage

```typescript
import { define, defineAsync } from "okazu";

class DivideByZeroError extends TaggedError("DivideByZeroError") {}

const divideAsync = defineAsync(async (a: number, b: number) => {
    if (a === 0) {
        return new DivideByZeroError("a cannot be 0");
    }
    return a / b;
});

const divideSync = define((a: number, b: number) => {
    if (a === 0) {
        return new DivideByZeroError("a cannot be 0");
    }
    return a / b;
});

const main = defineAsync(async () => {
    const result = await divideAsync(1, 0); // Result<number, DivideByZeroError>
    if (result instanceof Error) {
        return result;
    }
    console.log(result); // number
    const result2 = divideSync(1, 0); // Result<number, DivideByZeroError>
    if (result2 instanceof Error) {
        return result2;
    }
    console.log(result2); // number
});
```
