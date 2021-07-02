(function (window, undefiend) {
	var Speak = function (obj) {
		// 传入一个对象
		return new Speak.prototype.init(obj);
	};
	Speak.prototype = {
		constructor: Speak,
		// 版本
		version: "2020-09-07 v1",
		// 当前页数
		page: 1,
		// 总页数
		total_page: 1,
		// 每次显示的页数
		per_page: 3,
		// 账户ID
		owner: "antmoe",
		// 仓库
		repo: "speak",
		// issue总数
		total_count: 0,
		// 临时存放issue
		text: [],
		// 无标签时的name
		defaultLabelName: "Default",
		// 无标签时的颜色
		defaultLabelColor: "#ffc107",
		// 昵称
		nickname: "XiaoKang🦄",
		// highlight样式
		highlightcss:
			"https://cdn.bootcdn.net/ajax/libs/highlight.js/10.1.1/styles/monokai-sublime.min.css",
		emojiLabel: {},
		init: function (obj) {
			for (let i in obj) {
				this[i] = obj[i];
			}
			console.log(
				"\n %c XiaoKang's Speak" +
				this.version +
				" %c https://docs.tzki.cn/Speak \n",
				"color: #fff; background: #4285f4; padding:5px 0;",
				"background: #66CCFF; padding:5px 0;"
			);
			Speak.setHead(this, Speak.getPageSpeak(this));
			Speak.bindBtn(this);
			return this;
		},
	};
	Speak.extend = Speak.prototype.extend = function (obj) {
		for (var key in obj) {
			this[key] = obj[key];
		}
	};
	// 插入元素方法
	Speak.extend({
		setHead: function (_this) {
			Speak.noRefer();
			Speak.loadingCss();
		},
		/**
		 * 在头部添加no-referrer标签，解决gitee图片防盗链问题
		 * @date 2020-08-10
		 * @returns {any}
		 */
		noRefer: function () {
			$("head").append('<meta name="referrer" content="no-referrer" />');
		},
		loadingCss: function () {
			$("head").append(
				"<style>.loader{width:150px;height:150px;margin:0 auto}svg{width:90%;fill:none}.load{transform-origin:50% 50%;stroke-dasharray:570;stroke-width:20px}.load.one{stroke:#554d73;animation:load 1.5s infinite}.load.two{stroke:#a496a4;animation:load 1.5s infinite;animation-delay:.1s}.load.three{stroke:#a5a7bb;animation:load 1.5s infinite;animation-delay:.2s}.point{animation:bounce 1s infinite ease-in-out}.point.one{fill:#a5a7bb;animation-delay:0s}.point.two{fill:#a496a4;animation-delay:.1s}.point.three{fill:#554d73;animation-delay:.2s}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes load{0%{stroke-dashoffset:570}50%{stroke-dashoffset:530}100%{stroke-dashoffset:570;transform:rotate(360deg)}}</style>"
			);
		},
		loading: function () {
			$(".is-container").append(
				`<div class="loader"><svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle class="load one" cx="60" cy="60" r="40"></circle><circle class="load two" cx="60" cy="60" r="40"></circle><circle class="load three" cx="60" cy="60" r="40"></circle><g><circle class="point one" cx="45" cy="70" r="5"></circle><circle class="point two" cx="60" cy="70" r="5"></circle><circle class="point three" cx="75" cy="70" r="5"></circle></g></svg></div>`
			);
		},
		removeLoad:function (){
			$('.loader').remove()
		}
	});
	// 类方法
	Speak.extend({
		/**
		 * 获取issue
		 * @date 2020-08-10
		 * @returns {Promise}
		 */
		getSpeak: function (_this) {
			return $.ajax({
				url:
					"https://gitee.com/api/v5/repos/" +
					_this.owner +
					"/" +
					_this.repo +
					"/issues?state=open&sort=created&direction=desc&page=" +
					_this.page +
					"&per_page=" +
					_this.per_page +
					"&creator=" +
					_this.owner,
				type: "get",
				success: function (data, textStatus, request) {
					_this.text = [];
					_this.total_count = request.getResponseHeader("total_count");
					_this.total_page = Math.ceil(_this.total_count / _this.per_page);
					
					if (data.length!==0) {
						if(data.length<_this.per_page){
							$('.button').attr("disabled", "disabled").attr("value", "没有更多了！");
						}
						for (let i in data) {
							var temp = {};
							temp.comments = data[i]["comments"];
							temp.body = Speak.getBody(data[i]["body"]);
							temp.labels = Speak.getLabels(_this, data[i]["labels"]);
							temp.created_at = Speak.getTime(data[i]["created_at"]);
							temp.html_url = data[i]["html_url"];
							_this.text.push(temp);
						}
					} else {
						$('.button').attr("disabled", "disabled").attr("value", "没有更多了！");
						return;
					}
				},
			});
		},
		/**
		 * 为上一页下一页绑定事件
		 * @date 2020-08-10
		 * @returns {any}
		 */
		bindBtn: function (_this) {
		$('.button').on('click',function (e){
			e.preventDefault();
			_this.page += 1;
			Speak.getPageSpeak(_this);
		})
		},
		//
		/**
		 * 获取issue并创建
		 * @date 2020-08-10
		 * @param {any} _this
		 * @returns {any}
		 */
		getPageSpeak: function (_this) {
			Speak.loading();
			Speak.getSpeak(_this).then(() => Speak.createSpeak(_this));
		},
	});
	// 类方法 创建元素相关
	Speak.extend({
		createSpeak: function (_this) {
			let content = "";
			var text = _this.text;
			for (let i in text) {
				content += `<div class="segment" style="border-color: ${text[i].labels.color};">
											<div class="label" style="color: ${text[i].labels.color};"><span style="color:${Speak.getFontColor(text[i].labels.color)}">${text[i].labels.name}</span></div>
											<div class="markdown about">${text[i].body}</div><span style="position: relative;text-align: right;width: 100%;display: inline-block;top: 10px;right: 10px;color: #666;font-size: 10px;">${text[i].created_at}</span></div>`;
			}
			Speak.removeLoad()
			$(".is-container").append(content);
			
		},
	});
	// 类方法 数据处理
	Speak.extend({
		getFontColor: function (color) {
			var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
			String.prototype.colorRgb = function () {
				var sColor = this.toLowerCase();
				if (sColor && reg.test(sColor)) {
					if (sColor.length === 4) {
						var sColorNew = "#";
						for (var i = 1; i < 4; i += 1) {
							sColorNew += sColor
								.slice(i, i + 1)
								.concat(sColor.slice(i, i + 1));
						}
						sColor = sColorNew;
					}
					//处理六位的颜色值
					var sColorChange = [];
					for (var i = 1; i < 7; i += 2) {
						sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
					}
					return "RGB(" + sColorChange.join(",") + ")";
				} else {
					return sColor;
				}
			};
			var flag = "white";
			var rgbColor = color.colorRgb();
			rgbColor = rgbColor.replace("RGB(", "");
			rgbColor = rgbColor.replace(")", "");
		
			var temp = rgbColor.split(",");

			if (parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]) > 450) {
				// console.log(parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]));
				flag = "black";
			}
			return flag;
		},
		getLabels: function (_this, labels) {
		
			var defaultLabel = {
					name:_this.defaultLabelName,
					color:_this.defaultLabelColor,
			}
			if(labels.length!==0){
				defaultLabel.name = labels[0].name
				defaultLabel.color ='#' +labels[0].color
			}
			return defaultLabel;
		},
		getBody: function (body) {
			var rendererMD = new marked.Renderer();
			marked.setOptions({
				highlight: function (code) {
					return hljs.highlightAuto(code).value;
				},
			});
			rendererMD.image = function (url, title, text) {
				return `<a style="cursor: zoom-in" data-caption="${text}" data-fancybox="gallery" href=${url}><img class="lazyload" src="${url}" data-src=${url} alt="${text}"></a>`;
			};
			rendererMD.table = function (header,body){
				return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`
			}
			return marked(body, { renderer: rendererMD });
		},
		getTime: function (time) {
			Date.prototype.format = function (format) {
				/*
				 * eg:format="YYYY-MM-dd hh:mm:ss";
				 */
				var o = {
					"M+": this.getMonth() + 1, // month
					"d+": this.getDate(), // day
					"h+": this.getHours(), // hour
					"m+": this.getMinutes(), // minute
					"s+": this.getSeconds(), // second
					"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
					S: this.getMilliseconds(),
					// millisecond
				};
				if (/(y+)/.test(format)) {
					format = format.replace(
						RegExp.$1,
						(this.getFullYear() + "").substr(4 - RegExp.$1.length)
					);
				}
				for (var k in o) {
					if (new RegExp("(" + k + ")").test(format)) {
						format = format.replace(
							RegExp.$1,
							RegExp.$1.length == 1
								? o[k]
								: ("00" + o[k]).substr(("" + o[k]).length)
						);
					}
				}
				return format;
			};
			var tempTime = new Date(time);
			return tempTime.format("yyyy-MM-dd hh:mm:ss");
		},
	});

	Speak.prototype.init.prototype = Speak.prototype;

	window.Speak = Speak;
})(window);
