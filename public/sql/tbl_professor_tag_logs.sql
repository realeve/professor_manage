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

 Date: 17/06/2021 12:17:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_professor_tag_logs
-- ----------------------------
DROP TABLE IF EXISTS `tbl_professor_tag_logs`;
CREATE TABLE `tbl_professor_tag_logs`  (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NULL DEFAULT NULL,
  `uid` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT 1,
  PRIMARY KEY (`log_id`) USING BTREE,
  INDEX `tag_id`(`tag_id`) USING BTREE,
  INDEX `uid`(`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '行业专家库标签详情表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_professor_tag_logs
-- ----------------------------
INSERT INTO `tbl_professor_tag_logs` VALUES (1, 2, 1, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (2, 2, 2, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (3, 3, 1, 0);
INSERT INTO `tbl_professor_tag_logs` VALUES (4, 3, 2, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (5, 4, 2, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (6, 1, 2, 0);
INSERT INTO `tbl_professor_tag_logs` VALUES (7, 4, 1, 0);
INSERT INTO `tbl_professor_tag_logs` VALUES (8, 2, 3, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (9, 3, 4, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (10, 1, 4, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (11, 5, 1, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (12, 5, 2, 0);
INSERT INTO `tbl_professor_tag_logs` VALUES (13, 5, 4, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (14, 5, 3, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (15, 8, 3, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (16, 9, 3, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (17, 14, 2, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (18, 3, 5, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (19, 7, 1, 0);
INSERT INTO `tbl_professor_tag_logs` VALUES (20, 7, 3, 0);
INSERT INTO `tbl_professor_tag_logs` VALUES (21, 7, 5, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (22, 1, 1, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (23, 4, 5, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (24, 5, 5, 1);
INSERT INTO `tbl_professor_tag_logs` VALUES (25, 3, 6, 1);

SET FOREIGN_KEY_CHECKS = 1;
