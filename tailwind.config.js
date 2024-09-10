/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: '#9B9B7A',
            accent: '#BAA587',
            background: '#797D62',
            surface: '#FAEDCD',
            text: '#FFCB69',
            disabled: '#BDBDBD',
            placeholder: '#9E9E9E',
            backdrop: '#607D8B',
            onSurface: '#000000',
            error: '#D32F2F',
            warning: '#FFA000',
            success: '#4CAF50',
            info: '#1976D2',
            secondary: '#FFC107',
            secondaryText: '#757575',
            lightBackground: '#F5F5F5',
            darkText: '#212121',
            lightText: '#FFFFFF',
            lightEcoBackground: '#e0f2f1',
        },
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
