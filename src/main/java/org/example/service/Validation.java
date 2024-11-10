package org.example.service;

public class Validation {
    public static boolean isHit(double x, double y, double r){

        if (x <= 0 && y >= 0 && Math.abs(x) <= r && y <= r){
            return true;
        }

        if (x >= 0 && y >= 0 && x + y <= r/2){
            return true;
        }

        if (x <= 0 && y <= 0 && x*x + y*y <= r*r){
            return true;
        }

        return false;

    }

    public static boolean checkValidNumber(String str) {
        return str.matches("^[-+]?[0-9]*[.][0-9]+$") || str.matches("^[-+]?[0-9]+$");
    }

    public static boolean checkValid(double x, double y, double r) {
        if (y > 3 || y < -3) {
            return false;
        }

        boolean flagX = false;
        for (double i = -2; i <= 2; i+=0.5){
            if (i == x){
                flagX = true;
            }
        }

        if (!flagX){
            return false;
        }

        boolean flagR = false;
        for (double i = 1; i <= 3; i+=0.5){
            if (i == r){
                flagR = true;
            }
        }

        return flagR;
    }
}
