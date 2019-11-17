package com.graphdatabase.service;


import com.graphdatabase.dao.CompanyMapper;
import com.graphdatabase.model.entity.ComToComEntity;
import com.graphdatabase.model.entity.FilterParameter;
import com.graphdatabase.model.entity.NodeAndRelationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Repository
public class CompanyService {

    @Autowired
    CompanyMapper companyMapper;

    //onlyCom=0时，仅对公
    public List<NodeAndRelationEntity> filterComToCom(FilterParameter filterParameter){
        String searchLevel = filterParameter.getSearchLevel();

        if(filterParameter.getIsCircle()== 0){
            //不成圈，则查询指定路径内的
            searchLevel = ".." + searchLevel;
        }else{
            //成圈，则查询0..
            searchLevel = "0..";
        }
        filterParameter.setSearchLevel(searchLevel);

        List<NodeAndRelationEntity> nodeAndRelationEntityList = companyMapper.filterComToCom(filterParameter);

        return nodeAndRelationEntityList;


    }
}
