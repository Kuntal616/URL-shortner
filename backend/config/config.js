export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax', 
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: '/', // Ensure cookie is available for all paths
    domain: undefined // Don't set domain for localhost
};