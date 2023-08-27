export const ACCESS_TOKEN = 'access_token';
export const USER = 'user';
export const ROLE = {
    R1: { value: 1, defaultPath: '/admin' },
    R2: { value: 2, defaultPath: '/doctor' },
    R3: { value: 3, defaultPath: '/' },
};
export const arrRole = [{ ...ROLE.R1 }, { ...ROLE.R2 }, { ...ROLE.R3 }];
