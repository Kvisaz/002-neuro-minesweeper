# MineSweeper на нейронке

## 21 марта 2023 года

Опыт с минером продолжается. ChatGPT не может генерировать большой кусок кода, спотыкается.

На отдельных функция постоянно возникает мелкое изменение артефактов и моделей.

Возможно, следует попробовать путь
- список интерфейсов - вместе с их кодом
- список функций - без кода
- список компонентов - без кода

Далее идти по функциям и просить сгенерировать 1 функцию
при этом давая ей используемые интерфейсы

Далее можно погрузиться в компоненты

## Промпты

### План работ

```text
 Lets think step by step and plan main component for MineSweeper game  with all  game logic in React/TypeScript .

Think like high quality React TypeScript senior from Facebook. 
- list TypeScript interfaces name and write its code
- list all functions name for logic, dont write its code
- list other components game, dont write its code
```

### Функция
```text
Write TypeScript code for FUNCTION with interfaces:

- COPY PASTE USED INTERFACE
- COPY PASTE USED INTERFACE

```

### Компонент
```text
Write code and only code for component NAME
Dont explain it at all.
 
Think like high quality React TypeScript senior from Facebook.
- write compact minimalistic, but readable TypeScript code
- use export const for component without return type description
- dont use 'import React'
- use <> instead React.Fragments
- use CSS module file and 'import styles' from './[COMPONENT_NAME]module.css'
- if component need a lot of code - split it, imagine functions/components names and use them in code, make short name list for these parts after code

```

### CSS module
```text
Write code for CSS module NAME
Dont explain it at all.

Think like high quality React TypeScript senior from Facebook. 
- write compact minimalistic CSS rules
```
