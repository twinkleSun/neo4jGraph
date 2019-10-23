package com.graphdatabase.service;

import com.graphdatabase.entity.nodeEntity.MemberNode;
import com.graphdatabase.entity.nodeEntity.PersonNode;
import com.graphdatabase.entity.relationEntity.CompanyToCompany;
import com.graphdatabase.entity.relationEntity.CompanyToMember;
import com.graphdatabase.entity.relationEntity.MemberToCompany;
import com.graphdatabase.entity.relationEntity.MemberToMember;
import com.graphdatabase.repository.nodeRepository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by twinkleStar on 2019/10/11.
 */


@Service
public class MemberNeo4jService {

    @Autowired
    MemberRepository memberRepository;

    public List<MemberNode> getNodeList() {
        List<MemberNode> memberNodes=memberRepository.findAllMemberNode();
        return memberNodes;
    }


    public List<MemberToMember> getRelationList() {
        List<MemberToMember> memberToMembers=memberRepository.findMemberToMember();
        return memberToMembers;
    }


    public List<MemberToCompany> getRelationList2() {
        List<MemberToCompany> memberToCompanies=memberRepository.findMemberToCompany();
        return memberToCompanies;
    }
}