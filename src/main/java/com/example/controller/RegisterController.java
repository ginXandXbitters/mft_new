package com.example.controller;

import com.example.domain.Store;
import com.example.domain.Suppliers;
import com.example.domain.User;
import com.example.mapper.RegisterMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class RegisterController {
@Autowired
public RegisterMapper registerMapper;
    @RequestMapping("/register.html")
  public String NavigateToRegister(){
     return "register";
    }

    @RequestMapping("/login_afterregister.html")
    public String userInsert(HttpServletRequest request){


        String userID=request.getParameter("telephone");
        String userPw=request.getParameter("password");
        String userName=request.getParameter("name");
        String userTel=request.getParameter("telephone");
        String userMail=request.getParameter("email");
        String province=request.getParameter("company");
        String city=request.getParameter("address_1");
        String county=request.getParameter("address_2");
        String site=request.getParameter("postcode");
        int status=0;

        User new_user=new User();
        new_user.setUserID(userID);               //用户注册所需信息
        new_user.setUserPw(userPw);
        new_user.setUserName(userName);
        new_user.setUserTel(userTel);
        new_user.setUserMail(userMail);
        new_user.setProvince(province);
        new_user.setCity(city);
        new_user.setCounty(county);
        new_user.setSite(site);
        new_user.setStatus(status);


        Store new_store=new Store();
        new_store.setStoreID(userID);               //商家注册所需信息
        new_store.setStorePW(userPw);
        new_store.setStoreName(userName);
        new_store.setSupplierID("sup02");
        new_store.setStatus(1);

        Suppliers new_supplier=new Suppliers();
        new_supplier .setSupplierID(userID);              //供货商注册所需信息
        new_supplier.setSupplierName(userName);
        new_supplier.setSupplierPW(userPw);
        new_supplier.setStoreID("s01");
        new_supplier.setStatus(2);

String role=request.getParameter("newsletter");
//System.out.println(role);
        if(role.equals("0")){ registerMapper.insert_newuser(new_user);}
        if(role.equals("1")){ registerMapper.insert_newstore(new_store);}
        if(role.equals("2")){ registerMapper.insert_newsupplier(new_supplier);}
        return "login";
    }
}
