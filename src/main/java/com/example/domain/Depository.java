package com.example.domain;

public class Depository {
    private String depositoryID;
    private String d_address;
    private String d_goodID;
    private int d_quantity;

    public String getDepositoryID() {
        return depositoryID;
    }

    public void setDepositoryID(String depositoryID) {
        this.depositoryID = depositoryID;
    }

    public String getD_address() {
        return d_address;
    }

    public void setD_address(String d_address) {
        this.d_address = d_address;
    }

    public String getD_goodID() {
        return d_goodID;
    }

    public void setD_goodID(String d_goodID) {
        this.d_goodID = d_goodID;
    }

    public int getD_quantity() {
        return d_quantity;
    }

    public void setD_quantity(int d_quantity) {
        this.d_quantity = d_quantity;
    }

    @Override
    public String toString() {
        return "Depository{" +
                "depositoryID='" + depositoryID + '\'' +
                ", d_address='" + d_address + '\'' +
                ", d_goodID='" + d_goodID + '\'' +
                ", d_quantity=" + d_quantity +
                '}';
    }
}
