---
name: Drizzle Postgres error codes
description: Where to find the pg error code (e.g. unique violation 23505) when catching errors from a drizzle-orm query
---

When a `db.insert(...)` (or other drizzle-orm/node-postgres query) fails, drizzle wraps the underlying `pg` error in a `_DrizzleQueryError`. The Postgres error code (e.g. `23505` for unique violation) is NOT on `err.code` — it's nested one level down on `err.cause.code`.

**Why:** Checking `err.code === "23505"` directly silently misses all violations and falls through to a generic 500, because the code lives on the wrapped `cause`, not the top-level error.

**How to apply:** When branching on Postgres error codes in a catch block after a drizzle query, check both `err.code` and `err.cause?.code` (some drivers/versions may vary), e.g.:

```ts
const cause = typeof err === "object" && err !== null && "cause" in err ? err.cause : undefined;
const code = (err as any)?.code ?? (cause as any)?.code;
if (code === "23505") { /* unique violation */ }
```
