export const endpoint = {
    getUserInspection: (userId: string, inspectionId: string) => `/users/${userId}/inspections/${inspectionId}`,
    getAllUserInspections: (userId: string) => `/users/${userId}/inspections`,
    getUser: (userId: string) => `users/${userId}`,
    getAllUsers: `users`
}