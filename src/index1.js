// 使用ES6导入jquery
import $ from 'jquery'

// 导入样式(在webpack中，一切皆可模块，都可以通过es6导入语法进行导入和使用)
// 如果某个模块中，使用from接收到的成员为undefined，则没有必要进行接收
import '@/css/index.css'
import '@/css/index.less'
import '@/js/test/info.js'

// 导入图片，得到图片路径
import logo from '@/image/logo.jpg'

// 给img标签的src动态赋值
$('.box').attr('src', logo)

// 定义jquery入口函数
$(function() {
    // 实现奇数行变色
    $('li:odd').css('background-color', 'pink')
    $('li:even').css('background-color', 'cyan')
})


// 定义一个装饰器函数
function info(target) {
    target.info = 'Person info'
}
// 定义一个普通的类
@info
class Person {}

console.log(Person.info);
