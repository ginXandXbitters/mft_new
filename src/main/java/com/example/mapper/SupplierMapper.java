package com.example.mapper;

import com.example.domain.Goods;
import com.example.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface SupplierMapper {
    @Select("select d_quantity from goods,depository where goods.goodID=depository.d_goodID and goodID=#{goodID}")
    public int queryQuantity(String goodID);
    @Update("update depository set d_quantity=#{new_quantity} where d_goodID=#{goodID}")
    public void update_quantity(int new_quantity,String goodID);

}
