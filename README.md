# Единое окно предприятия

[![Quality Gate](http://sonar.silverbulleters.org/api/badges/gate?key=enterprise-singleapp)](http://sonar.silverbulleters.org/component_measures/?id=enterprise-singleapp)

Основанное на Electron IDE позволяющее организовать рабочее место современного сотрудника предприятия

## Функционал

* единое окно
* иконка в трее
* всплывающие сообщения
* sip телефония

## Сборка и отладочный запуск

требует установленного Node.JS

```
npm install -g typescript
npm install
npm start
```

## Коллективная разработка

* как обычно `git-flow` и всё что с ним связано
* порядок разработки `feature` - `steps` (cucumber-js) - `npm run features` - `git commit`

внезапно - для проверки поведения используем `cucumber-js` и `cucumber-electron`

## Используемые технологии при разработке

* node.JS
* Electron IDE
* typescript
* visual studio code

а также

* istanbul
* codecov
* electron-cucumber

```
npm install -g istanbul
npm install -g codecov
npm install --save-dev electron-cucumber
```

## Поддержка 1С

* приложение использует штатное расширение для Chrome браузера по работе с оборудованием скачиваемое с официального открытого источника по ID

особенности алгоритма установки расширения

* скачивается официальное расширение
* загружается в контекст приложения
* выгружается из контекста приложения
* в манифесте приложения 1С заменяется ссылочный тип `MSG_APP_NAME` на настоящий `ID`
* повторно загружается в память
* после этого работает расширение от 1С для работы с криптографией, файлами и устройствами через драйвера `NativeAPI`
