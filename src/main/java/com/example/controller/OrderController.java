package com.example.controller;

import com.example.domain.Cart;
import com.example.mapper.CartMapper;
import com.example.mapper.OrderMapper;
import com.example.controller.LoginController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
public class OrderController {
    @Autowired
    CartMapper cartMapper;
    @Autowired
    OrderMapper orderMapper;

    @RequestMapping("/checkout.html")
    public  String hello(Model model){
        List<Cart> cartlist = cartMapper.ShowCart(LoginController.get_user_id);
        model.addAttribute("cartlist",cartlist);
        return "checkout";
    }

    @RequestMapping("/index_after_checkout.html")
    public String processRequest(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {

        //1.获取客户端提交的信息
        String orderID = "";
        String goodId = "";
        String quantity = "";

        orderID="g000002";


        java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); //这个是设置时间的格式;
        java.util.Date currentTime = new java.util.Date();//得到当前系统时间
        String buyTime = formatter.format(currentTime); //将日期时间格式化



        List<Cart> cartlist = cartMapper.ShowCart(LoginController.get_user_id);
        model.addAttribute("cartlist",cartlist);


        for (int i = 0; i < cartlist.size(); i++) {

            Cart cart = cartlist.get(i);
            goodId = cart.getGoodId();
            quantity = cart.getQuantity();

            System.out.println(goodId+quantity+buyTime);



            orderMapper.InsertOrder(orderID, LoginController.get_user_id, goodId, quantity, buyTime);

//            if (!isOrder) {
//                response.getWriter().write("添加订单失败");
//                return "checkout";
//            }
        }
        return "pay";
    }

    @RequestMapping("/finish_pay.html")
    public String finish_page(){

        return "index_user";
    }

}
