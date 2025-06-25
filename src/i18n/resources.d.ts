declare module '*.json' {
  const value: Record<string, Record<string, string | Record<string, string>>>;
  export default value;
} 