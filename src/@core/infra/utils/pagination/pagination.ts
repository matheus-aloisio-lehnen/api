import { PaginationFilter } from "../../../domain/dto/filter/paginationFilter";
import { SortOrder } from "../../../domain/enum/sort-order.enum";

export const createOrderQuery = (filter: PaginationFilter) => {
    const order: any = {};
    order[filter.orderBy ?? 'createdAt'] = filter.sortOrder ?? SortOrder.DESC;
    return order;
}

export const paginate = (filter: PaginationFilter) => {
    return {
        order: createOrderQuery(filter),
        skip: (filter.page - 1) * (filter.pageSize + 1),
        take: filter.pageSize,
        where: filter.where,
        withDeleted: filter.withDeleted,
    }
}