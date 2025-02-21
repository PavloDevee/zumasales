import { Inspection } from "@/providers/types";

export const search = (data: Inspection[], newName: string) => {
    return data.filter((item: Inspection) =>
        item.email?.includes(newName) ||
        item.vendorEmail.includes(newName) ||
        item.createdAt.toString().includes(newName) ||
        item.status.toString().includes(newName)
    );
};