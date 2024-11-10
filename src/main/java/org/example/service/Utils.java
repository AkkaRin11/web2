package org.example.service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Utils {
    public static Map<String, String> fromBody(String body){
        Map<String, String> resultMap = new HashMap<>();

        String regex = "Content-Disposition:\\s*form-data;\\s*name=\"([^\"]+)\"\\s*\\R\\s*([\\d\\w.,-]+)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(body);

        while (matcher.find()) {
            String name = matcher.group(1);
            String value = matcher.group(2);
            resultMap.put(name, value);
        }

        return resultMap;
    }
}
