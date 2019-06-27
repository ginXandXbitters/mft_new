package com.example.controller;

import com.example.mapper.SupplierMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
public class SupplierController {
    @Autowired
    SupplierMapper supplierMapper;

    @RequestMapping("/send.html")
   public String NavigateToSend(Model model) {
        return "send";
    }
    @RequestMapping("/checkin1.html")
    public String In1(HttpServletRequest request,Model model){
        String checkin_num=request.getParameter("quantity1");
        int raw_quantity=supplierMapper.queryQuantity("g10");
        int another_quantity=supplierMapper.queryQuantity("g11");
        int new_quantity=raw_quantity+Integer.parseInt(checkin_num);
        supplierMapper.update_quantity(new_quantity,"g10");
        model.addAttribute("quantity1", new_quantity);
        model.addAttribute("quantity2", another_quantity);
        return "supplier";
    }

    @RequestMapping("/checkin2.html")
    public String In2(HttpServletRequest request,Model model){
        String checkin_num=request.getParameter("quantity2");
        int another_quantity=supplierMapper.queryQuantity("g10");
        int raw_quantity=supplierMapper.queryQuantity("g11");
        int new_quantity=raw_quantity+Integer.parseInt(checkin_num);
        supplierMapper.update_quantity(new_quantity,"g11");
        model.addAttribute("quantity2", new_quantity);
        model.addAttribute("quantity1", another_quantity);
        return "supplier";
    }

    @RequestMapping("/supplier_after_checkout.html")
    public  String checkout(HttpServletRequest request,Model model){
        String checkout_num=request.getParameter("quantity3");
        int another_quantity=supplierMapper.queryQuantity("g10");
        int raw_quantity=supplierMapper.queryQuantity("g11");
        int new_quantity=raw_quantity-Integer.parseInt(checkout_num);
        supplierMapper.update_quantity(new_quantity,"g11");
        model.addAttribute("quantity2", new_quantity);
        model.addAttribute("quantity1", another_quantity);
        return "supplier";
    }
}
