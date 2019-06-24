package com.example.controller;

import com.example.domain.User;
import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MapperController {
    @Autowired
    private UserMapper userMapper;
    @RequestMapping("/rigister.html")
    @ResponseBody
    public List<User> queryUser(){
        List<User> users = userMapper.queryUserList();
        return users;
    }
@RequestMapping("/")
public String test(){
        return "index";
}
    @RequestMapping("/login.html")
    //@ResponseBody
    public String queryUsername(){
        String myname = userMapper.queryUsername("u000001");
        System.out.println(myname);
        return "login";
    }
}
