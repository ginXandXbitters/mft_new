package com.example.domain;

public class Suppliers {
    private String supplierID;
    private String supplierName;
    private String storeID;

    public String getSupplierID() {
        return supplierID;
    }

    public void setSupplierID(String supplierID) {
        this.supplierID = supplierID;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getStoreID() {
        return storeID;
    }

    public void setStoreID(String storeID) {
        this.storeID = storeID;
    }

    @Override
    public String toString() {
        return "Suppliers{" +
                "supplierID='" + supplierID + '\'' +
                ", supplierName='" + supplierName + '\'' +
                ", storeID='" + storeID + '\'' +
                '}';
    }
}
