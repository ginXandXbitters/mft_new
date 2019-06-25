package com.example.domain;

public class Store {
    private String storeID;
    private String storePW;
    private String storeName;
    private String supplierID;
    private int status;

    public String getStoreID() {
        return storeID;
    }

    public void setStoreID(String storeID) {
        this.storeID = storeID;
    }

    public String getStorePW() {
        return storePW;
    }

    public void setStorePW(String storePW) {
        this.storePW = storePW;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getSupplierID() {
        return supplierID;
    }

    public void setSupplierID(String supplierID) {
        this.supplierID = supplierID;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Store{" +
                "storeID='" + storeID + '\'' +
                ", storePW='" + storePW + '\'' +
                ", storeName='" + storeName + '\'' +
                ", supplierID='" + supplierID + '\'' +
                ", status=" + status +
                '}';
    }
}
