package com.example.mapper;

import com.example.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LoginMapper {

    @Select("select userPw from user where userID=#{user_id}")
    public String compare_userPWD(String user_id);

    @Select("select adminPW from admin where adminID=#{admin_id}")
    public String compare_adminPWD(String admin_id);

    @Select("select storePW from store where storeID=#{store_id}")
    public String compare_sellerPWD(String store_id);

    @Select("select supplierPW from suppliers where supplierID=#{supplier_id}")
    public String compare_supplierPWD(String supplier_id);
}
