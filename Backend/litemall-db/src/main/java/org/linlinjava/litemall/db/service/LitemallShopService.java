package org.linlinjava.litemall.db.service;


import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallShopMapper;
import org.linlinjava.litemall.db.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;


/**
 * 商家业务实现业务层
 */
@Service
public class LitemallShopService {
    private final LitemallShop.Column[]  result=   new LitemallShop.Column[]{LitemallShop.Column.id, LitemallShop.Column.username};

    @Resource
    private LitemallShopMapper litemallShopMapper;

    /**
     * 商家删除的业务实现方法
     * @param id
     */
    @Transactional
    public void deleteShopById(Integer id) {
        //注意：这个litemallshopmapper底层没有自动生成逻辑删除的方法，用deleteByPrimaryKey代替
      litemallShopMapper.deleteByPrimaryKey(id);
    }

    /**
     * 商家修改功能
     * @param shop
     * @return
     */
    public int updateById(LitemallShop shop) {
       //获取修改功能
        shop.setUpdateTime(LocalDateTime.now());
        //注意：updateByPrimaryKeySelective这个方法是iyou选择性的修改 在SQL语句中进行了if
        //判断
        return litemallShopMapper.updateByPrimaryKeySelective(shop);
    }

    /**
     *商家的详情
     * @param id
     * @return
     */
    public LitemallShop findById(Integer id) {
        return litemallShopMapper.selectByPrimaryKeySelective(id, result);
    }

    /**
     * 商家的查询
     * @param username
     * @param page
     * @param limit
     * @param sort
     * @param order
     * @return
     */
    public List<LitemallShop> querySelective(String username, Integer page, Integer limit, String sort, String order) {
        LitemallShopExample example = new LitemallShopExample();
        LitemallShopExample.Criteria criteria = example.createCriteria();

        if (!StringUtils.isEmpty(username)) {
            criteria.andUsernameLike("%" + username + "%");
        }

         criteria.andDeletedEqualTo(false);

        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }

        PageHelper.startPage(page, limit);
        return litemallShopMapper.selectByExampleSelective(example, result);
    }

    public List<LitemallShop> findshopname(String shopname){
        LitemallShopExample example = new LitemallShopExample();
        example.or().andShopnameEqualTo(shopname);
        return litemallShopMapper.selectByExample(example);
    }

    //录入到商家表中（完成功能）
    public void inputshop(LitemallShop shop) {
        shop.setAddTime(LocalDateTime.now());
        shop.setUpdateTime(LocalDateTime.now());
        litemallShopMapper.insertSelective(shop);
    }

    //商家金额增加就相当于修改金额 通过选择性的修改
    public void UpadateShopbalance(LitemallShop shop) {
        shop.setUpdateTime(LocalDateTime.now());
        litemallShopMapper.updateByPrimaryKeySelective(shop);
    }
}
