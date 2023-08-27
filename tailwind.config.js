/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {
            height: {
                header: 'var(--header-height)',
                banner: 'calc(100vh - var(--header-height))',
                sidebar: 'calc(100vh - 8px)',
                contain: 'calc(100vh - 60px)',
            },
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
            },
            margin: {
                header: 'var(--header-height) 0 0 0 ',
            },
            zIndex: {
                100: '100',
            },
        },
    },
    plugins: [],
};
