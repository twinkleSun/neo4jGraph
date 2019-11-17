package com.graphdatabase.model.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilterParameter {

    /**
     * 是否成圈
     * 0=不成圈（默认）
     * 1=成圈
     */
    private int isCircle;

    /**
     * 探索方向,默认为2，双向
     * 0=反向，1=正向，2=双向
     * 全不选也为双向
     */
    private int isForward;

    /**
     * 时间范围，默认为当月时间
     */
    private String timeRange;

    /**
     * 交易类别
     * 全部，本行-本行，本行-他行
     */
    private int transCategory;

    /**
     * 交易金额 transMoney，默认1000万
     * 交易笔数 transNum，默认0不筛选
     * 交易笔均 transAvg,默认0为不筛选
     */
    private double transMoney;

    private double transNum;

    private double transAvg;

    /**
     * 探索路径层数，默认为1
     * 取值范围1->10
     * 如果不成圈，则形如..2;成圈则形如0..
     */
    private String searchLevel;

    /**
     * 供应链
     * 1，不显示水电
     * 0，全部显示
     */
    private int supplyNum;

    /**
     * 探索路径选择
     * 仅对公=0；
     * 对公对私=1；
     */
    private String onlyCom;

    /**
     * 对公客户名称
     */
    private String companyName;


}
