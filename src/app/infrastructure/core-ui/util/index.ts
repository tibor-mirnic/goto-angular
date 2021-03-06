export const implementsInterface = <T>(
  obj: any,
  functionName: string
): obj is T => (obj as T)[functionName] !== undefined;

export const timeout = async (ms = 0): Promise<any> => new Promise<void>(resolve => setTimeout(() => resolve(), ms));

// param key {String}
// param reverse {Boolean} OrderByDescending
// param primer {Function} Transform function
export const sortBy = (
  key: string,
  reverse: boolean,
  primer?: (value: any) => any
): any => {
  const prime = (value: any): any => primer ? primer(value[key]) : value[key];

  const compareFunction: (a: any, b: any) => number = (a, b) => {
    const primeA = prime(a) || '';
    const primeB = prime(b) || '';
    const order = [1, -1][+!!reverse];

    return ((primeA < primeB) ? -1 : (primeA > primeB) ? 1 : 0) * order;
  };

  return compareFunction;
};

export const clone = <T>(
  context?: T,
  update?: (clonedContext: T) => void
): T => {
  const cloned: T = { ...context as any };

  if (update) {
    update(cloned);
  }

  return cloned;
};

export const jsonStringify = (obj: any): string | null => {
  let asString = null;

  try {
    asString = JSON.stringify(obj);
  }
  catch (error) {
    asString = null;
  }

  return asString;
};

export const jsonParse = <T>(parsed: string): T | null => {
  let asObject: T = null;

  try {
    asObject = JSON.parse(parsed);
  }
  catch (error) {
    asObject = null;
  }

  return asObject;
};

export const convertToBase64 = (b: Blob): Promise<string> => new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onloadend = () => {
      resolve(fr.result.toString());
    };

    fr.onerror = () => {
      fr.abort();
      reject(new Error('Error converting blob to Base64'));
    };

    fr.readAsDataURL(b);
  });

export const cloneClass = <T>(obj: T): T => Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
