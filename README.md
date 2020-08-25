## 说明

此项目参考于：

1. [主题aurora](https://github.com/chanshiyucx/aurora)
2. [主题volantis](https://volantis.js.org/)
3. [番茄大佬的开源项目](https://tomotoes.com/)

## 项目简介

小康的个人主页。

## 必备条件

- Nodejs 6.0 以上
- Git 可用

## 安装步骤

```bash
git clone https://github.com/sviptzk/HomePage.git
cd HomePage
npm install
npm run dev
```

如果你部署到GitHub或者Coding或者其他云托管平台，那么可以fork本项目，在线进行修改。最后到[https://travis-ci.org/](https://travis-ci.org/)进行自动部署即可。

### 持续集成做法

参照配置项及代码自行配置

```yml
language: node_js
node_js: stable

sudo: required

# Travis-CI Caching
cache:
  directories:
    - node_modules

# S: Build Lifecycle
install:
  - npm install

script:
  - npm run build
  - cd ./HomePage
  - git init
  - git config user.name "${GIT_NAME}"
  - git config user.email "${GIT_EMAIL}"
  - git add .
  - git commit -m "Update"
  - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master
  - git push --force --quiet "https://${CDT_TOKEN}@${CDT_REF}" master:master
```

关于上述代码的6个变量不知如何获取请参考：[非教程，仅供参考](https://www.antmoe.com/posts/b7924c1d/index.html)

## 功能特性

1. 使用 `scss` 作为 `css` 预处理器
2. 使用 `pug` 作为 `html` 预处理器
3. 使用 `gulp` 作为构建工具, 并以配置好构建脚本
4. 一个漂亮的导航条
5. 一个幻灯片切换的背景
6. 一个说说页面（基于gitee）
7. 一个时间轴（说说）页面（基于gitee）
8. 一个小站页面
9. 更多特性等你发现

## 配置

所有的配置项都可以在`config.json`文件中进行修改。

关于配置项字段如下：

## head

|     键      |              说明              |      |
| :---------: | :----------------------------: | ---- |
|    title    |       title标签里的内容        |      |
| description |           网页的描述           |      |
|  keywords   |          网站的关键词          |      |
|   favicon   |         网页的favicon          |      |
|    name     | qq卡片分享是的标题（如果可以） |      |
|    image    | qq卡片分享时的头像（如果可以） |      |

## link

|  键  |              说明               | 示例                |
| :--: | :-----------------------------: | ------------------- |
| cdn  | 你的cdn前缀，会与本地路径做拼接 | `cdn/css/style.css` |

## index

|     键      |                      说明                       |      |
| :---------: | :---------------------------------------------: | ---- |
|    name     |                 顶部显示的名称                  |      |
| description |               顶部名称下方的描述                |      |
|    link     |              点击name时跳转的链接               |      |
|    menu     |        传入对象，顶部的按钮。建议少于5个        |      |
|    main     |              关于主页内的一些配置               |      |
|  customCSS  | 会在head标签中插入自定义的css内容。（HTML语法） |      |
|  customJS   | 会在head标签中插入自定义的js内容。（HTML语法）  |      |

### menu子项

|  键  |                 说明                 |      |
| :--: | :----------------------------------: | ---- |
| name |              按钮的名称              |      |
| link |           点击后跳转的链接           |      |
| out  |         是否站外跳转（1或0）         |      |
| img  | 图标（使用图片，可以到iconfont下载） |      |

### main

|   键    |             说明             |      |
| :-----: | :--------------------------: | ---- |
| avatar  |           头像地址           |      |
|  quote  |        头像下方的句子        |      |
| segment | 引用条。传入对象，可以多个。 |      |

#### segment

|  键   |          说明          |      |
| :---: | :--------------------: | ---- |
| name  |      左边标签名称      |      |
| color |   标签背景及边框颜色   |      |
| body  | 内容主体。可以使用html |      |

## 说说页面与timeline页面

|        键         |                 值                 |      |
| :---------------: | :--------------------------------: | ---- |
|       quote       | 页面上方引用框里的内容。可以是HTML |      |
|       owner       |               码云ID               |      |
|       repo        |              码云仓库              |      |
|     per_page      |           每次显示的条数           |      |
| defaultLabelName  |       没有标签时显示的标签名       |      |
| defaultLabelColor |      标签没有颜色时显示的颜色      |      |

## links页面

|  键   |                 值                 |      |
| :---: | :--------------------------------: | :--: |
| quote | 页面上方引用框里的内容。可以是HTML |      |
| link  |   传入列表，列表每一项为一个对象   |      |

### link字段

|     键      |       值       |      |
| :---------: | :------------: | ---- |
|    name     |   小站的名称   |      |
|    link     |   小站的链接   |      |
|   avatar    | 小站的圆形头像 |      |
|     img     |  小站的背景图  |      |
| description |   小站的描述   |      |
|     out     |  是否站外跳转  |      |



## footer

| 键   | 值                       |      |
| ---- | ------------------------ | ---- |
| text | 底部的文本。可以使用html |      |

## global

|  键  |    值    |      |
| :--: | :------: | ---- |
|  bg  | 背景图片 |      |

> 手机模式下的图片不能通过配置进行修改，请手动修改源文件`css/layoyt/header.scss`大约22行左右