## Overview
- Require modify of OneMinuteContract.ts from contract auto generate.

## Require modify point
- remove "private" access modifier of OneMinuteContract's constructor.
  - before
    ```
    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        // initialize logic
    }
    ```
  - after
    ```
    constructor(address: Address, init?: { code: Cell; data: Cell }) {
        // initialize logic
    }
    ```
