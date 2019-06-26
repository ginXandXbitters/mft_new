package com.example.controller;

import com.example.domain.User;
import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MapperController {
    @Autowired

    @RequestMapping("/")
    public String homepage(){
        return "index";
    }


    @RequestMapping("/index.html")
    public String homepage_index(){
        return "index";
    }





}
