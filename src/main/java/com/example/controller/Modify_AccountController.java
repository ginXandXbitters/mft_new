package com.example.controller;

import com.example.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.controller.LoginController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class Modify_AccountController {

    @Autowired
    AdminMapper adminMapper;

    @RequestMapping("/my-account.html")
    public String modify_page(HttpServletRequest request, Model model) throws IOException {
        //用户个人账户，用户名显示

        System.out.println(adminMapper.select_user_info(LoginController.get_user_id).getUserName());

        model.addAttribute("user_sel_name",adminMapper.select_user_info(LoginController.get_user_id).getUserName());

        return "my-account";
    }

    @RequestMapping("/modify_user_info.html")
    public String modify_user_info(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException{

        String user_id_input = LoginController.get_user_id;

        String user_id_new = null;
        String user_name = null;
        String user_tel = null;
        String user_mail = null;
        String user_province = null;
        String user_city = null;
        String user_coun = null;
        String user_site = null;

        user_id_new = request.getParameter("user_id_modify");
        user_name = request.getParameter("user_name_modify");
        user_tel = request.getParameter("user_tel_modify");
        user_mail = request.getParameter("user_mail_modify");
        user_province = request.getParameter("user_province_modify");
        user_city = request.getParameter("user_city_modify");
        user_coun = request.getParameter("user_coun_modify");
        user_site = request.getParameter("user_site_modify");

        String user_old_pwd = null;
        String user_new_pwd = null;
        String user_new_confirm = null;

        user_old_pwd = request.getParameter("user_old_pwd");
        user_new_pwd = request.getParameter("user_new_pwd");
        user_new_confirm = request.getParameter("user_new_confirm");

        //修改账号，并更新公有变量账号
        if(!user_id_new.isEmpty()){
            adminMapper.set_userID(user_id_new, user_id_input);

            LoginController.get_user_id = user_id_new;
            user_id_input = LoginController.get_user_id;

            model.addAttribute("th_id","账号修改成功");

        }

        //修改密码，判断原密码输入是否正确
        if(adminMapper.select_user_info(user_id_input).getUserPw().equals(user_old_pwd)){
            if(!user_new_pwd.isEmpty()){
                if(user_new_pwd.equals(user_new_confirm)){
                    //确认修改密码，两遍相同
                    adminMapper.set_userPwd(user_new_pwd, user_id_input);
                }
                else{
                    model.addAttribute("th_old_pwd","两次密码不同");
                }
            }
        }
        else{
            model.addAttribute("th_old_pwd","原密码输入有误或无输入，不修改");
        }


        if(!user_name.isEmpty()){
            adminMapper.set_userName(user_name, user_id_input);
            model.addAttribute("th_name","用户名修改成功");
        }

        if(!user_tel.isEmpty()){
            adminMapper.set_userTel(user_tel, user_id_input);
            model.addAttribute("th_tel","电话修改成功");
        }

        if(!user_mail.isEmpty()){
            adminMapper.set_userMail(user_mail, user_id_input);
            model.addAttribute("th_mail","邮箱修改成功");
        }

        if(!user_province.isEmpty()){
            adminMapper.set_userProv(user_province, user_id_input);
            model.addAttribute("th_prov","省/直辖市修改成功");
        }

        if(!user_city.isEmpty()){
            adminMapper.set_userCity(user_city, user_id_input);
            model.addAttribute("th_city","市/直辖市修改成功");
        }

        if(!user_coun.isEmpty()){
            adminMapper.set_userCoun(user_coun, user_id_input);
            model.addAttribute("th_coun","区/县修改成功");
        }

        if(!user_site.isEmpty()){
            adminMapper.set_userSite(user_site, user_id_input);
            model.addAttribute("th_site","详细地址修改成功");
        }

        return "my-account";



    }


}
