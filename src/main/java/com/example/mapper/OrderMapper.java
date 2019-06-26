package com.example.mapper;

import com.example.domain.Order;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface OrderMapper {

    @Insert("insert into `order` (orderID,userID,goodID,quantity,buytime,status) values(#{orderID},#{userID},#{goodID},#{quantity},#{buytime},0)")
    public void InsertOrder(String orderID,String userID,String goodID,String quantity,String buytime);

    @Select("SELECT orderID,userID,goods.goodID,quantity,buytime,status,goodName,price,goodImage  FROM order,goods WHERE order.goodID=goods.goodID AND userID = #{uid}")
    public List<Order> ShowOrder(String uid);

    @Select("SELECT orderID,buytime,userName,province,city,county,site,userTel FROM order,goods,user WHERE order.goodID=goods.goodID AND order.userID=user.userID AND orderID =#{orderID} GROUP BY orderID")
    public List<Order> ShowDetail(String orderId);
}
