package com.graphdatabase.model.relation;

import com.graphdatabase.model.node.CompanyNode;
import com.graphdatabase.model.node.PersonNode;
import lombok.Getter;
import lombok.Setter;
import org.neo4j.ogm.annotation.*;

/**
 * 资金链关系：公司-个人
 */
@Setter
@Getter
@RelationshipEntity(type = "relation_cp")
public class ComToPersonRelation {

    @Id
    @GeneratedValue
    private Long id;

    //累计交易金额
    @Property(name = "transMoney")
    private Double transMoney;

    @Property(name = "timeRange")
    private String timeRange;

    //交易笔数
    @Property(name = "transNum")
    private int transNum;

    //交易笔均
    @Property(name = "transAvg")
    private int transAvg;

    //累计交易净额
    @Property(name = "transSum")
    private Double transSum;

    @Property(name = "startName")
    private String startName;

    @Property(name = "endName")
    private String endName;


//    //关系链起始节点
//    @StartNode
//    private CompanyNode startNode;
//
//    //关系链终止节点
//    @EndNode
//    private PersonNode endNode;
}
