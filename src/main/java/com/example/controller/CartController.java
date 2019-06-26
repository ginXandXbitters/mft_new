package com.example.controller;

import com.example.domain.Cart;
import com.example.mapper.CartMapper;
import com.example.controller.LoginController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class CartController {
    @Autowired
    CartMapper cartMapper;

    @RequestMapping("/cart.html")
    protected String processRequest(Model model) {

//        request.setCharacterEncoding("UTF-8");
//        response.setContentType("text/html;charset=utf-8");

        String key=LoginController.get_user_id;
        System.out.println(key);
        List<Cart> cartlist = cartMapper.ShowCart(key);
        model.addAttribute("cartlist",cartlist);

        return "cart";
    }
}
