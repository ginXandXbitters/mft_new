package com.example.controller;

import com.example.domain.Admin;
import com.example.domain.Sellpage;
import com.example.mapper.LoginMapper;
import com.example.mapper.StoreMapper;
import com.example.mapper.SupplierMapper;
import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import org.springframework.ui.Model;

@Controller
public class LoginController {
    static  String get_user_id;

    @Autowired
    LoginMapper loginMapper;

    @Autowired
    SupplierMapper supplierMapper;

    @Autowired
    StoreMapper storeMapper;

    @RequestMapping("/login.html")
    public String login_page(){

        return "login";
    }

    @RequestMapping("/admin_login.html")
    public String admin_login(HttpServletRequest request, Model model) throws IOException {
        String admin_pwd;
        String receive_pwd;


        //判断账号是否存在
        if(loginMapper.ifexist_admin(request.getParameter("manager_id"))!=null){
            admin_pwd = loginMapper.compare_adminPWD(request.getParameter("manager_id"));
            receive_pwd = request.getParameter("manager_password");


            if(admin_pwd.equals(receive_pwd)){
                return "administrator";
            }
            else{

                model.addAttribute("admin_pwd","密码不正确！请重新输入");
                return "login";
            }
        }
        else{

            model.addAttribute("admin_id","账号不存在！请重新输入");
            return "login";
        }
    }

    @RequestMapping("/index_user.html")
    public String user_login(HttpServletRequest request, Model model) throws IOException{
        String user_pwd;
        String receive_pwd;


        //判断账号是否存在
        if(loginMapper.ifexist_user(request.getParameter("user_id"))!=null){
            user_pwd = loginMapper.compare_userPWD(request.getParameter("user_id"));
            receive_pwd=request.getParameter("user_pwd");

            if(user_pwd.equals(receive_pwd)){
                get_user_id=request.getParameter("user_id");
                model.addAttribute("uid",request.getParameter("user_id"));

                return "index_user";
            }
            else{
                model.addAttribute("user_pwd","密码不正确！请重新输入");
                return "login";
            }
        }
        else{
            model.addAttribute("user_id","账号不存在！请重新输入");
            return "login";
        }

    }

    @RequestMapping("/seller_homepage.html")
    public String store_login(HttpServletRequest request, Model model) throws IOException{
        String store_pwd;
        String receive_pwd;


        //判断账号是否存在
        if(loginMapper.ifexist_store(request.getParameter("store_id"))!=null){
            store_pwd = loginMapper.compare_sellerPWD(request.getParameter("store_id"));
            receive_pwd=request.getParameter("store_pwd");

            if(store_pwd.equals(receive_pwd)){
                List<Sellpage> sp=storeMapper.StorepageList();
                model.addAttribute("sp",sp);
                return "seller_homepage";
            }
            else{
                model.addAttribute("seller_pwd","密码不正确！请重新输入");
                return "login";
            }
        }
        else{
            model.addAttribute("seller_id","账号不存在！请重新输入");
            return "login";
        }

    }

    @RequestMapping("/supplier.html")
    public String supplier_login(HttpServletRequest request, Model model) throws IOException{
        String supplier_pwd;
        String receive_pwd;

        //判断账号是否存在
        if(loginMapper.ifexist_supplier(request.getParameter("supplier_id"))!=null){
            supplier_pwd = loginMapper.compare_supplierPWD(request.getParameter("supplier_id"));
            receive_pwd=request.getParameter("supplier_pwd");

            if(supplier_pwd.equals(receive_pwd)){
                int quantity1=supplierMapper.queryQuantity("g10");
                int quantity2=supplierMapper.queryQuantity("g11");
            model.addAttribute("quantity1", quantity1);
                model.addAttribute("quantity2", quantity2);
                return "supplier";
            }
            else{
                model.addAttribute("sup_pwd","密码不正确！请重新输入");
                return "login";
            }
        }
        else{
            model.addAttribute("sup_id","账号不存在！请重新输入");
            return "login";
        }
    }



}
