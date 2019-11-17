
CREATE (node:Company { Id:1,cname:"中国机床总公司",openBranch:"建设银行迈皋桥支行",thirdBranch:"建设银行南京分行",secondBranch:"建设银行江苏分行",
custManagerName:"王涛",custManagerTel:"17721325486",category:1,manageBranch:"建设银行迈皋桥支行",regisAddress:"南京市秦淮区",
regisMoney:1000000,industryName:"制造业",businessScope:"工业机床",legalPersonName:"郭靖宇",contactPersonName:"李笑月",
contactPersonTel:"17725468741",isSupply:0}) return node

CREATE (node:Company { Id:1,cname:"他行中国机床总公司",openBranch:"建设银行迈皋桥支行",thirdBranch:"建设银行南京分行",secondBranch:"建设银行江苏分行",
custManagerName:"王涛",custManagerTel:"17721325486",category:2,manageBranch:"建设银行迈皋桥支行",regisAddress:"南京市秦淮区",
regisMoney:1000000,industryName:"制造业",businessScope:"工业机床",legalPersonName:"郭靖宇",contactPersonName:"李笑月",
contactPersonTel:"17725468741",isSupply:0}) return node

CREATE (node:Company { Id:1,cname:"供应链中国机床总公司",openBranch:"建设银行迈皋桥支行",thirdBranch:"建设银行南京分行",secondBranch:"建设银行江苏分行",
custManagerName:"王涛",custManagerTel:"17721325486",category:1,manageBranch:"建设银行迈皋桥支行",regisAddress:"南京市秦淮区",
regisMoney:1000000,industryName:"制造业",businessScope:"工业机床",legalPersonName:"郭靖宇",contactPersonName:"李笑月",
contactPersonTel:"17725468741",isSupply:1}) return node

CREATE (node:Company { Id:1,cname:"威马农机股份有限公司",openBranch:"建设银行御道街支行",thirdBranch:"建设银行南京分行",secondBranch:"建设银行江苏分行",
custManagerName:"刘原野",custManagerTel:"17721325486",category:1,manageBranch:"建设银行迈皋桥支行",regisAddress:"南京市江宁区",
regisMoney:1000000,industryName:"制造业",businessScope:"农业机械",legalPersonName:"袁帅",contactPersonName:"赵莹莹",
contactPersonTel:"17725468741",isSupply:0}) return node

CREATE (node:Company { Id:1,cname:"他行威马农机股份有限公司",openBranch:"建设银行御道街支行",thirdBranch:"建设银行南京分行",secondBranch:"建设银行江苏分行",
custManagerName:"刘原野",custManagerTel:"17721325486",category:2,manageBranch:"建设银行迈皋桥支行",regisAddress:"南京市江宁区",
regisMoney:1000000,industryName:"制造业",businessScope:"农业机械",legalPersonName:"袁帅",contactPersonName:"赵莹莹",
contactPersonTel:"17725468741",isSupply:0}) return node


CREATE (node:Company { Id:1,cname:"供应链威马农机股份有限公司",openBranch:"建设银行御道街支行",thirdBranch:"建设银行南京分行",secondBranch:"建设银行江苏分行",
custManagerName:"刘原野",custManagerTel:"17721325486",category:1,manageBranch:"建设银行迈皋桥支行",regisAddress:"南京市江宁区",
regisMoney:1000000,industryName:"制造业",businessScope:"农业机械",legalPersonName:"袁帅",contactPersonName:"赵莹莹",
contactPersonTel:"17725468741",isSupply:1}) return node

/*relation*/

MATCH (node1:Company),(node2:Company)
where node1.cname="中国机床总公司" and node2.cname="他行中国机床总公司"
CREATE (node1)-[r:relation_cc{id:1,transMoney:1000,transNum:100,transAvg:10000,transSum:1234.56,timeRange:"2019年11月",
startName:"中国机床总公司",endName:"他行中国机床总公司"}]->(node2)
RETURN node1,r,node2

MATCH (node1:Company),(node2:Company)
where node1.cname="他行中国机床总公司" and node2.cname="供应链中国机床总公司"
CREATE (node1)-[r:relation_cc{id:1,transMoney:2300,transNum:100,transAvg:10000,transSum:1234.56,timeRange:"2019年11月",
startName:"他行中国机床总公司",endName:"供应链中国机床总公司"}]->(node2)
RETURN node1,r,node2


MATCH (node1:Company),(node2:Company)
where node1.cname="中国机床总公司" and node2.cname="威马农机股份有限公司"
CREATE (node1)-[r:relation_cc{id:1,transMoney:2300,transNum:100,transAvg:10000,transSum:1234.56,timeRange:"2019年11月",
startName:"中国机床总公司",endName:"威马农机股份有限公司"}]->(node2)
RETURN node1,r,node2


MATCH (node1:Company),(node2:Company)
where node1.cname="威马农机股份有限公司" and node2.cname="他行威马农机股份有限公司"
CREATE (node1)-[r:relation_cc{id:1,transMoney:2300,transNum:100,transAvg:10000,transSum:1234.56,timeRange:"2019年11月",
startName:"威马农机股份有限公司",endName:"他行威马农机股份有限公司"}]->(node2)
RETURN node1,r,node2

MATCH (node1:Company),(node2:Company)
where node1.cname="威马农机股份有限公司" and node2.cname="中国机床总公司"
CREATE (node1)-[r:relation_cc{id:1,transMoney:2300,transNum:100,transAvg:10000,transSum:1234.56,timeRange:"2019年11月",
startName:"威马农机股份有限公司",endName:"中国机床总公司"}]->(node2)
RETURN node1,r,node2

MATCH (node1:Company),(node2:Company)
where node1.cname="供应链威马农机股份有限公司" and node2.cname="中国机床总公司"
CREATE (node1)-[r:relation_cc{id:1,transMoney:2300,transNum:100,transAvg:10000,transSum:1234.56,timeRange:"2019年11月",
startName:"供应链威马农机股份有限公司",endName:"中国机床总公司"}]->(node2)
RETURN node1,r,node2

