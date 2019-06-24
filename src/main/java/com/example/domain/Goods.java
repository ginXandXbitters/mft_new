package com.example.domain;

public class Goods {
    private String goodID;
    private String goodName;
    private int goodprice;
    private String storeID;

    public String getGoodID() {
        return goodID;
    }

    public void setGoodID(String goodID) {
        this.goodID = goodID;
    }

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
    }

    public int getGoodprice() {
        return goodprice;
    }

    public void setGoodprice(int goodprice) {
        this.goodprice = goodprice;
    }

    public String getStoreID() {
        return storeID;
    }

    public void setStoreID(String storeID) {
        this.storeID = storeID;
    }

    @Override
    public String toString() {
        return "Goods{" +
                "goodID='" + goodID + '\'' +
                ", goodName='" + goodName + '\'' +
                ", goodprice=" + goodprice +
                ", storeID='" + storeID + '\'' +
                '}';
    }
}
