import { ref, set } from "firebase/database";
import { database } from "@/firebase/firebase";
import { endpoint } from "./endpoint";

export const writeUser = (userId: string, name: string, email: string, role: string = 'user') => {
    const userRef = ref(database, endpoint.getUser(userId));
    set(userRef, {
        displayName: name,
        email: email,
        role: role
    });
};