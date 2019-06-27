package com.example.mapper;

import com.example.domain.Admin;
import com.example.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface AdminMapper {

    //搜索账号信息
    @Select("select * from user where userID=#{user_id}")
    public User select_user_info(String user_id);

    //更新账号信息
    @Update("update user set userName = #{user_name} where userID = #{user_id}")
    public void set_userName(String user_name, String user_id);

    @Update("update user set userMail = #{user_mail} where userID = #{user_id}")
    public void set_userMail(String user_mail, String user_id);

    @Update("update user set province = #{user_prov} where userID = #{user_id}")
    public void set_userProv(String user_prov, String user_id);

    @Update("update user set city = #{user_city} where userID = #{user_id}")
    public void set_userCity(String user_city, String user_id);

    @Update("update user set county = #{user_coun} where userID = #{user_id}")
    public void set_userCoun(String user_coun, String user_id);

    @Update("update user set site = #{user_site} where userID = #{user_id}")
    public void set_userSite(String user_site, String user_id);

    @Update("update user set status = #{user_status} where userID = #{user_id}")
    public void set_userStatus(Integer user_status, String user_id);

}
