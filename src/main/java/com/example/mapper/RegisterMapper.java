package com.example.mapper;

import com.example.domain.Store;
import com.example.domain.Suppliers;
import com.example.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegisterMapper {
    @Insert("insert into user(userID,userPw,userName,userTel,userMail,province,city,county,site,status) values(#{userID},#{userPw},#{userName},#{userTel},#{userMail},#{province},#{city},#{county},#{site},#{status})")
    public void insert_newuser(User user);

    @Insert("insert into store(storeID,storePW,storeName,supplierID,status) values(#{storeID},#{storePW},#{storeName},#{supplierID},#{status})")
    public void insert_newstore(Store store);

    @Insert("insert into suppliers(supplierID,supplierPW,supplierName,storeID,status) values(#{supplierID},#{supplierPW},#{supplierName},#{storeID},#{status})")
    public void insert_newsupplier(Suppliers suppliers);
}
