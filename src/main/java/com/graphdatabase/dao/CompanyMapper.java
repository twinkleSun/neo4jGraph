package com.graphdatabase.dao;


import com.graphdatabase.model.entity.FilterParameter;
import com.graphdatabase.model.entity.NodeAndRelationEntity;
import com.graphdatabase.model.relation.ComToComRelation;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface  CompanyMapper {


    /**
     * 筛选条件 公司-公司
     * @param filterParameter
     * @return
     */
    List<NodeAndRelationEntity> filterComToCom(FilterParameter filterParameter);

    /**
     * 筛选条件 公司-公司  +  公司-个人
     * @param filterParameter
     * @return
     */


}
