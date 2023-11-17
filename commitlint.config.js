// build: Изменения, которые влияют на систему сборки или внешние зависимости (например, gulp, broccoli, npm)
// ci: Изменения в файлах и скриптах нашей системы непрерывной интеграции
// docs: Изменения только в документации
// feat: Новая функция
// fix: Исправление ошибки
// perf: Изменение кода, улучшающее производительность
// refactor: Изменение кода, которое не исправляет ошибку и не добавляет функциональности
// style: Изменения, которые не влияют на смысл кода (пробелы, форматирование, пропущенные точки с запятой и т.д.)
// test: Добавление недостающих тестов или исправление существующих тестов

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};
