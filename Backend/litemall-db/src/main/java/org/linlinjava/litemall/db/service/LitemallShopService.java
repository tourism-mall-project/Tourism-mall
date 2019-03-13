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
    @Transactional
    public int updateById(LitemallShop shop) {

        System.out.println("updateById"+shop.getUsername());
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
    @Transactional
    public LitemallShop findById(Integer id) {
        // return litemallShopMapper.selectByPrimaryKeySelective(id, result);
        return litemallShopMapper.selectByPrimaryKey(id);
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
    @Transactional
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

        return litemallShopMapper.selectByExample(example);

    }

    public List<LitemallShop> findshopname(String shopname){
        LitemallShopExample example = new LitemallShopExample();
        example.or().andShopnameEqualTo(shopname);
        return litemallShopMapper.selectByExample(example);
    }

    //录入到商家表中（完成功能）
    @Transactional
    public void inputshop(LitemallShop shop) {
        System.out.println("我是商家录入====="+shop.getShopname()+"00000");
        shop.setAddTime(LocalDateTime.now());
        shop.setUpdateTime(LocalDateTime.now());
        shop.setId(null);
        shop.setBalance("0");
        shop.setRoleName("0");
        litemallShopMapper.insertSelective(shop);
    }

    //商家金额增加就相当于修改金额 通过选择性的修改@Transactional
    @Transactional
    public void UpadateShopbalance(LitemallShop shop) {
        shop.setUpdateTime(LocalDateTime.now());
        litemallShopMapper.updateByPrimaryKeySelective(shop);
    }

    //判断用户身份登陆的方法，通过ID查到用户的信息
    public Object inspectLogin(Integer id){
      //查看详情（查询商家的身份字段）
      LitemallShop shop=litemallShopMapper.selectByPrimaryKey(id);
      if(shop!=null&&shop.getRoleName()!=null){
          //判断出是商家

      }
        return null;
    }



}
