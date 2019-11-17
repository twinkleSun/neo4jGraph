package com.graphdatabase.model.entity;

import com.graphdatabase.model.node.CompanyNode;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class ComToComEntity {

    private CompanyNode startCom;

    private CompanyNode endCom;

    private Map<String,Object> route_cc;
}
