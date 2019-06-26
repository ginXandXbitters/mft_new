package com.example.mapper;

import com.example.domain.Admin;
import com.example.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface AdminMapper {

    //搜索账号信息
    @Select("select * from user where userID=#{user_id}")
    public User select_userinfo(String user_id);


}
