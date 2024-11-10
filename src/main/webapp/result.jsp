<%@ page import="java.util.List" %><%-- Получаем таблицу из сессии --%>
<%
    List<List<String>> table = (List<List<String>>) session.getAttribute("table");
    if (table != null && !table.isEmpty()) {
%>

<table id="resultTable">
    <tr>
        <th>Результат</th>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Время работы</th>
        <th>Время</th>
    </tr>

    <%-- Перебор строк таблицы --%>
    <%
        for (List<String> row : table) {
    %>
    <tr>
        <%-- Перебор ячеек строки --%>
        <%
            for (String cell : row) {
        %>
        <td><%= cell %></td>
        <%
            }
        %>
    </tr>
    <%
        }
    %>
</table>
<%
} else {
%>
<p>No data available</p>
<%
    }
%>