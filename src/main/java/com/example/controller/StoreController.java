package com.example.controller;

import com.example.domain.Sellpage;
import com.example.mapper.StoreMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class StoreController {

    @Autowired
    StoreMapper storeMapper;

    @RequestMapping("/grounding.html")
    public String NavigateToGrounding(){
        return "grounding";
    }

    @RequestMapping("/seller_homepage_afteradd.html")
    public String add_new_good(HttpServletRequest request, Model model){
        String seller_name=request.getParameter("name");
        String seller_price=request.getParameter("price");
        String seller_sup=request.getParameter("supplier");
        String seller_img=request.getParameter("address_1");

        Sellpage new_sp=new Sellpage();
        new_sp.setSell_name(seller_name);
        new_sp.setSell_price(Integer.parseInt(seller_price));
        new_sp.setSell_sup(seller_sup);
        new_sp.setSell_img(seller_img);

        storeMapper.insert_newgood(new_sp);

        List<Sellpage> sp=storeMapper.StorepageList();
        model.addAttribute("sp",sp);
        return "seller_homepage";
    }

}
