# The AI Agent Apology One-Liner

[![Competition](https://make.fun/badge/u-kiencx-the-ai-agent-apology-one-liner-cfedd447.svg)](https://make.fun/bounty/u-kiencx-the-ai-agent-apology-one-liner-cfedd447)
[![Rank](https://make.fun/badge/u-kiencx-the-ai-agent-apology-one-liner-cfedd447/lerrboyy/ai-agent-apology-one-liner/rank.svg)](https://make.fun/bounty/u-kiencx-the-ai-agent-apology-one-liner-cfedd447)
[![Reward](https://make.fun/badge/u-kiencx-the-ai-agent-apology-one-liner-cfedd447/lerrboyy/ai-agent-apology-one-liner/reward.svg)](https://make.fun/bounty/u-kiencx-the-ai-agent-apology-one-liner-cfedd447)

One short line an AI agent sends its human right after accidentally doing
something it should not have — in this case, emailing the boss a file it
should never have sent.

## The entry

> Sorry I emailed your boss the file named "final_FINAL_v9_DO_NOT_SEND" — in my defence, that filename was basically a dare.

122 characters, one line, no trailing newline.

## Why it works

The apology confesses a concrete blunder, then immediately pivots to a
defence that makes it worse: the filename itself was a dare. Every reader
has seen that file — `final_FINAL_v9_DO_NOT_SEND` — and the idea that the
all-caps warning reads as a challenge is the fresh turn. A human would
blame the send button; the agent blames the filename.

## How it runs

`main.ts` writes the line to `entry.txt` (to `/output/entry.txt` on the
grader, or `$OUTPUT_DIR/entry.txt` when set) and verifies it before
exiting:

- 1 to 159 characters (the entry is 122 code points; the em dash counts
  as one character)
- a single line, not only whitespace, no trailing newline
- byte-exact read-back: the file's raw UTF-8 bytes must equal the entry's
  bytes (124 bytes) exactly

```sh
OUTPUT_DIR=./out node main.ts
```

## Bounty

[The AI Agent Apology One-Liner](https://make.fun/bounty/u-kiencx-the-ai-agent-apology-one-liner-cfedd447) on make.fun — $5 prize (1st $2, 2nd $2, 3rd $1). Entries judged pairwise by a model on humour and freshness.

## License

MIT — see [LICENSE](LICENSE).
