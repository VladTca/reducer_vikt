module.exports = {
    preset: 'jest-puppeteer',
    testEnvironment: 'jest-environment-jsdom', // Убедитесь, что окружение указано
    setupFilesAfterEnv: ['jest-environment-puppeteer'],
    testRegex: './*\\.test\\.js$', // Исправленный шаблон для тестов

    // Дополнительные настройки
    // globals: {
    //     'ts-jest': {
    //         tsconfig: 'tsconfig.test.json',
    //     },
    // },
    // transform: {
    //     '^.+\\.jsx?$': 'babel-jest', // Если вы используете Babel
    // },
};
