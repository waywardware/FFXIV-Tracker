export interface PaginatedResult<T> {
    page: Paging;
    results: Array<T>
}

export interface Paging {
    current: number;
    total: number;
}