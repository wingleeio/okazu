export type Result<TValue, TError> = TValue | TError;

export const define = <TParameters extends any[], TResponse>(fn: (...args: TParameters) => TResponse) => {
    type TValue = TResponse extends Error ? never : TResponse;
    type TError = TResponse extends Error ? TResponse : never;

    return (...args: TParameters): Result<TValue, TError> => fn(...args) as unknown as any;
};

export const defineAsync = <TParameters extends any[], TResponse>(fn: (...args: TParameters) => Promise<TResponse>) => {
    type TValue = TResponse extends Error ? never : TResponse;
    type TError = TResponse extends Error ? TResponse : never;

    return (...args: TParameters): Promise<Result<TValue, TError>> => fn(...args) as unknown as any;
};

export function TaggedError<T extends string>(tag: T) {
    return class extends Error {
        readonly tag: T = tag;

        constructor(message?: string) {
            super(message);
        }
    };
}
