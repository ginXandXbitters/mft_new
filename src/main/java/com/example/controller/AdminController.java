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
public class AdminController {

    @RequestMapping("user-information.html")
    public String admin_homepage(){
        return "user-information";
    }

}
