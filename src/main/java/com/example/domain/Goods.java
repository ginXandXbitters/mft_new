package com.example.domain;

public class Goods {
    private String goodID;
    private String goodName;
    private int goodprice;
    private String storeID;
    private String goodImage;
    private int discount;
    private String score;
    private String color;
    private String brand;
    private String goodDescribe;
    private String remark;
    private String goodlabel;

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

    public String getGoodImage() {
        return goodImage;
    }

    public void setGoodImage(String goodImage) {
        this.goodImage = goodImage;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getGoodDescribe() {
        return goodDescribe;
    }

    public void setGoodDescribe(String goodDescribe) {
        this.goodDescribe = goodDescribe;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getGoodlabel() {
        return goodlabel;
    }

    public void setGoodlabel(String goodlabel) {
        this.goodlabel = goodlabel;
    }

    @Override
    public String toString() {
        return "Goods{" +
                "goodID='" + goodID + '\'' +
                ", goodName='" + goodName + '\'' +
                ", goodprice=" + goodprice +
                ", storeID='" + storeID + '\'' +
                ", goodImage='" + goodImage + '\'' +
                ", discount=" + discount +
                ", score='" + score + '\'' +
                ", color='" + color + '\'' +
                ", brand='" + brand + '\'' +
                ", goodDescribe='" + goodDescribe + '\'' +
                ", remark='" + remark + '\'' +
                ", goodlabel='" + goodlabel + '\'' +
                '}';
    }
}
