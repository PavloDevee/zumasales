export const userField = (user:any) => {
    const userData = {
        displayName: user.displayName || 'Guest',
        email: user.email,
        uid: user.uid
    };
   return userData
}
