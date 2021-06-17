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

 Date: 17/06/2021 12:17:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_professor_tags
-- ----------------------------
DROP TABLE IF EXISTS `tbl_professor_tags`;
CREATE TABLE `tbl_professor_tags`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '行业专家库标签列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_professor_tags
-- ----------------------------
INSERT INTO `tbl_professor_tags` VALUES (1, '电气');
INSERT INTO `tbl_professor_tags` VALUES (2, '信息化');
INSERT INTO `tbl_professor_tags` VALUES (3, '机械');
INSERT INTO `tbl_professor_tags` VALUES (4, '印钞工艺');
INSERT INTO `tbl_professor_tags` VALUES (5, '科管');
INSERT INTO `tbl_professor_tags` VALUES (6, '钞纸工艺');
INSERT INTO `tbl_professor_tags` VALUES (7, '印刷工艺');
INSERT INTO `tbl_professor_tags` VALUES (8, '胶印');
INSERT INTO `tbl_professor_tags` VALUES (9, '凹印');
INSERT INTO `tbl_professor_tags` VALUES (10, '印码');
INSERT INTO `tbl_professor_tags` VALUES (11, '检封');
INSERT INTO `tbl_professor_tags` VALUES (12, '打浆');
INSERT INTO `tbl_professor_tags` VALUES (13, '环保');
INSERT INTO `tbl_professor_tags` VALUES (14, '印钞设备');
INSERT INTO `tbl_professor_tags` VALUES (15, '钞纸设备');
INSERT INTO `tbl_professor_tags` VALUES (16, '油墨工艺');
INSERT INTO `tbl_professor_tags` VALUES (17, '制版');

SET FOREIGN_KEY_CHECKS = 1;
