package com.example.domain;

public class Suppliers {
    private String supplierID;
    private String supplierPW;
    private String supplierName;
    private String storeID;
    private int status;

    public String getSupplierID() {
        return supplierID;
    }

    public void setSupplierID(String supplierID) {
        this.supplierID = supplierID;
    }

    public String getSupplierPW() {
        return supplierPW;
    }

    public void setSupplierPW(String supplierPW) {
        this.supplierPW = supplierPW;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Suppliers{" +
                "supplierID='" + supplierID + '\'' +
                ", supplierPW='" + supplierPW + '\'' +
                ", supplierName='" + supplierName + '\'' +
                ", storeID='" + storeID + '\'' +
                ", status=" + status +
                '}';
    }
}
