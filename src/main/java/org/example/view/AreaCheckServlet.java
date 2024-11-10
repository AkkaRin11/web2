package org.example.view;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

import static org.example.service.Utils.fromBody;
import static org.example.service.Validation.*;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        long timeStart = System.currentTimeMillis();

        byte[] requestBodyRaw = request.getInputStream().readAllBytes();
        String rawBody = new String(requestBodyRaw, StandardCharsets.UTF_8);
        Map<String, String> body = fromBody(rawBody);


        if (!body.containsKey("x") || !body.containsKey("y") || !body.containsKey("r")){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        String x = body.get("x").replace(",", ".");
        String y = body.get("y").replace(",", ".");
        String r = body.get("r").replace(",", ".");

        if(!(checkValidNumber(x) && checkValidNumber(y) && checkValidNumber(r))) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

//        if (!checkValid(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r))) {
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            return;
//        }

        response.setStatus(HttpServletResponse.SC_OK);

        if (session.getAttribute("table") != null){
            ArrayList<ArrayList<String>> table = (ArrayList<ArrayList<String>>) session.getAttribute("table");
            table.add(new ArrayList<>());
            table.get(table.size()-1).add(String.valueOf(isHit(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r))));
            table.get(table.size()-1).add(x);
            table.get(table.size()-1).add(y);
            table.get(table.size()-1).add(r);
            table.get(table.size()-1).add(String.valueOf(System.currentTimeMillis() - timeStart));
            table.get(table.size()-1).add(String.valueOf(LocalDateTime.now()));

            while (table.size() > 9){
                table.remove(1);
            }

        } else {
            ArrayList<ArrayList<String>> table = new ArrayList<>();
            table.add(new ArrayList<>());
            table.get(0).add(String.valueOf(isHit(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r))));
            table.get(0).add(x);
            table.get(0).add(y);
            table.get(0).add(r);
            table.get(0).add(String.valueOf(System.currentTimeMillis() - timeStart));
            table.get(0).add(String.valueOf(LocalDateTime.now()));

            session.setAttribute("table", table);
        }

        StringWriter stringWriter = new StringWriter();
        RequestDispatcher dispatcher = request.getRequestDispatcher("/result.jsp");
        dispatcher.include(request, response);
        String renderedJSP = stringWriter.toString();
        response.getWriter().write(renderedJSP);
    }
}