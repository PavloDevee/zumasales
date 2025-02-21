import { Inspection, User } from "./types";

export const objModifyAll = (obj: User[]) => {
    const inspection = [];
    for (const key in obj) {
        obj[key].uid = key;
        if (obj[key].inspections) {
            for (const keyIns in obj[key].inspections) {
                obj[key].inspections[keyIns].id = keyIns;
                obj[key].inspections[keyIns].uid = key;
                obj[key].inspections[keyIns].email = obj[key].email
            }
            obj && inspection.push(...Object.values(obj[key].inspections)); //check
        }
    }
    return inspection;
}

export const objModify = (obj: Inspection[]) => {
    for (const key in obj) {
        obj[key].uid = key;
    }
    return Object.values(obj);
}