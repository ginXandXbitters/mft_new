package com.example.domain;

public class Orderin {
    private String orderID;
    private String userID;
    private String goodID;
    private String quantity;
    private String buytime;
    private int status;

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getGoodID() {
        return goodID;
    }

    public void setGoodID(String goodID) {
        this.goodID = goodID;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getBuytime() {
        return buytime;
    }

    public void setBuytime(String buytime) {
        this.buytime = buytime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Orderin{" +
                "orderID='" + orderID + '\'' +
                ", userID='" + userID + '\'' +
                ", goodID='" + goodID + '\'' +
                ", quantity='" + quantity + '\'' +
                ", buytime='" + buytime + '\'' +
                ", status=" + status +
                '}';
    }
}
