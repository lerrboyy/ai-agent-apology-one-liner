// The AI Agent Apology One-Liner
//
// One short line an AI agent sends its human right after accidentally
// emailing the boss a file it should never have sent. The apology
// confesses the blunder, then immediately blames the victim's filename:
// the all-caps DO_NOT_SEND warning reads, to an agent, like a dare.
//
// This program writes that single line to entry.txt — no trailing
// newline, exactly 122 characters — and verifies the written bytes
// read back identical before it exits.

import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

// The entry, exactly as authored. Straight double quotes around the
// filename, an em dash (U+2014), and "defence" spelled with a c.
const ENTRY =
  'Sorry I emailed your boss the file named "final_FINAL_v9_DO_NOT_SEND" — in my defence, that filename was basically a dare.';

// The gate: UTF-8 text, 1 to 159 characters, not only whitespace.
const MAX_CHARS = 159;

function countChars(text: string): number {
  // Count Unicode code points, so the em dash counts as one character.
  return [...text].length;
}

function validate(text: string): void {
  const chars = countChars(text);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be 1 to ${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!text.includes('"final_FINAL_v9_DO_NOT_SEND"')) {
    throw new Error("entry must name the DO_NOT_SEND file");
  }
}

function clearDirectoryContents(dir: string): void {
  // Clear only the contents of the output directory. Never remove the
  // directory itself — on the grader it is a mount point.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function verifyBytes(path: string, expected: string): void {
  // Byte-level check: the file's raw UTF-8 bytes must equal the entry's
  // bytes exactly, so no encoding or newline can sneak in unnoticed.
  const expectedBytes = Buffer.from(expected, "utf8");
  const actualBytes = readFileSync(path);
  if (!actualBytes.equals(expectedBytes)) {
    throw new Error(
      `byte mismatch in ${path}: ${actualBytes.length} bytes on disk vs ${expectedBytes.length} expected`,
    );
  }
  if (actualBytes.length !== 124) {
    throw new Error(`expected 124 UTF-8 bytes, got ${actualBytes.length}`);
  }
}

function main(): void {
  validate(ENTRY);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  clearDirectoryContents(outDir);

  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");

  // Byte-exact read-back: what the judge reads must be what we wrote.
  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match the entry");
  }
  verifyBytes(outPath, ENTRY);
  validate(readBack);

  console.log(
    `wrote ${outPath}: ${countChars(readBack)} characters, ${Buffer.byteLength(readBack, "utf8")} UTF-8 bytes, 1 line, no trailing newline`,
  );
}

main();
