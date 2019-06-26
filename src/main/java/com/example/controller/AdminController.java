package com.example.controller;

import com.example.domain.Admin;
import com.example.mapper.AdminMapper;
import com.example.mapper.LoginMapper;
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

@Controller
public class AdminController {

    @Autowired
    AdminMapper adminMapper;

    @RequestMapping("/user-information.html")
    public String admin_modify_info(){
        return "user-information";
    }

    @RequestMapping("/administrator.html")
    public String admin_modify_role(){
        return "administrator";
    }

    @RequestMapping("/select_userinfo.html")
    public String admin_select_id(HttpServletRequest request, Model model) throws IOException{

        String user_id_input = null;
        user_id_input = request.getParameter("select_userid");

        if(adminMapper.select_user_info(user_id_input)!=null){

            model.addAttribute("user_id",user_id_input);
            model.addAttribute("user_name",adminMapper.select_user_info(user_id_input).getUserName());
            model.addAttribute("user_mail",adminMapper.select_user_info(user_id_input).getUserMail());
            model.addAttribute("user_province",adminMapper.select_user_info(user_id_input).getProvince());
            model.addAttribute("user_city",adminMapper.select_user_info(user_id_input).getCity());
            model.addAttribute("user_coun",adminMapper.select_user_info(user_id_input).getCounty());
            model.addAttribute("user_site",adminMapper.select_user_info(user_id_input).getSite());

            return "user-information";

        }
        else{
            model.addAttribute("user_id","该用户不存在，请重新输入用户ID");
            return "user-information";
        }
    }

    @RequestMapping("/admin_modify_user_info.html")
    public String admin_modify_info(HttpServletRequest request, Model model) throws IOException{

        String user_id_input = null;
        String user_name = null;
        String user_mail = null;
        String user_province = null;
        String user_city = null;
        String user_coun = null;
        String user_site = null;

        user_id_input = request.getParameter("user_id_modify");
        user_name = request.getParameter("user_name_modify");
        user_mail = request.getParameter("user_mail_modify");
        user_province = request.getParameter("user_province_modify");
        user_city = request.getParameter("user_city_modify");
        user_coun = request.getParameter("user_coun_modify");
        user_site = request.getParameter("user_site_modify");

        if(!user_id_input.isEmpty()){

            if(!user_name.isEmpty()){
                adminMapper.set_userName(user_name, user_id_input);
            }
            if(!user_mail.isEmpty()){
                adminMapper.set_userMail(user_mail, user_id_input);
            }
            if(!user_province.isEmpty()){
                adminMapper.set_userProv(user_province, user_id_input);
            }
            if(!user_city.isEmpty()){
                adminMapper.set_userCity(user_city, user_id_input);
            }
            if(!user_coun.isEmpty()){
                adminMapper.set_userCoun(user_coun, user_id_input);
            }
            if(!user_site.isEmpty()){
                adminMapper.set_userSite(user_site, user_id_input);
            }

            return "user-information";
        }
        else {
            model.addAttribute("user_id","修改失败，请重新输入用户ID！");
            return "user-information";
        }

    }

}
