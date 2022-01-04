export type Nullish = null | undefined;

export type Modify<T, R> = Omit<T, keyof R> & R;

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export function nextHeadingLevel(level: HeadingLevel): HeadingLevel {
  switch (level) {
    case 'h1':
      return 'h2';
    case 'h2':
      return 'h3';
    case 'h3':
      return 'h4';
    case 'h4':
      return 'h5';
    case 'h5':
      return 'h6';
    default:
      console.warn(`No next heading level for ${level}.`);
      return 'h6';
  }
}
