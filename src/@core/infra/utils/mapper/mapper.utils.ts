import { RecursivePartial } from "../../../domain/type/recursive-partial.type";

export const setAttributes = <T, U>(source: U, target: T = {} as T): RecursivePartial<T> => {
    Object.keys(source).forEach(key => {
        const sourceValue = source[key];
        if (typeof sourceValue === 'object' && sourceValue !== null) {
            (target as any)[key] = setAttributes(sourceValue);
        } else {
            (target as any)[key] = sourceValue;
        }
    });

    return target as RecursivePartial<T>;
}


export const toDomain = <T, U extends T>(entity: T | null): RecursivePartial<U> | null => {
    if (!entity) return null;
    return { ...entity } as RecursivePartial<U>;
}

export const toEntity = <T, U extends T>(domain: RecursivePartial<U> | null): RecursivePartial<T> | null => {
    if (!domain) return null;
    return { ...domain } as RecursivePartial<T>;
}

export const fromDto = <T, U>(source: T): RecursivePartial<U> => {
    return setAttributes(source);
}

export const fromDtoList = <T, U>(dtoList: T[]): RecursivePartial<U>[] => {
    return dtoList.map((dto) => fromDto(dto));
}

export const toDomainList = <T, U extends T>(entityList: T[]): RecursivePartial<U>[] => {
    return entityList.map(entity => toDomain<T, U>(entity));
}

export const toEntityList = <T, U extends T>(domainList: RecursivePartial<U>[]): RecursivePartial<T>[] => {
    return domainList.map(domain => toEntity<T, U>(domain));
}

export const omitUserPassword = <T extends { password: string }>(user: T): Omit<T, 'password'> => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};