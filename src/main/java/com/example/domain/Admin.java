package com.example.domain;

public class Admin {
    private String adminID;
    private String adminPW;
    private String adminName;
    private String adminTel;

    public void setAdminTel(String adminTel) {
        this.adminTel = adminTel;
    }

    public String getAdminTel() {
        return adminTel;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminPW(String adminPW) {
        this.adminPW = adminPW;
    }

    public String getAdminPW() {
        return adminPW;
    }

    public void setAdminID(String adminID) {
        this.adminID = adminID;
    }

    public String getAdminID() {
        return adminID;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "adminID='" + adminID + '\'' +
                ", adminPW='" + adminPW + '\'' +
                ", adminName='" + adminName + '\'' +
                ", adminTel='" + adminTel + '\'' +
                '}';
    }
}
