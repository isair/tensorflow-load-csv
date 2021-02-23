const mulberry32 = (a: number) => () => {
  let t = (a += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function shuffle<T>(array: T[], seed: number | string = 0) {
  if (typeof seed === 'string') {
    seed = cyrb53(seed);
  }
  const random = mulberry32(seed);

  const output = new Array(array.length);

  for (let i = 0; i < array.length; i++) {
    output[i] = array[i];
  }

  let m = output.length;

  while (m) {
    const i = Math.floor(random() * m--);

    const t = output[m];
    output[m] = output[i];
    output[i] = t;
    ++seed;
  }

  return output;
}

export default shuffle;
