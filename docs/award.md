---
sidebar: false
aside: true
---

<script setup>
import { ref } from 'vue'

const activeTab = ref('ICPC')

const tabs = ['ICPC', 'CCPC', '蓝桥杯', '天梯赛']

const awards = {
  ICPC: {
    title: 'ICPC 国际大学生程序设计竞赛',
    icon: '🌍',
    levels: [
      { label: '🥇 金奖', color: 'gold', items: [
          { year: '2025', competition: 'ICPC 亚洲区域赛（南京站）', team: 'XAUAT-1', members: '张三, 李四, 王五' },
        ] },
      { label: '🥈 银奖', color: 'silver', items: [
          { year: '2025', competition: 'ICPC 亚洲区域赛（西安站）', team: 'XAUAT-2', members: '赵六, 孙七, 周八' },
          { year: '2024', competition: 'ICPC 亚洲区域赛（济南站）', team: 'XAUAT-3', members: '吴九, 郑十, 陈十一' },
        ] },
      { label: '🥉 铜奖', color: 'bronze', items: [
          { year: '2024', competition: 'ICPC 邀请赛（武汉站）', members: '钱十二' },
        ] },
    ],
  },
  CCPC: {
    title: 'CCPC 中国大学生程序设计竞赛',
    icon: '🇨🇳',
    levels: [
      { label: '🥇 金奖', color: 'gold', items: [] },
      { label: '🥈 银奖', color: 'silver', items: [
          { year: '2025', competition: 'CCPC 西安站', team: 'XAUAT-1', members: '张三, 李四, 王五' },
        ] },
      { label: '🥉 铜奖', color: 'bronze', items: [
          { year: '2025', competition: 'CCPC 秦皇岛站', team: 'XAUAT-2', members: '赵六, 孙七, 周八' },
          { year: '2024', competition: 'CCPC 哈尔滨站', team: 'XAUAT-3', members: '吴九, 郑十' },
        ] },
    ],
  },
  蓝桥杯: {
    title: '蓝桥杯全国软件和信息技术专业人才大赛',
    icon: '🏔️',
    sections: [
      {
        year: '2025',
        groups: [
          {
            label: '国赛',
            levels: [
              { label: '🥇 国一', color: 'gold', items: [] },
              { label: '🥈 国二', color: 'silver', items: [] },
              { label: '🥉 国三', color: 'bronze', items: [] },
            ],
          },
          {
            label: '省赛',
            levels: [
              { label: '省一', color: 'iron', items: [
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '陈碧辉' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '张渊博' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '邹凯' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '张帅' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '王树茂' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '尹志学' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '王咸宝' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '谢钰涵' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '王艺璇' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '孙浩然' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘易通' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '刘昊' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '庞钧溢' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '刘耀名' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '黄章满' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王子鹏' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王思远' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '徐功锋' },
                ] },
              { label: '省二', color: 'iron', items: [
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '袁浩然' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘济荣' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '党荣博' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李家琦' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '王杰' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '陈明熙' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '陈广鹏' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘弋睿' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李启燚' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '孔诚明' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '江灵峰' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '姚艺欣' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '周子栋' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '魏熇' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '岳可鑫' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '宁欢怡' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李康乐' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '林声舜' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '柳耀鲲' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '胡乐乐' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '汪科' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '秦卓' },
                { year: '2025', competition: '蓝桥杯 Java 软件开发大学B 组（省赛）', members: '眭蕊杰' },
                { year: '2025', competition: '蓝桥杯 Java 软件开发研究生组（省赛）', members: '郭旭东' },
                { year: '2025', competition: '蓝桥杯 Java 软件开发研究生组（省赛）', members: '周华昊' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '朱西佑' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '傅佳乐' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '孙康鑫' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '宗子涵' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '武国侠' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '徐亚鹏' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '陈芃倩' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '赵佳钰' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '林宇豪' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王越' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '蔡金桦' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '周奕' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '吴丹丹' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '吴潼' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '文乐' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王圣' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '张文通' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计研究生组（省赛）', members: '贾国豪' },
                { year: '2025', competition: '蓝桥杯 Web 应用开发大学组（省赛）', members: '李倩慧' },
                { year: '2025', competition: '蓝桥杯 Web 应用开发大学组（省赛）', members: '杨冰洁' },
                ] },
              { label: '省三', color: 'iron', items: [
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '张予涵' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '丁紫曦' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李昕康' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李延康' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '周映文' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '何宛清' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '霍橡宏' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '黄永智' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '何瑾烨' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '贺继宏' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '王雨荷' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李重阳' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '黄俊杰' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '王孟春' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '苗志聪' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '冯雪' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '邓先凯' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李媛锐' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '鲁欣欣' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '汪华峰' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '张益华' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '张英杰' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '刘世博' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '谢雨航' },
                { year: '2025', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '朱普煦' },
                { year: '2025', competition: '蓝桥杯 Java 软件开发大学B 组（省赛）', members: '孙巧璇' },
                { year: '2025', competition: '蓝桥杯 Java 软件开发大学B 组（省赛）', members: '王腾坤' },
                { year: '2025', competition: '蓝桥杯 Java 软件开发大学B 组（省赛）', members: '董益豪' },
                { year: '2025', competition: '蓝桥杯 Java 软件开发研究生组（省赛）', members: '郭利娜' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '潘扬' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '童军' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '赵懿辰' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '张行健' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王奕博' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '董淇' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '袁红兵' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '丁雅丝' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '刘可俐' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '吴兴扬' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '乔佳翔' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '贺祺轩' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '黄宇彦' },
                { year: '2025', competition: '蓝桥杯 Python 程序设计研究生组（省赛）', members: '黄松辰' },
                { year: '2025', competition: '蓝桥杯 Web 应用开发大学组（省赛）', members: '韦欣' },
                ] },
            ],
          },
        ],
      },
      {
        year: '2026',
        groups: [
          {
            label: '国赛',
            levels: [
              { label: '🥇 国一', color: 'gold', items: [
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '张渊博' },
                ] },
              { label: '🥈 国二', color: 'silver', items: [
                  { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '潘扬' },
                  { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '黄章满' },
                  { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '庞钧溢' },
                  { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '王子鹏' },
                  { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '苑晓舰' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '孙子芮' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '邹凯' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '姚艺欣' },
                ] },
              { label: '🥉 国三', color: 'bronze', items: [
                  { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '王思远' },
                  { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '叶帅杰' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '杨帆' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '刘家林' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '张帅' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '刘济荣' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '王树茂' },
                  { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学研究生组（国赛）', members: '郭旭东' },
                ] },
            ],
          },
          {
            label: '省赛',
            levels: [
              { label: '省一', color: 'iron', items: [
                { year: '2026', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '郭旭东' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '张渊博' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '张帅' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '姚艺欣' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '尹志学' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '邹凯' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '杨帆' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘济荣' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '孙子芮' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '赵硕' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '谢钰涵' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘家林' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘易通' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '王树茂' },
              { year: '2026', competition: '蓝桥杯 Java 软件开发研究生组（省赛）', members: '秦卓' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计研究生组（省赛）', members: '周大能' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '叶帅杰' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '黄章满' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '刘耀名' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '庞钧溢' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王子鹏' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '潘扬' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '苏凯煊' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '苑晓舰' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王思远' },
                ] },
              { label: '省二', color: 'iron', items: [
                { year: '2026', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '杨舒雯' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '倪可馨' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘弋睿' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘士茹' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '张一凡' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '魏麟泽' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李昕康' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '侯雅琼' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '陈泓杉' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '蒋曼' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '汪华峰' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '王艺璇' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '陈明熙' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '侯今坤' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '刘昊' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '张行健' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王圣' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '王越' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '刘鑫艳' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '李雯' },
                ] },
              { label: '省三', color: 'iron', items: [
{ year: '2026', competition: '蓝桥杯 C/C++程序设计研究生组（省赛）', members: '李玖洋' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '刘圳夏' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '梁永烨' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '杨心柔' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '袁浩然' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '沈丹妮' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '吴绪东' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '龚柏宇' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '庄普玉' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '何宛清' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '李宛真' },
              { year: '2026', competition: '蓝桥杯 C/C++程序设计大学B 组（省赛）', members: '安阳旭' },
              { year: '2026', competition: '蓝桥杯 Java 软件开发大学B 组（省赛）', members: '张杰柯' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计研究生组（省赛）', members: '张毅' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '林宇豪' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '李昊轩' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '薛旭阳' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '南亦凡' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '毛亮宇' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '邵静茵' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '赵佳欢' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '朱航仪' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学B 组（省赛）', members: '李安民' },
                ] },
            ],
          },
        ],
      },
    ],
  },
  天梯赛: {
    title: '中国高校计算机大赛-团体程序设计天梯赛',
    icon: '🪜',
    subsections: [
      {
        title: '团队奖项',
        levels: [
          { label: '🥇 国一', color: 'gold', items: [] },
          { label: '🥈 国二', color: 'silver', items: [] },
          { label: '🥉 国三', color: 'bronze', items: [
              { year: '2025', competition: '天梯赛全国总决赛', members: '张三, 李四, 王五, 赵六, 孙七, 周八, 吴九, 郑十, 陈十一, 钱十二' },
            ] },
          { label: '省一', color: 'iron', items: [
              { year: '2024', competition: '天梯赛陕西省赛', members: '张三, 李四, 王五, 赵六, 孙七, 周八, 吴九, 郑十, 陈十一, 钱十二' },
            ] },
          { label: '省二', color: 'iron', items: [] },
          { label: '省三', color: 'iron', items: [] },
        ],
      },
      {
        title: '个人奖项',
        levels: [
          { label: '🥇 国一', color: 'gold', items: [] },
          { label: '🥈 国二', color: 'silver', items: [
              { year: '2025', competition: '天梯赛个人排名', members: '张三' },
            ] },
          { label: '🥉 国三', color: 'bronze', items: [] },
        ],
      },
    ],
  },
}

function levelClass(color) {
  return { gold: 'lv-gold', silver: 'lv-silver', bronze: 'lv-bronze', iron: 'lv-iron' }[color] || ''
}

const achievedSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 11l3.5 3.5L16 6" stroke="#49b1f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const unachievedSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5l-10 10" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/></svg>'

function flatItems(data) {
  if (!data) return []
  if (data.subsections) {
    return data.subsections.flatMap(sub =>
      sub.levels.flatMap(level =>
        level.items.map(item => ({ ...item, award: level.label, color: level.color }))
      )
    )
  }
  return data.levels.flatMap(level =>
    level.items.map(item => ({ ...item, award: level.label, color: level.color }))
  )
}

/* ===== 蓝桥杯折叠（国赛/省赛分组） ===== */
const lanqiaoExpanded = ref(new Set(['2026-国赛']))

function toggleLanqiaoGroup(key) {
  if (lanqiaoExpanded.value.has(key)) {
    lanqiaoExpanded.value.delete(key)
  } else {
    lanqiaoExpanded.value.add(key)
  }
  lanqiaoExpanded.value = new Set(lanqiaoExpanded.value)
}

// 扁平列表：年份头 → 国赛/省赛组头 → 表，单层 v-for 避开 SSR 嵌套限制
const lanqiaoFlatList = (() => {
  const list = []
  const sortedSections = (awards['蓝桥杯'].sections || []).slice().sort((a, b) => Number(b.year) - Number(a.year))
  for (const sec of sortedSections) {
    let yearTotal = 0
    for (const grp of (sec.groups || [])) {
      const items = grp.levels ? grp.levels.flatMap(level =>
        level.items.map(item => ({ ...item, award: level.label, color: level.color }))
      ) : []
      yearTotal += items.length
    }
    list.push({ _type: 'year', _key: `y-${sec.year}`, _count: yearTotal, year: sec.year })
    for (const grp of (sec.groups || [])) {
      const items = grp.levels ? grp.levels.flatMap(level =>
        level.items.map(item => ({ ...item, award: level.label, color: level.color }))
      ) : []
      const gkey = `${sec.year}-${grp.label}`
      list.push({ _type: 'group', _key: `g-${gkey}`, year: sec.year, group: grp.label, _count: items.length, _gkey: gkey })
      list.push({ _type: 'table-open', _key: `to-${gkey}`, _gkey: gkey })
      list.push({ _type: 'header', _key: `h-${gkey}`, _gkey: gkey })
      for (let i = 0; i < items.length; i++) {
        list.push({ ...items[i], _type: 'item', _key: `i-${gkey}-${i}`, _gkey: gkey })
      }
      list.push({ _type: 'table-close', _key: `tc-${gkey}`, _gkey: gkey })
    }
  }
  return list
})()

// 蓝桥杯汇总统计（跨年份跨组聚合）
const lanqiaoSummary = (() => {
  const labelOrder = ['🥇 国一', '🥈 国二', '🥉 国三', '省一', '省二', '省三']
  const colorMap = { '🥇 国一': 'gold', '🥈 国二': 'silver', '🥉 国三': 'bronze', '省一': 'iron', '省二': 'iron', '省三': 'iron' }
  const merged = {}
  for (const label of labelOrder) merged[label] = { label, color: colorMap[label], count: 0 }
  for (const sec of (awards['蓝桥杯'].sections || [])) {
    for (const grp of (sec.groups || [])) {
      for (const level of (grp.levels || [])) {
        if (merged[level.label]) merged[level.label].count += level.items.length
      }
    }
  }
  return labelOrder.map(l => merged[l])
})()

</script>

# 🏆 获奖荣誉

<div class="award-page">

<div class="award-tabs">
  <button
    v-for="tab in tabs"
    :key="tab"
    class="award-tab"
    :class="{ active: activeTab === tab }"
    @click="activeTab = tab"
  >
    {{ tab }}
  </button>
</div>

<div class="award-section" v-show="activeTab === 'ICPC'">
  <div class="award-section-head">
    <img src="/images/icpc-logo.png" alt="ICPC" class="award-logo" />
    <span class="award-section-title">{{ awards.ICPC.title }}</span>
  </div>
  <div class="award-levels-grid">
    <div class="award-level-col" v-for="level in awards.ICPC.levels" :key="level.label">
      <div class="award-level-head" :class="levelClass(level.color)">
        {{ level.label }}
        <span class="award-check-icon" v-html="level.items.length ? achievedSvg : unachievedSvg"></span>
      </div>
      <div class="award-level-items">
        <div class="award-count-num">{{ level.items.length || 0 }}</div>
      </div>
    </div>
  </div>

  <div v-show="flatItems(awards.ICPC).length" class="award-table-section">
    <table class="award-table">
        <colgroup><col class="at-year"><col class="at-comp"><col class="at-members"><col class="at-award"></colgroup>
        <thead><tr><th class="at-year">年份</th><th class="at-comp">比赛名称</th><th class="at-members">队员</th><th class="at-award">奖项</th></tr></thead>
        <tbody>
          <tr v-for="(item, idx) in flatItems(awards.ICPC)" :key="idx">
            <td class="at-year">{{ item.year }}</td>
            <td class="at-comp">{{ item.competition }}</td>
            <td class="at-members">{{ item.members }}</td>
            <td class="at-award"><span class="award-tag" :class="levelClass(item.color)">{{ item.award }}</span></td>
          </tr>
        </tbody>
      </table>
  </div>
</div>

<div class="award-section" v-show="activeTab === 'CCPC'">
  <div class="award-section-head">
    <img src="/images/ccpc-logo.png" alt="CCPC" class="award-logo" />
    <span class="award-section-title">{{ awards.CCPC.title }}</span>
  </div>
  <div class="award-levels-grid">
    <div class="award-level-col" v-for="level in awards.CCPC.levels" :key="level.label">
      <div class="award-level-head" :class="levelClass(level.color)">
        {{ level.label }}
        <span class="award-check-icon" v-html="level.items.length ? achievedSvg : unachievedSvg"></span>
      </div>
      <div class="award-level-items">
        <div class="award-count-num">{{ level.items.length || 0 }}</div>
      </div>
    </div>
  </div>

  <div v-show="flatItems(awards.CCPC).length" class="award-table-section">
    <table class="award-table">
        <colgroup><col class="at-year"><col class="at-comp"><col class="at-members"><col class="at-award"></colgroup>
        <thead><tr><th class="at-year">年份</th><th class="at-comp">比赛名称</th><th class="at-members">队员</th><th class="at-award">奖项</th></tr></thead>
        <tbody>
          <tr v-for="(item, idx) in flatItems(awards.CCPC)" :key="idx">
            <td class="at-year">{{ item.year }}</td>
            <td class="at-comp">{{ item.competition }}</td>
            <td class="at-members">{{ item.members }}</td>
            <td class="at-award"><span class="award-tag" :class="levelClass(item.color)">{{ item.award }}</span></td>
          </tr>
        </tbody>
      </table>
  </div>
</div>

<div class="award-section" v-show="activeTab === '蓝桥杯'">
  <div class="award-section-head">
    <img src="/images/lanqiao-logo.png" alt="蓝桥杯" class="award-logo" />
    <span class="award-section-title">{{ awards['蓝桥杯'].title }}</span>
  </div>

  <!-- 总体统计卡片（跨年份汇总） -->
  <div class="award-levels-grid">
    <div class="award-level-col" v-for="level in lanqiaoSummary" :key="level.label">
      <div class="award-level-head" :class="levelClass(level.color)">
        {{ level.label }}
        <span class="award-check-icon" v-html="level.count ? achievedSvg : unachievedSvg"></span>
      </div>
      <div class="award-level-items">
        <div class="award-count-num">{{ level.count || 0 }}</div>
      </div>
    </div>
  </div>

  <!-- 按年份分组（扁平列表，单层 v-for，避开 SSR 嵌套限制） -->
  <template v-for="entry in lanqiaoFlatList" :key="entry._key">
    <!-- 年份头 -->
    <div v-if="entry._type === 'year'" class="lanqiao-year-header">
      <span class="lanqiao-year-label">{{ entry.year }} 年</span>
      <span class="lanqiao-year-count">{{ entry._count }} 人获奖</span>
    </div>
    <!-- 国赛/省赛 组头 -->
    <div v-else-if="entry._type === 'group'" class="lanqiao-group-header" @click="toggleLanqiaoGroup(entry._gkey)">
      <span class="lanqiao-year-arrow">{{ lanqiaoExpanded.has(entry._gkey) ? '▼' : '▶' }}</span>
      <span class="lanqiao-group-label">{{ entry.group }}</span>
      <span class="lanqiao-year-count">{{ entry._count }} 人</span>
    </div>
    <!-- 表内容（受 _gkey 控制展开） -->
    <div v-else-if="entry._type === 'table-open' && lanqiaoExpanded.has(entry._gkey)" class="lanqiao-table-box">
    </div>
    <div v-else-if="entry._type === 'header' && lanqiaoExpanded.has(entry._gkey)" class="award-table-row award-table-head-row">
      <span class="at-year">年份</span>
      <span class="at-comp">比赛名称</span>
      <span class="at-members">队员</span>
      <span class="at-award">奖项</span>
    </div>
    <div v-else-if="entry._type === 'item' && lanqiaoExpanded.has(entry._gkey)" class="award-table-row">
      <span class="at-year">{{ entry.year }}</span>
      <span class="at-comp">{{ entry.competition }}</span>
      <span class="at-members">{{ entry.members }}</span>
      <span class="at-award"><span class="award-tag" :class="levelClass(entry.color)">{{ entry.award }}</span></span>
    </div>
    <div v-else-if="entry._type === 'table-close' && lanqiaoExpanded.has(entry._gkey)" class="lanqiao-table-box-close">
    </div>
  </template>
</div>

<div class="award-section" v-show="activeTab === '天梯赛'">
  <div class="award-section-head">
    <img src="/images/ladder-logo.png" alt="天梯赛" class="award-logo" />
    <span class="award-section-title">{{ awards['天梯赛'].title }}</span>
  </div>
  <div v-for="sub in awards['天梯赛'].subsections" :key="sub.title" class="award-subsection">
    <h3 class="award-sub-title">{{ sub.title }}</h3>
    <div class="award-levels-grid">
      <div class="award-level-col" v-for="level in sub.levels" :key="level.label">
        <div class="award-level-head" :class="levelClass(level.color)">
          {{ level.label }}
          <span class="award-check-icon" v-html="level.items.length ? achievedSvg : unachievedSvg"></span>
        </div>
        <div class="award-level-items">
          <div class="award-count-num">{{ level.items.length || 0 }}</div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="flatItems(awards['天梯赛']).length" class="award-table-section">
    <table class="award-table">
        <colgroup><col class="at-year"><col class="at-comp"><col class="at-members"><col class="at-award"></colgroup>
        <thead><tr><th class="at-year">年份</th><th class="at-comp">比赛名称</th><th class="at-members">队员</th><th class="at-award">奖项</th></tr></thead>
        <tbody>
          <tr v-for="(item, idx) in flatItems(awards['天梯赛'])" :key="idx">
            <td class="at-year">{{ item.year }}</td>
            <td class="at-comp">{{ item.competition }}</td>
            <td class="at-members">{{ item.members }}</td>
            <td class="at-award"><span class="award-tag" :class="levelClass(item.color)">{{ item.award }}</span></td>
          </tr>
        </tbody>
      </table>
  </div>
</div>

</div>
