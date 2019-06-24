package com.example.controller;

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
        String province=request.getParameter("");
        String city=request.getParameter("name");
        String county=request.getParameter("name");
        String site=request.getParameter("name");
        int status=0;



        return "login";
    }
}
