package com.graphdatabase.controller;

import com.graphdatabase.model.entity.FilterParameter;
import com.graphdatabase.model.entity.NodeAndRelationEntity;
import com.graphdatabase.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/filter")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @PostMapping("/cc")
    public List<NodeAndRelationEntity> fileterComToCom(@RequestBody FilterParameter filterParameter) {
        List<NodeAndRelationEntity> nodeAndRelationEntities = companyService.filterComToCom(filterParameter);
        return nodeAndRelationEntities;
    }
}
