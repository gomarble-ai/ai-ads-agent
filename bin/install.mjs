#!/usr/bin/env node
/**
 * ai-ads-agent — installer wrapper for AI Ads OS (by GoMarble)
 *
 * This package is the brand entry-point for `ai-ads-agent`. The actual
 * plugin payload is shipped via the canonical `ai-ads-os` package on npm.
 * This script delegates to `npx -y ai-ads-os <args>` so users get the full
 * Claude Code + Codex CLI install experience either way.
 *
 * Why a wrapper exists:
 *   - "AI ads agent" is one of the highest-volume search terms in this space
 *     (mirrors the proven adspirer-ads-agent naming pattern). This package
 *     surfaces in those results and routes users to the working install.
 *   - Single source of truth: every fix or new skill lives in ai-ads-os and
 *     propagates automatically via the npx delegation below.
 */

import { spawnSync } from 'child_process';

const IS_WIN = process.platform === 'win32';
const argv = process.argv.slice(2);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  AI Ads Agent — powered by AI Ads OS');
console.log('  A senior AI ads agent in your terminal');
console.log('  by GoMarble · https://gomarble.ai');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('Installing the canonical ai-ads-os package…');
console.log('');

const result = spawnSync('npx', ['-y', 'ai-ads-os', ...argv], {
  stdio: 'inherit',
  shell: IS_WIN,
});

if (result.error) {
  console.error('');
  console.error('✗ Failed to invoke `npx -y ai-ads-os`.');
  console.error('  Error:', result.error.message);
  console.error('');
  console.error('  Fallback: install AI Ads OS directly with');
  console.error('      npx ai-ads-os');
  console.error('  Or, inside Claude Code:');
  console.error('      /plugin marketplace add https://github.com/gomarble-ai/ai-ads-os.git');
  console.error('      /plugin install ai-ads-os@ai-ads-os');
  console.error('      /reload-plugins');
  process.exit(1);
}

process.exit(result.status ?? 0);
