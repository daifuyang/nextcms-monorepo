// interfaces.ts
export interface Role {
    id?: number;
    name: string;
    description?: string;
    sort?: number;
    status?: 0 | 1; // 0:禁用 1:启用
}
