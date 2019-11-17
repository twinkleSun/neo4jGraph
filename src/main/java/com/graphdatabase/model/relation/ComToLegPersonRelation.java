package com.graphdatabase.model.relation;

import com.graphdatabase.model.node.CompanyNode;
import com.graphdatabase.model.node.LegalPersonNode;
import lombok.Getter;
import lombok.Setter;
import org.neo4j.ogm.annotation.*;


/**
 * 关系链：公司-法人关系(目前仅包含这个关系)
 */
@Setter
@Getter
@RelationshipEntity(type = "relation_clp")
public class ComToLegPersonRelation {

    @Id
    @GeneratedValue
    private Long id;

    //目前只存在法人关系，关系线上显示的值为"法人"
    //即 leaglPerson = "法人"
    @Property(name = "legalPerson")
    private String legalPerson;

    //关系链起始节点
    @StartNode
    private CompanyNode startNode;

    //关系链终止节点
    @EndNode
    private LegalPersonNode endNode;

    @Property(name = "startName")
    private String startName;

    @Property(name = "endName")
    private String endName;

}
