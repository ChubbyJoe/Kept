type SafeLogContext = Readonly<{
  code: string;
  operation: string;
}>;

export function logServerError(context: SafeLogContext) {
  console.error(
    JSON.stringify({
      level: "error",
      message: "A server operation failed",
      code: context.code,
      operation: context.operation,
    }),
  );
}

if (process.argv[1]?.endsWith("src/platform/logging/logger.ts")) {
  logServerError({
    code: "scaffold_check",
    operation: "verify_logging_boundary",
  });
}
