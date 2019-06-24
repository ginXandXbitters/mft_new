package com.example.domain;

public class Store {
    private String storeID;
    private String storeName;
    private String supplierID;

    public String getStoreID() {
        return storeID;
    }

    public void setStoreID(String storeID) {
        this.storeID = storeID;
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

    @Override
    public String toString() {
        return "Store{" +
                "storeID='" + storeID + '\'' +
                ", storeName='" + storeName + '\'' +
                ", supplierID='" + supplierID + '\'' +
                '}';
    }
}
