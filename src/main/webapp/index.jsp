<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Подворный Артём Михайлович</title>
    <link href="index.css" rel="stylesheet">
</head>
<body>
<header>
    <div>Подворный Артём Михайлович</div>
    <div>Группа: P3213 Вариант: 655</div>
</header>

<div class="left">
    <label>X:</label><br>
    <input class="checkbox" type="checkbox" name="x-value" value="-2"> -2<br>
    <input class="checkbox" type="checkbox" name="x-value" value="-1.5"> -1.5<br>
    <input class="checkbox" type="checkbox" name="x-value" value="-1"> -1<br>
    <input class="checkbox" type="checkbox" name="x-value" value="-0.5"> -0.5<br>
    <input class="checkbox" type="checkbox" name="x-value" value="0"> 0<br>
    <input class="checkbox" type="checkbox" name="x-value" value="0.5"> 0.5<br>
    <input class="checkbox" type="checkbox" name="x-value" value="1"> 1<br>
    <input class="checkbox" type="checkbox" name="x-value" value="1.5"> 1.5<br>
    <input class="checkbox" type="checkbox" name="x-value" value="2"> 2<br><br>

    <label for="y-value">Y:</label>
    <input type="text" id="y-value" name="y-value" placeholder="Введите Y от -3 до 3"><br><br>

    <label>R:</label><br>
    <input class="radio" type="radio" name="r-value" value="1"> 1<br>
    <input class="radio" type="radio" name="r-value" value="1.5"> 1.5<br>
    <input class="radio" type="radio" name="r-value" value="2"> 2<br>
    <input class="radio" type="radio" name="r-value" value="2.5"> 2.5<br>
    <input class="radio" type="radio" name="r-value" value="3"> 3<br><br>

    <button type="submit" onclick="getCheckedCheckBoxes()" id="checkButton">Отправить</button>
</div>

<div class="center">
    <canvas id="graphCanvas" width="400" height="400"></canvas>
</div>

<div class="right">
    <h3>Ответы сервера:</h3>
    <div id="dynamicContent"></div>
</div>

<script src="index.js"></script>

</body>
</html>

