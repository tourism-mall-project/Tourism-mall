package org.linlinjava.litemall.admin.service;

import org.junit.Test;

import static org.junit.Assert.*;

public class AdminOrderServiceTest {

    @Test
    public void queryOrderByid() {


        AdminOrderService O= new AdminOrderService();
        O.QueryOrderByid(148);
    }
}