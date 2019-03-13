package org.linlinjava.litemall.admin.dao;

import org.linlinjava.litemall.db.domain.*;

public class ShopGoodsAllinone {
    LitemallShopgoods goodstwo;
    LitemallGoodsSpecification[] specifications;
    LitemallGoodsAttribute[] attributes;
    // 这里采用 Product 再转换到 LitemallGoodsProduct
    LitemallGoodsProduct[] products;

    public LitemallShopgoods getgoodstwo() {
        return goodstwo;
    }

    public void setgoodstwo(LitemallShopgoods goodstwo) {
        this.goodstwo = goodstwo;
    }

    public LitemallGoodsProduct[] getProducts() {
        return products;
    }

    public void setProducts(LitemallGoodsProduct[] products) {
        this.products = products;
    }

    public LitemallGoodsSpecification[] getSpecifications() {
        return specifications;
    }

    public void setSpecifications(LitemallGoodsSpecification[] specifications) {
        this.specifications = specifications;
    }

    public LitemallGoodsAttribute[] getAttributes() {
        return attributes;
    }

    public void setAttributes(LitemallGoodsAttribute[] attributes) {
        this.attributes = attributes;
    }



}
