package org.linlinjava.litemall.admin.web;

import com.github.pagehelper.PageInfo;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.linlinjava.litemall.admin.annotation.RequiresPermissionsDesc;
import org.linlinjava.litemall.core.util.RegexUtil;
import org.linlinjava.litemall.core.util.ResponseUtil;
import org.linlinjava.litemall.core.util.bcrypt.BCryptPasswordEncoder;
import org.linlinjava.litemall.core.validator.Order;
import org.linlinjava.litemall.core.validator.Sort;
import org.linlinjava.litemall.db.domain.LitemallAdmin;
import org.linlinjava.litemall.db.domain.LitemallInformation;
import org.linlinjava.litemall.db.domain.LitemallShop;
import org.linlinjava.litemall.db.service.LitemallShopService;
import org.linlinjava.litemall.db.service.LitemallinformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.linlinjava.litemall.admin.util.AdminResponseCode.*;

/**
 * 书写的是商家的CRUD，借鉴管理员的操作
 * 包括从商家角度出发的修改和读
 */

@RestController
@RequestMapping("/admin/shop")
@Validated
public class AdminShopController {

    private final Log logger = LogFactory.getLog(AdminShopController.class);
    @Autowired
    private LitemallShopService litemallShopService;
    @Autowired
    private LitemallinformationService litemallinformationService;

    @RequiresPermissions("admin:admin:delete")
    @RequiresPermissionsDesc(menu={"系统管理" , "商户管理"}, button="删除")
    @PostMapping("/delete")
    public Object delete(@RequestBody LitemallShop shop) {
        Integer anotherShopId = shop.getId();
        //进行判断
        if (anotherShopId == null) {
            return ResponseUtil.badArgument();
        }

        litemallShopService.deleteShopById(anotherShopId);
        return ResponseUtil.ok();
    }


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


    //修改商家
    @RequiresPermissions("admin:admin:updateShop")
    @RequiresPermissionsDesc(menu={"系统管理" , "商家管理"}, button="编辑")
    @PostMapping("/updateShop")
    public Object updateShop(@RequestBody LitemallShop shop) {
        System.out.println("updateShop======="+shop.getShopname()+"00000000");
        Object error = validatetwo(shop);
        if (error != null) {
            return error;
        }
        Integer anothershopId = shop.getId();
        if (anothershopId == null) {
            return ResponseUtil.badArgument();
        }

        String rawPassword = shop.getPassword();
        //密码的检验
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(rawPassword);
        shop.setPassword(encodedPassword);

        if (litemallShopService.updateById(shop) == 0) {
            return ResponseUtil.updatedDataFailed();
        }

        return ResponseUtil.ok(shop);
    }

    //商家的详情查询
    @RequiresPermissions("admin:admin:readOnlyShop")
    @RequiresPermissionsDesc(menu={"系统管理" , "商家管理"}, button="商家详情")
    @GetMapping("/readOnlyShop")
    public Object readOnlyShop(@NotNull Integer id) {
        LitemallShop shop= litemallShopService.findById(id);
        return ResponseUtil.ok(shop);
    }

    /**
     * 注意：Sort（校验用户请求参数值只能是add_time或者id）
     * Order（校验用户请求参数值只能是desc或者asc）
     * @param username
     * @param page
     * @param limit
     * @param sort
     * @param order
     * @return
     */
    @RequiresPermissions("admin:admin:Querylist")
    @RequiresPermissionsDesc(menu={"系统管理" , "商家管理"}, button="查询")
    @GetMapping("/Querylist")
    public Object Querylist(String username,
                       @RequestParam(defaultValue = "1") Integer page,
                       @RequestParam(defaultValue = "10") Integer limit,
                       @Sort @RequestParam(defaultValue = "add_time") String sort,
                       @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallShop> adminList = litemallShopService.querySelective(username, page, limit, sort, order);
        long total = PageInfo.of(adminList).getTotal();
        Map<String, Object> data = new HashMap<>();
        data.put("total", total);
        data.put("items", adminList);

        return ResponseUtil.ok(data);
    }

    //***************************************
    //关于商家的登陆




    //关于商家的余额(得到前台传过来的total总数)，录入数据库
    //思路解释；得到前台的数据，然后在从数据库中找到余额字段，相加在录入；
    //商家的详情查询
    @RequiresPermissions("admin:admin:balanceAdd")
    @RequiresPermissionsDesc(menu={"商家" , "关于金额"}, button="金额总数")
    @GetMapping("/balanceAdd")
    public Object balanceAdd(@NotNull String balance,Integer id) {
        //查询商家详情得到金额
        LitemallShop shop= litemallShopService.findById(id);
        //商家已有金额originalbalance
        String original_balance=shop.getBalance();
        //金额相加得到总金额
        Double a= Double.parseDouble(balance);
        Double b= Double.parseDouble(original_balance);
        String C=(a+b)+"";
        shop.setBalance(C);
        litemallShopService.UpadateShopbalance(shop);
        return ResponseUtil.ok(shop);
    }



    //这是录入到消息表中（商家申请入驻之后，管理员进行判断）
    @RequiresPermissions("admin:admin:InputInformation")
    @RequiresPermissionsDesc(menu={"系统管理" , "商家"}, button="消息")
    @PostMapping("/InputInformation")
    public Object InputInformation(@RequestBody LitemallInformation information){
        System.out.println("管理员通知--------");
        Object error = validateInfo(information);
        if (error != null) {
            return error;
        }

        //检查店铺是否重名,管理员只需要进行高级操作
        String shopname = information.getShopname();
        List<LitemallShop> adminList = litemallinformationService.findshopname(shopname);
        if (adminList.size() > 0) {
            return ResponseUtil.fail(ADMIN_NAME_EXIST, "商家已经存在，请更改店名");
        }

        litemallinformationService.inputInfomation(information);
        return ResponseUtil.ok(information);
    }


    private Object validateInfo(LitemallInformation information) {
        String name = information.getShopname();
        if (StringUtils.isEmpty(name)) {
            return ResponseUtil.badArgument();
        }
        if (!RegexUtil.isUsername(name)) {
            return ResponseUtil.fail(ADMIN_INVALID_NAME, "店铺名称不符合规定");
        }
        return null;
    }

    //关于如何给管理员发消息（给消息表录入数据，管理员同意在录入到商家表中）
    //当管理员点击消息之后，显示所有的商家想入驻的消息
    @RequiresPermissions("admin:admin:QuerylistInfomation")
    @RequiresPermissionsDesc(menu={"系统管理" , "管理员通知"}, button="消息")
    @GetMapping("/QuerylistInfomation")
    public Object QuerylistInfomation(Integer id,String role_name,
                            @RequestParam(defaultValue = "1") Integer page,
                            @RequestParam(defaultValue = "10") Integer limit,
                            @Sort @RequestParam(defaultValue = "add_time") String sort,
                            @Order @RequestParam(defaultValue = "desc") String order) {
        List<LitemallInformation> adminList = litemallinformationService.querySelectiveByKey(id,role_name, page, limit, sort, order);
        long total = PageInfo.of(adminList).getTotal();
        Map<String, Object> data = new HashMap<>();
        data.put("total", total);
        data.put("items", adminList);

        return ResponseUtil.ok(data);
    }

    //这是添加商户
    @RequiresPermissions("admin:admin:InputShop")
    @RequiresPermissionsDesc(menu={"系统管理" , "管理员管理"}, button="同意")
    @PostMapping("/InputShop")
    public Object InputShop(@RequestBody LitemallShop shop){
        System.out.println("我是添加商户的Controller--------");
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
        litemallShopService.inputshop(shop);
        return ResponseUtil.ok(shop);
    }




}
