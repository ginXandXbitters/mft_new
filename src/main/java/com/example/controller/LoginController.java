package com.example.controller;

import com.example.mapper.LoginMapper;
import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {

    @Autowired
    LoginMapper loginMapper;

    @RequestMapping("/login.html")
    public String queryUsername(){

        return "login";
    }

    @RequestMapping("/administrator.html")
    public String admin_login(HttpServletRequest request){
        String admin_pwd;
        String receive_pwd;



        admin_pwd = loginMapper.compare_adminPWD(request.getParameter("manager_id"));
        receive_pwd=request.getParameter("manager_password");

        if(admin_pwd.equals(receive_pwd)){
            return "administrator";
        }
        else{
            return "login";
        }
    }

    @RequestMapping("/index_user.html")
    public String user_login(HttpServletRequest request){
        String user_pwd;
        String receive_pwd;

        user_pwd = loginMapper.compare_userPWD(request.getParameter("user_id"));
        receive_pwd=request.getParameter("user_pwd");

        if(user_pwd.equals(receive_pwd)){
            return "index_user";
        }
        else{
            return "login";
        }
    }

    @RequestMapping("/seller_homepage.html")
    public String store_login(HttpServletRequest request){
        String store_pwd;
        String receive_pwd;

        store_pwd = loginMapper.compare_sellerPWD(request.getParameter("store_id"));
        receive_pwd=request.getParameter("store_pwd");

        if(store_pwd.equals(receive_pwd)){
            return "seller_homepage";
        }
        else{
            return "login";
        }
    }

    @RequestMapping("/supplier.html")
    public String supplier_login(HttpServletRequest request){
        String supplier_pwd;
        String receive_pwd;

        supplier_pwd = loginMapper.compare_supplierPWD(request.getParameter("supplier_id"));
        receive_pwd=request.getParameter("supplier_pwd");

        if(supplier_pwd.equals(receive_pwd)){
            return "supplier";
        }
        else{

            return "login";
        }
    }



}
