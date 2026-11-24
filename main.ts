// one-word-username — make.fun entry for
// "One Word, One Username, One Reward"
// (u-rusdyxbt-one-word-one-username-one-reward-1a191fae)
//
// The entry is the entrant's own make.fun username, one word and
// nothing else. This program writes exactly that word to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output), with no trailing
// newline and no extra content, so the gate sees 1-30 characters
// of UTF-8 text that is not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "byron-allen";

// The gate requires UTF-8 text of 1 to 30 characters that is not
// only white space. Check the same rule here so a bad entry fails
// loudly at build time instead of silently at the gate.
function assertValid(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 30) {
    throw new Error(`entry must be 1-30 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be a single word with no white space");
  }
}

function main(): void {
  assertValid(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
