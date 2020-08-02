import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';

console.warn = jest.fn();

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });
