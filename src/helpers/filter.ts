import { Inspection, User } from "@/providers/types";

export const search = (data: Inspection[], newName: string) => {
    return data.filter((item: Inspection) =>
        item.email?.includes(newName) ||
        item.vendorEmail.includes(newName) ||
        item.createdAt.toString().includes(newName) ||
        item.status.toString().includes(newName)
    );
};

export const searchUser = (data: User[], newName: string) => {
    return data.filter((item: User) =>
        item.email?.includes(newName) ||
        item.displayName.includes(newName) ||
        item.role?.toString().includes(newName)
    );
};