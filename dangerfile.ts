import { danger, fail, warn } from 'danger';

import scopes from './commitlint.scopes';

const titlePattern = /^(\w+)\(([a-z-]+)\): (.+)$/;

const pr = danger.github.pr;
const isBotPr = pr.user.type === 'Bot';

/**
 * Rules
 */

if (!isBotPr) {
  // Check PR title
  if (!titlePattern.test(pr.title)) {
    fail('The PR title needs to be in format: `type(scope): Description`.');
  } else {
    const titleParts = pr.title.match(titlePattern);

    if (!titleParts || titleParts.length < 3) {
      fail('Unexpected PR title parsing error');
    } else {
      const scope = titleParts[2];

      if (!scopes.includes(scope)) {
        fail(
          'Scope in PR title must be one included in the wc.config.js file of the project.'
        );
      }
    }
  }
}

// Make sure someone is assigned to merge
if (pr.assignee === null) {
  warn(
    'Please assign someone to merge this PR, and optionally include people who should review.'
  );
}
