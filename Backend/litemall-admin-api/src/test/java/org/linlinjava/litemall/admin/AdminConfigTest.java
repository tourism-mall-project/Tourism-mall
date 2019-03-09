package org.linlinjava.litemall.admin;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.linlinjava.litemall.admin.web.AdminAdController;
import org.linlinjava.litemall.admin.web.AdminGoodsController;
import org.linlinjava.litemall.db.domain.LitemallGoods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.security.PrivateKey;
import java.util.List;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class AdminConfigTest {
    @Autowired
    private Environment environment;
    @Autowired
    private AdminGoodsController adminGoodsController;
    @Test
    public void test() {
        // 测试获取application-core.yml配置信息
        System.out.println(environment.getProperty("litemall.express.appId"));
        // 测试获取application-db.yml配置信息
        System.out.println(environment.getProperty("spring.datasource.druid.url"));
        // 测试获取application-admin.yml配置信息
        // System.out.println(environment.getProperty(""));
        // 测试获取application.yml配置信息
        System.out.println(environment.getProperty("logging.level.org.linlinjava.litemall.admin"));

        String id="1001";
        Integer it = Integer.valueOf(id);
        AdminGoodsController AdminGoodsController =new AdminGoodsController();
        Object goods =AdminGoodsController.detail(it);
        System.out.println("111111111"+goods.getClass().getName());
    }





}
