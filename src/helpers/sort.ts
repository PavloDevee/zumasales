import { Inspection } from "@/providers/types";

export const sortByDate = (data: Inspection[], count: boolean) => {
    return data.sort((a, b) => {
        if (count) {
            return a.createdAt - b.createdAt;
        } else {
            return b.createdAt - a.createdAt;
        }
    });
};