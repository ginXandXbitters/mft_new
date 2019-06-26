package com.example.controller;

import com.example.domain.User;
import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MapperController {
    @Autowired

    @RequestMapping("/")
    public String homepage(){
        return "index";
    }


    @RequestMapping("/index.html")
    public String homepage_index(){

        return "index";
    }
@RequestMapping("/about-us.html")
    public String NavigateToabout_us(){
        return "about-us";
}
    @RequestMapping("/about-us-2.html")
    public String NavigateToabout_us2(){
        return "about-us-2";
    }
    @RequestMapping("/about-us-3.html")
    public String NavigateToabout_us3(){
        return "about-us-3";
    }
    @RequestMapping("/about-us-4.html")
    public String NavigateToabout_us4(){
        return "about-us-4";
    }
    @RequestMapping("/banner-effect.html")
    public String NavigateTobe(){
        return "banner-effect";
    }

    @RequestMapping("/blog-page.html")
    public String NavigateTobp(){
        return "blog-page";
    }

    @RequestMapping("/cart.html")
    public String NavigateTocart(){
        return "cart";
    }

//    @RequestMapping("/category.html")
//    public String NavigateTocategory(){
//        return "category";
//    }
    @RequestMapping("/category-v2.html")
    public String NavigateTocategory2(){
        return "category-v2";
    }
    @RequestMapping("/category-v3.html")
    public String NavigateTocategory3(){
        return "category-v3";
    }
    @RequestMapping("/checkout.html")
    public String NavigateTocheckout(){
        return "checkout";
    }
    @RequestMapping("/compare.html")
    public String NavigateTocompare(){
        return "compare";
    }
    @RequestMapping("/contact.html")
    public String NavigateTocontact(){
        return "contact";
    }
    @RequestMapping("/faq.html")
    public String NavigateTofaq(){
        return "faq";
    }
    @RequestMapping("/gift-voucher.html")
    public String NavigateTogv(){
        return "gift-voucher";
    }
    @RequestMapping("/home2.html")
    public String NavigateTohome2(){
        return "home2";
    }
    @RequestMapping("/home3.html")
    public String NavigateTohome3(){
        return "home3";
    }
    @RequestMapping("/my-account.html")
    public String NavigateToac(){
        return "my-account";
    }
    @RequestMapping("/order-history.html")
    public String NavigateTooh(){
        return "order-history";
    }
    @RequestMapping("/order-information.html")
    public String NavigateTooi(){
        return "order-information";
    }
    @RequestMapping("/order-query.html")
    public String NavigateTooq(){
        return "order-query";
    }
    @RequestMapping("/product.html")
    public String NavigateToproduct(){
        return "product";
    }
    @RequestMapping("/product-v2.html")
    public String NavigateToproduct2(){
        return "product-v2";
    }
    @RequestMapping("/quickview.html")
    public String NavigateToquickview(){
        return "quickview";
    }
    @RequestMapping("/return.html")
    public String NavigateToreturn(){
        return "return";
    }
    @RequestMapping("/saler-order.html")
    public String NavigateToso(){
        return "saler-order";
    }
    @RequestMapping("/sitemap.html")
    public String NavigateTositemap(){
        return "sitemap";
    }
    @RequestMapping("/statistics.html")
    public String NavigateTostatistics(){
        return "statistics";
    }
    @RequestMapping("/StoreToSupplier.html")
    public String NavigateTosts(){
        return "StoreToSupplie";
    }
    @RequestMapping("/supplier-order.html")
    public String NavigateTosupplierorder(){
        return "supplier-order";
    }
    @RequestMapping("/wishlist.html")
    public String NavigateTowishlist(){
        return "wishlist";
    }
}
