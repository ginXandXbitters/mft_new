package com.example.mapper;


import com.example.domain.Cart;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CartMapper {
    @Select("SELECT * FROM cart,user,goods WHERE cart.goodID=goods.goodID AND user.userID=cart.uid AND user.userID=#{uid}")
    List<Cart> ShowCart(String uid);

    @Insert("insert into cart(uid,quantity,goodID,price) values(#{uid},#{quantity},#{goodID},#{price})")
    void incart(String uid,String quantity,String goodID,String price);
}
