# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Инструкция к тестированию: 

1. Импортируйте функцию calculatePoints из компонента Canvas.

2. Определите два прямоугольника (rect1 и rect2) с заданными позициями и размерами.

3. В первом тесте (it):
   - Установите начальные и конечные точки (cPoint1 и cPoint2).
   - Определите ожидаемые точки пути (expectedPoints).
   - Проверьте, что результат вызова calculatePoints с этими прямоугольниками и точками совпадает с ожидаемым результатом.
   
4. Во втором тесте:
   - Установите неподходящие точки подключения (cPoint1 и cPoint2).
   - Убедитесь, что функция выбрасывает ошибку, если точки подключения не находятся на границе прямоугольника.