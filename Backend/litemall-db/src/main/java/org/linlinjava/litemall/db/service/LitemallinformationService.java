package org.linlinjava.litemall.db.service;

import com.github.pagehelper.PageHelper;
import org.linlinjava.litemall.db.dao.LitemallInformationMapper;
import org.linlinjava.litemall.db.dao.LitemallShopMapper;
import org.linlinjava.litemall.db.domain.LitemallInformation;
import org.linlinjava.litemall.db.domain.LitemallInformationExample;
import org.linlinjava.litemall.db.domain.LitemallShop;
import org.linlinjava.litemall.db.domain.LitemallShopExample;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LitemallinformationService {
    private final LitemallInformation.Column[]  result=   new LitemallInformation.Column[]{LitemallInformation.Column.roleName};

    @Resource
    private LitemallInformationMapper litemallInformationMapper;
    @Resource
    private LitemallShopMapper shopMapper ;


    public List<LitemallShop> findshopname(String shopname){
        LitemallShopExample example = new LitemallShopExample();
        example.or().andShopnameEqualTo(shopname);
        return shopMapper.selectByExample(example);
    }

    //录入到消息表中，给管理员查询
    public void inputInfomation(LitemallInformation information) {
        information.setAddTime(LocalDateTime.now());
        litemallInformationMapper.insertSelective(information);
    }

    //管理员点击消息，开始查询全部（猜想可能有错误，如果呦错误 应该出在selectByPrimaryKeySelective方法上）
    public List<LitemallInformation> querySelectiveByKey(Integer id,String role_name, Integer page, Integer limit, String sort, String order) {
        LitemallInformationExample example = new LitemallInformationExample();
        LitemallInformationExample.Criteria criteria = example.createCriteria();

        if (!StringUtils.isEmpty(role_name)) {
            criteria.andUsernameLike("%" + role_name + "%");
        }

        criteria.andDeletedEqualTo(false);

        //排序而已
        if (!StringUtils.isEmpty(sort) && !StringUtils.isEmpty(order)) {
            example.setOrderByClause(sort + " " + order);
        }

        PageHelper.startPage(page, limit);
        return litemallInformationMapper.selectByExampleSelective(example,result);

    }


}
