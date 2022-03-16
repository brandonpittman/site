export const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

export function reviver(_key: string, value: string) {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
}

export function isFunction<T>(x: T): T extends Function ? true : false;
export function isFunction(x: any) {
  return !!x && {}.toString.call(x) === "[object Function]";
}

export function isInBrowser() {
  return typeof window === "object" && typeof document === "object";
}
