package com.example.mapper;

import com.example.domain.Sellpage;
import com.example.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StoreMapper {

    @Select("select * from sell_page")
    public List<Sellpage> StorepageList();

    @Insert("insert into sell_page(sell_name,sell_price,sell_sup,sell_img) values(#{sell_name},#{sell_price},#{sell_sup},#{sell_img})")
    public void insert_newgood(Sellpage sellpage);
}
