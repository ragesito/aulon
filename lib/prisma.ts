import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Lazy Prisma client.
 * - On Cloudflare Workers (OpenNext) it connects through the D1 binding "DB".
 *   The client MUST be created inside a request (that's when the Cloudflare
 *   context exists), never at module scope — module init happens at cold
 *   start, before any request context is available.
 * - Anywhere else (local dev, build) it uses the standard engine with the
 *   file-based SQLite from DATABASE_URL.
 */

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  let client: PrismaClient;
  try {
    const { env } = getCloudflareContext() as { env: { DB?: unknown } };
    if (env?.DB) {
      // Explicit WASM build: the default "@prisma/client" resolves to the
      // Node engine (fs-based) under OpenNext's bundler and crashes on
      // Workers. The /wasm entry ships the engine as a WebAssembly module.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { PrismaClient: PrismaClientWasm } =
        require("@prisma/client/wasm") as typeof import("@prisma/client");
      client = new PrismaClientWasm({
        adapter: new PrismaD1(env.DB as never),
      }) as unknown as PrismaClient;
    } else {
      client = new PrismaClient();
    }
  } catch {
    client = new PrismaClient();
  }

  globalForPrisma.prisma = client;
  return client;
}

/** Proxy so `prisma.booking.findMany()` etc. resolve the real client
 *  on first use, inside a request. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getClient() as unknown as Record<string | symbol, unknown>;
    const value = client[prop];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});
