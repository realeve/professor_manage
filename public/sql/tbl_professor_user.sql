/*
 Navicat Premium Data Transfer

 Source Server         : CDN服务器
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : 10.8.1.25:3306
 Source Schema         : api_quality

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 17/06/2021 12:17:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_professor_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_professor_user`;
CREATE TABLE `tbl_professor_user`  (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `people` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '民族',
  `birth_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '出生日期',
  `hometown` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '籍贯',
  `card_type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '证件类型\r\n',
  `card_no` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '证件号码',
  `degree` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学位',
  `educate_background` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学历',
  `graduate_college` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '毕业院校',
  `graduate_date` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '毕业时间',
  `graduate_career` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所学专业',
  `career` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '从事专业',
  `political_status` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '政治面貌',
  `company` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工作单位',
  `work_time_start` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '参加工作时间',
  `duty` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职务',
  `tech_level` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职称',
  `work_status` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '在岗状态',
  `email` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电子信箱',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单位电话',
  `mobile` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `rec_time` datetime(0) NULL DEFAULT NULL COMMENT '导入时间',
  `operator_uid` int(11) NULL DEFAULT NULL COMMENT '数据导入人员',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '行业专家管理系统_user表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_professor_user
-- ----------------------------
INSERT INTO `tbl_professor_user` VALUES (1, '马立项', '男', '汉', '1970-07-31', '江苏南京', '身份证', '51012321615154545', '硕士', '研究生', NULL, '1980-07-3', '造机', NULL, '中共党员', '南币公司', '1980-07-31', '无', '正高工', '在岗', '1@163.com', '6122', '13299990000', NULL, 2);
INSERT INTO `tbl_professor_user` VALUES (2, '杨超', '男', '苗', '1992-07-31', '四川成都', '身份证', '510123199001012222', '硕士', '研究生', NULL, '2020-07-31', '印刷', NULL, '群众', '成钞', '2020-07-31', '无', '工程师', '在岗', '1@1.com', '6277', '13199990000', NULL, 2);
INSERT INTO `tbl_professor_user` VALUES (3, '张三丰2', '男', '苗', '1992-07-31', '四川成都', '身份证', '510123199001012222', '硕士', '研究生', NULL, '2020-07-31', '印刷', NULL, '群众', '成钞', '2020-07-31', '无', '工程师', '在岗', '1@1.com', '6277', '13199990000', NULL, 2);
INSERT INTO `tbl_professor_user` VALUES (4, '张五', '男', '苗', '1992-07-31', '四川成都', '身份证', '510123199001012222', '博士', '研究生', 'XX大学', '2020-07-31', '印刷', '印刷', '群众', '成钞', '2020-07-31', '无', '工程师', '在岗', '1@1.com', '6277', '13199990000', NULL, 2);
INSERT INTO `tbl_professor_user` VALUES (5, '张飞', '男', '汉', '1992-07-31', '四川成都', '身份证', '510123199101012222', '硕士', '研究生', NULL, '2020-07-31', '副食品', NULL, '党员', '阆中', '2020-07-31', '无', '工程师', '在岗', '1@1.com', '6122', '13299990000', NULL, 2);
INSERT INTO `tbl_professor_user` VALUES (6, '张飞', '男', '汉', '1992-07-31', '四川成都', '身份证', '510123199101012222', '硕士', '研究生', '未知', '2020-07-31', '副食品', '无', '党员', '阆中', '2020-07-31', '无', '工程师', '在岗', '1@1.com', '6122', '13299990000', NULL, 2);
INSERT INTO `tbl_professor_user` VALUES (8, '李飞飞', '女', '汉', '1992-07-31', '上海', '身份证', '510123199101012222', '硕士', '研究生', '新南方厨师学院', '1980-07-31', '自动化', '食品', '中共党员', '定西', '2020-07-31', '部门主任', '工程师', '在岗', '1@1.com', '（010）12345678', '13299990000', '2021-06-17 12:16:00', 2);

-- ----------------------------
-- Triggers structure for table tbl_professor_user
-- ----------------------------
DROP TRIGGER IF EXISTS `rectime`;
delimiter ;;
CREATE TRIGGER `rectime` BEFORE INSERT ON `tbl_professor_user` FOR EACH ROW set new.rec_time=now()
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
