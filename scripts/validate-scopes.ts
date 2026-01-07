import fs from "fs";
import path from "path";
import { Scopes } from "../src/app-constants";

const scopeValues = Object.values(Scopes);
const scopeLookup = Scopes as Record<string, string>;

const isScopeNameValid = (scope: string) =>
  /^[a-z]+:[a-z]+$/.test(scope);

const collectControllerFiles = (dir: string): string[] => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectControllerFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".controller.ts")) {
      files.push(fullPath);
    }
  }

  return files;
};

const srcRoot = path.resolve(__dirname, "../src");
const controllerFiles = collectControllerFiles(srcRoot);

const usedScopes = new Set<string>();
const missingDecorators: string[] = [];

for (const file of controllerFiles) {
  const content = fs.readFileSync(file, "utf8");

  const decoratorRegex = /@Scopes\w*\(([^)]*)\)/gs;
  let decoratorMatch: RegExpExecArray | null;
  while ((decoratorMatch = decoratorRegex.exec(content)) !== null) {
    const args = decoratorMatch[1];

    const appScopeRegex = /AppScopes\.([A-Za-z0-9_]+)/g;
    let scopeMatch: RegExpExecArray | null;
    while ((scopeMatch = appScopeRegex.exec(args)) !== null) {
      const scopeKey = scopeMatch[1];
      const value = scopeLookup[scopeKey];
      if (value) {
        usedScopes.add(value);
      }
    }

    const literalRegex = /["'`]([^"'`]+)["'`]/g;
    let literalMatch: RegExpExecArray | null;
    while ((literalMatch = literalRegex.exec(args)) !== null) {
      const value = literalMatch[1];
      if (value.includes(":")) {
        usedScopes.add(value);
      }
    }
  }

  const guardRegex = /@UseGuards\(PermissionsGuard\)([\s\S]*?)\n\s*(?:async\s+)?\w+\s*\(/g;
  let guardMatch: RegExpExecArray | null;
  while ((guardMatch = guardRegex.exec(content)) !== null) {
    const block = guardMatch[1];
    if (!/@Scopes\w*\(/.test(block)) {
      missingDecorators.push(file);
    }
  }
}

const invalidScopes = scopeValues.filter((scope) => !isScopeNameValid(scope));
const unusedScopes = scopeValues.filter(
  (scope) => !usedScopes.has(scope),
);

if (!controllerFiles.length) {
  console.warn("No controller files found to validate.");
}

if (invalidScopes.length) {
  console.error("Invalid scope names:", invalidScopes);
  process.exitCode = 1;
}

if (unusedScopes.length) {
  console.error("Unused scopes:", unusedScopes);
  process.exitCode = 1;
}

if (missingDecorators.length) {
  console.error(
    "PermissionsGuard usage missing @Scopes decorator:",
    Array.from(new Set(missingDecorators)),
  );
  process.exitCode = 1;
}

if (!process.exitCode) {
  console.log("Scope validation passed.");
}
