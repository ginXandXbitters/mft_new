package com.example.mapper;

import com.example.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("select * from user")
       public List<User> queryUserList();

    @Select("select userPw from user where userID=#{forsure_id}")
    public String queryUsername(String forsure_id);
}
