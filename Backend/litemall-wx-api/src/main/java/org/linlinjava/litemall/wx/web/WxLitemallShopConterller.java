package org.linlinjava.litemall.wx.web;

import org.linlinjava.litemall.core.util.RegexUtil;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.util.bcrypt.BCryptPasswordEncoder;
import org.linlinjava.litemall.db.domain.LitemallShop;
import org.linlinjava.litemall.db.service.LitemallShopService;
import org.linlinjava.litemall.db.service.LitemallinformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wx/shop")
@Validated
public class WxLitemallShopConterller {
    public static final Integer ADMIN_INVALID_NAME = 601;
    public static final Integer ADMIN_INVALID_PASSWORD = 602;
    public static final Integer ADMIN_NAME_EXIST = 602;
    public static final Integer ADMIN_ALTER_NOT_ALLOWED = 603;
    public static final Integer ADMIN_DELETE_NOT_ALLOWED = 604;
    public static final Integer ADMIN_INVALID_ACCOUNT = 605;
    public static final Integer GOODS_UPDATE_NOT_ALLOWED = 610;
    public static final Integer GOODS_NAME_EXIST = 611;
    public static final Integer ORDER_CONFIRM_NOT_ALLOWED = 620;
    public static final Integer ORDER_REFUND_FAILED = 621;
    public static final Integer ORDER_REPLY_EXIST = 622;
    public static final Integer USER_INVALID_NAME = 630;
    public static final Integer USER_INVALID_PASSWORD = 631;
    public static final Integer USER_INVALID_MOBILE = 632;
    public static final Integer USER_NAME_EXIST = 633;
    public static final Integer USER_MOBILE_EXIST = 634;
    public static final Integer ROLE_NAME_EXIST = 640;
    public static final Integer ROLE_SUPER_SUPERMISSION = 641;





    @Autowired
    private LitemallShopService litemallShopService;
    @Autowired
    private LitemallinformationService litemallinformationService;

    //检查商家姓名密码是否合法，配合修改和添加使用，可以抽出来写工具类
    private Object validatetwo(LitemallShop shop) {
        String name = shop.getShopname();
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }
        if (!RegexUtil.isUsername(name)) {
            return ResponseUtil.fail(ADMIN_INVALID_NAME, "店铺名称不符合规定");
        }
        String password = shop.getPassword();
        if (StringUtils.isEmpty(password) || password.length() < 6) {
            return ResponseUtil.fail(ADMIN_INVALID_PASSWORD, "商家密码长度不能小于6");
        }

        return null;
    }



    //这是添加商户
//    @RequiresPermissions("admin:shop:InputShop")
//    @RequiresPermissionsDesc(menu={"系统管理" , "管理员管理"}, button="同意")
    @PostMapping("/InputShop")
    public Object InputShop(@RequestBody LitemallShop shop){
        System.out.println("我是添加商户的Controller--------"+shop.getShopname()+"0000000");
        Object error = validatetwo(shop);
        if (error != null) {
            return error;
        }

        //检查店铺是否重名
        String shopname = shop.getShopname();
        List<LitemallShop> adminList = litemallShopService.findshopname(shopname);
        if (adminList.size() > 0) {
            return ResponseUtil.fail(ADMIN_NAME_EXIST, "商家已经存在，请更改店名");
        }

        String rawPassword = shop.getPassword();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(rawPassword);
        shop.setPassword(encodedPassword);
        shop.setId(null);
        litemallShopService.inputshop(shop);
        return ResponseUtil.ok(shop);
    }



}
