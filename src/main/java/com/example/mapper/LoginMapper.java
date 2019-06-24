package com.example.mapper;

import com.example.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface LoginMapper {

    @Select("select userPw from user where userID=#{user_id}")
    public String compare_userPWD(String user_id);

    @Select("select adminPW from admin where adminID=#{admin_id}")
    public String compare_adminPWD(String admin_id);
}
