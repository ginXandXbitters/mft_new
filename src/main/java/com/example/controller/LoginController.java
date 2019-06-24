package com.example.controller;

import com.example.domain.Admin;
import com.example.mapper.LoginMapper;
import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class LoginController {

    @Autowired
    LoginMapper loginMapper;

    @RequestMapping("/login.html")
    public String login_page(){

        return "login";
    }

    @RequestMapping("/administrator.html")
    public String admin_login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String admin_pwd;
        String receive_pwd;
        PrintWriter printWriter = response.getWriter();

        //判断账号是否存在
        if(loginMapper.ifexist_admin(request.getParameter("manager_id"))!=null){
            admin_pwd = loginMapper.compare_adminPWD(request.getParameter("manager_id"));
            receive_pwd = request.getParameter("manager_password");


            if(admin_pwd.equals(receive_pwd)){
                return "administrator";
            }
            else{
                printWriter.print("<script language=\"javascript\">alert('Account doesn't exist!');</script>");
                return null;
            }
        }
        else{
            printWriter.print("<script language=\"javascript\">alert('Account doesn't exist!');</script>");
            return null;
        }
    }

    @RequestMapping("/index_user.html")
    public String user_login(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String user_pwd;
        String receive_pwd;
        PrintWriter printWriter = response.getWriter();

        //判断账号是否存在
        if(loginMapper.ifexist_user(request.getParameter("user_id"))!=null){
            user_pwd = loginMapper.compare_userPWD(request.getParameter("user_id"));
            receive_pwd=request.getParameter("user_pwd");

            if(user_pwd.equals(receive_pwd)){
                return "index_user";
            }
            else{
                printWriter.print("<script language=\"javascript\">alert('Account doesn't exist!');</script>");
                return null;
            }
        }
        else{
            printWriter.print("<script language=\"javascript\">alert('Account doesn't exist!');</script>");
            return null;
        }

    }

    @RequestMapping("/seller_homepage.html")
    public String store_login(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String store_pwd;
        String receive_pwd;
        PrintWriter printWriter = response.getWriter();

        //判断账号是否存在
        if(loginMapper.ifexist_store(request.getParameter("store_id"))!=null){
            store_pwd = loginMapper.compare_sellerPWD(request.getParameter("store_id"));
            receive_pwd=request.getParameter("store_pwd");

            if(store_pwd.equals(receive_pwd)){
                return "seller_homepage";
            }
            else{
                printWriter.print("<script language=\"javascript\">alert('Account doesn't exist!');</script>");
                return null;
            }
        }
        else{
            printWriter.print("<script language=\"javascript\">alert('Account doesn't exist!');</script>");
            return null;
        }

    }

    @RequestMapping("/supplier.html")
    public String supplier_login(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String supplier_pwd;
        String receive_pwd;
        PrintWriter printWriter = response.getWriter();

        //判断账号是否存在
        if(loginMapper.ifexist_supplier(request.getParameter("supplier_id"))!=null){
            supplier_pwd = loginMapper.compare_supplierPWD(request.getParameter("supplier_id"));
            receive_pwd=request.getParameter("supplier_pwd");

            if(supplier_pwd.equals(receive_pwd)){
                return "supplier";
            }
            else{
                printWriter.print("<script language=\"javascript\">alert('Account doesn't exist!');</script>");
                return null;
            }
        }
        else{
            printWriter.print("<script language=\"javascript\">alert('Account doesn't exist!');</script>");
            return null;
        }
    }



}
