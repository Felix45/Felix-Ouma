// "server-only" throws by design when imported outside a bundler that
// understands the "react-server" export condition (Next.js does; Vitest
// doesn't). This stub lets lib/*.ts modules that guard themselves with
// `import "server-only"` be imported directly in tests.
export {};
