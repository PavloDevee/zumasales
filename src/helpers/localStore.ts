import { User } from "@/providers/types";

export function saveUserToLocalStorage(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUserToLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) return JSON.parse(userData);
    else return null;
}

export function removeUserToLocalStorage() {
    localStorage.removeItem('user');
}