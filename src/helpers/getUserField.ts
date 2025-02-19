export const userField = (user:any) => {
    const userData = {
        displayName: user.displayName || 'Guest',
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        uid: user.uid
    };
   return userData
}
