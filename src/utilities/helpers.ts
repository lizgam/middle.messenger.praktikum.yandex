export function trim(value: string, params = "") {
    if (params === "") {
        params = "\xA0 ";
    }
    const expr = new RegExp(`^[${params}]+|[${params}]+\$`, "g");
    return value.replace(expr, "");
}



export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const key of Object.keys(lhs)) {
        if (rhs[key] instanceof Object) {
            Object.assign(lhs[key] as Indexed, merge(rhs[key] as Indexed, lhs[key] as Indexed))
        }
    }

    Object.assign(lhs || {}, rhs)
    return lhs;
}


export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== "string") {
        throw new Error("path must be string");
    }
    if (typeof object !== "object" || object === null) {
        return object;
    }
    const key = path.split(".");
    const interObj = key.reduceRight<Indexed>((acc, curVal) => ({
        [curVal]: acc,
    }), value as any);
    return merge(object as Indexed, interObj);
}

/*
type PlainObject<T = any> = {
    [k in string]: T;
};

type PlainObjectKisString<T = unknown> = {
    k: string;
};
const Foo: PlainObjectKisString = { k: 'str' };
const Foo1: PlainObjectKisString = { k: 123 }; //error
const Foo2: PlainObjectKisString = { foo: 'str' }; //error

//[k in string] - создаст тип, у которого м быть произвольный ключ строкового типа т ошибок не будет:
const Foo3: PlainObject = { k: 123 }; //error
const Foo4: PlainObject = { foo: 'str' };

~~~ Record<string,T>

export function isEqual(a: PlainObject, b: PlainObject): boolean {
    if (a === b) {
    return true;
  }
  else if ((typeof a == "object" && a != null) && (typeof b == "object" && b != null)) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;

    for (const [key, value] of Object.entries(a)) {
      const t = b[key];
      if (b.hasOwnProperty(key))
      {
        if (! isEqual(value, t))
          return false;
      } else
        return false;
    }

    return true;
  }
  else
    return false;
}
*/


function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]'; //'[object Date]'- for Date
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
    const result: [string, string][] = [];

    for (const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        } else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }

    return result;
}

export function queryStringify(data: PlainObject) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }

    return getParams(data).map(arr => arr.join('=')).join('&');
}

/*
function queryStringify(data: StringIndexed): string | never {

  if (typeof data !== "object") {
      throw new Error("input must be an object");
  }
  let k = Object.keys(data);
  let result= k.reduce((acc, i, index ) => {
    let v:any = data[i];
    const tail = index < k.length - 1 ? "&" : "";

    if (v instanceof Array) {
      let arr = v.reduce((res,ind,val) => ({
        ...res,[`${i}[${val}]`]: `${ind}`
      }),{});
      return `${acc}${queryStringify(arr)}${tail}`;
    }

    if (v instanceof Object) {
      let obj = Object.keys(v)
      .reduce((res,t) => (
        {...res,[`${i}[${t}]`]: v[t]}
      ),{});
      return `${acc}${queryStringify(obj)}${tail}`;
    }

    return `${acc}${i}=${v}${tail}`;
  },"");

  return result;
}

*/



export function cloneDeep<T extends object = object>(obj: T) {
    return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
        // Handle:
        // * null
        // * undefined
        // * boolean
        // * number
        // * string
        // * symbol
        // * function
        if (item === null || typeof item !== "object") {
            return item;
        }

        // Handle:
        // * Date
        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        // Handle:
        // * Array
        if (item instanceof Array) {
            let copy: any[] = [];

            item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

            return copy;
        }

        // Handle:
        // * Set
        if (item instanceof Set) {
            let copy = new Set();

            item.forEach(v => copy.add(_cloneDeep(v)));

            return copy;
        }

        // Handle:
        // * Map
        if (item instanceof Map) {
            let copy = new Map();

            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        // Handle:
        // * Object
        if (item instanceof Object) {
            let copy: { [key: string]: any } = {};

            // Handle:
            // * Object.symbol
            Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep(item[s])));

            // Handle:
            // * Object.name (other)
            Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));

            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}

export function deepCopy<T>(target: T): T {
    if (target === null) {
        return target
    }
    if (target instanceof Date) {
        return new Date(target.getTime()) as any
    }
    // First part is for array and second part is for Realm.Collection
    // if (target instanceof Array || typeof (target as any).type === 'string') {
    if (typeof target === 'object') {
        if (typeof (target as { [key: string]: any })[(Symbol as any).iterator] === 'function') {
            const cp = [] as any[]
            if ((target as any as any[]).length > 0) {
                for (const arrayMember of target as any as any[]) {
                    cp.push(deepCopy(arrayMember))
                }
            }
            return cp as any as T
        } else {
            const targetKeys = Object.keys(target)
            const cp = {} as { [key: string]: any };
            if (targetKeys.length > 0) {
                for (const key of targetKeys) {
                    cp[key] = deepCopy((target as { [key: string]: any })[key])
                }
            }
            return cp as T
        }
    }
    // Means that object is atomic
    return target
}
