富文本编辑器原理：
<button onclick="boldFont()">加粗<button> 
<button onclick="italicFont()">倾斜<button> 
<button onclick="redFont()">字体红色<button> 
<div contenteditable style="border:1px solid #dedede; width:400px; min-height:300px;">
    <img src="http：//img5.imgtn.bding.com/it/u=394753335xxxxxxx&gp=0.jpg">
</div>

<!-- 老浏览器用<iframe designmode="on"  /> -->

<script>
    var boldFont = function(){
        document.execCommand('bold')
    }
    var italicFont = function(){
        document.execCommand('italic')
    }
    var redFont = function(){
        document.execCommand('foreColor',null,'#f00')
    }
</script>

富文本编辑器： KindEditor、   UEditor(百度的)、 wangeditor、 edit.md(支持markdown) 等

数据可视化：1、canvas 位图  2、 svg 矢量图  3、 三维 webgl
           √4、echart 5、highcharts 6、d3 dataV antV 
           egret 游戏   rapheal.js等