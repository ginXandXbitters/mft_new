package com.example.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface RegisterMapper {
    @Insert("insert into user(userID,userPw,userName,userTel,userMail,province,city,county,site,status) values(#{id},#{pw},#{name},#{tel},#{mail},#{province},#{city},#{county},#{site},#{status})")
 public int insert_user(String id,String pw,String name,String tel,String mail,String province,String city,String county,String status);

//    @Insert("insert into store(storeID,storeName,supplierID) values(#{id},#{pw},#{name},#{tel},#{mail})")
//    public int insert_store(String id,String name,String supplier);
//
//    @Insert("insert into suppliers(userID,userPw,userName,userTel,userMail) values(#{id},#{pw},#{name},#{tel},#{mail})")
//    public int insert_supplier(String id,String pw,String name,String tel,String mail);
}
