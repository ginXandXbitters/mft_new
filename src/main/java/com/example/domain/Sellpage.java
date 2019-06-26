package com.example.domain;

public class Sellpage {
    private String sell_name;
    private int sell_price;
    private String sell_sup;
    private String sell_img;

    public String getSell_name() {
        return sell_name;
    }

    public void setSell_name(String sell_name) {
        this.sell_name = sell_name;
    }

    public int getSell_price() {
        return sell_price;
    }

    public void setSell_price(int sell_price) {
        this.sell_price = sell_price;
    }

    public String getSell_sup() {
        return sell_sup;
    }

    public void setSell_sup(String sell_sup) {
        this.sell_sup = sell_sup;
    }

    public String getSell_img() {
        return sell_img;
    }

    public void setSell_img(String sell_img) {
        this.sell_img = sell_img;
    }

    @Override
    public String toString() {
        return "Sellpage{" +
                "sell_name='" + sell_name + '\'' +
                ", sell_price=" + sell_price +
                ", sell_sup='" + sell_sup + '\'' +
                ", sell_img='" + sell_img + '\'' +
                '}';
    }
}
