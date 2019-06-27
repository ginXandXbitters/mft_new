package com.example.domain;

public class Cart {
    private static final long serialVersionUID = 1L;
    private int id;
    private String uid;
    private String goodId;
    private String quantity;
    private String price;
    private String goodName;
    private String goodImage;
    private String brand;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getGoodId() {
        return goodId;
    }

    public void setGoodId(String goodId) {
        this.goodId = goodId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
    }

    public String getGoodImage() {
        return goodImage;
    }

    public void setGoodImage(String goodImage) {
        this.goodImage = goodImage;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", uid='" + uid + '\'' +
                ", goodId='" + goodId + '\'' +
                ", quantity='" + quantity + '\'' +
                ", price='" + price + '\'' +
                ", goodName='" + goodName + '\'' +
                ", goodImage='" + goodImage + '\'' +
                ", brand='" + brand + '\'' +
                '}';
    }
}
