(function () {
	$(document).ready(function () {
		$('#input').find('input').focus();
	});
	$('#input').cssConsole({
		inputName: 'console',
		charLimit: 60,
		onEnter: function () {
			addLine("$ " + $('#input').find('input').val());
			execCommand($('#input').find('input').val());
			$('#input').cssConsole('reset').find('input').focus();
			// $('#input').find('input').focus();
		}
	});

	var lineLimit = 28;

	$('.container').on('click', function () {
		$('#input').find('input').focus();
	});

	function addLine(input, style, color) {
		if ($('.console div').length == lineLimit) {
			$('.console div').eq(0).remove();
		}
		style = typeof style !== 'undefined' ? style : '';
		color = typeof color !== 'undefined' ? color : '';
		$('.console').append('<p class="' + style + ' ' + color + '">' + input + '</p>');
		$('html').scrollTop($('html')[0].scrollHeight);
		$('.terminalWindow').scrollTop($('.terminalWindow')[0].scrollHeight);
	}
	function execCommand(command) {
		command = command.split(' ')
		if (commands[command[0]]) {
			return commands[command[0]](command);
		} else {
			addLine("Command '" + command + "' was not found.Input 'help' to see help doc!");
		}
	}
	function init() {
		var time = new Date()
		addLine('Welcome to CC的个人主页.')
		addLine('$ cd CC')
		addLine('<span class="system">System</span> <span>Thanks for your visit,let me introduce myself.</span>')
		addLine(`<span class="time">${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}</span> <span class="info">Name:</span><span> CC</span>`)
		addLine(`<span class="time">${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}</span> <span class="info">Sex:</span><span> Male</span>`)
		addLine(`<span class="time">${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}</span> <span class="info">Address:</span><span> Hubei,China</span>`)
		addLine(`<span class="time">${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}</span> <span class="info">Email:</span><span> cc@ccknbc.cc</span>`)
		addLine(`<span class="success">Done</span><span> Myself introduction is over!</span>`)
		commands.weather()
		// addLine(`<span class="info">Tip</span><span> The weather in CC's city is as follows</span>`)
		// addLine('$ weathercc')
		// commands.weathercc()
	}
	var commands = {
		help: function () {
			addLine("Available command list:");
			addLine("<span class='success'>blog</span>   open CC's blog");
			// addLine("<span class='success'>skill</span>   see CC's skill");
			// addLine("<span class='success'>me</span>   About CC");
			addLine("<span class='success'>source</span>   see my site source");
			addLine("<span class='success'>chat</span>   Chat With CC Online");
		},
		blog: function () {
			execCommand('open https://blog.ccknbc.cc')
		},
		skill: function () {
			addLine("<span class='contact'>D</span> :  Python -999/100 ");
			addLine("<span class='contact'>D</span> :  JavaScript -999/100 ");
			addLine("<span class='contact'>D</span> :  Node.JS -999/100 ");
			addLine("<span class='contact'>D</span> :  CSS -999/100 ");
		},
		me: function () {
			execCommand('open https://blog.ccknbc.cc/me/')
		},
		source:function (){
			execCommand('open https://github.com/ccknbc-actions/home')
		},
		chat: function () {
			execCommand('open https://chatting.page/cc')
		},
		// weather:function (){
		// return 	$.ajax({
		// 		url:'https://v2.alapi.cn/api/tianqi?token=BnqWzZxXlU9oxo6e',
		// 		success:function (data){
		// 			addLine(`<span class="info">Tip</span><span> The weather in your city is as follows</span>`);
		// 			addLine('$ weather')
		// 			addLine(`<span class='success'>City</span>  ${data.data.province} ${data.data.city}`);
		// 			addLine(`<span class='success'>Weather</span>  ${data.data.weather} ${data.data.wind}${data.data.wind_speed} 当前温度 ${data.data.temp} ℃ 最低温度 ${data.data.min_temp} ℃ 最高温度${data.data.max_temp} ℃，`);
		// 			addLine(`<span class='success'>Air</span>  ${data.data.aqi.air_tips}`);
		// 			addLine(`<span class='success'>Sun</span>  日出时间：${data.data.sunrise} 日落时间：${data.data.sunset}`);
		// 			addLine(`<span class="info">Tip</span><span> Input 'help' to see more!</span>`);
		// 		}
		// 	})
		// },
		// weather1:function (){
		// return 	$.ajax({
		// 		url:'http://t.weather.itboy.net/api/weather/city/101190407',
		// 		success:function (data1){
		// 			addLine(`<span class="info">Tip</span><span> The weather in your city is as follows</span>`);
		// 			addLine('$ weather1')
		// 			addLine(`<span class='success'>City</span>  ${data1.data.forecast[0].ymd} ${data1.data.forecast[0].week} ${data1.cityInfo.parent} ${data1.cityInfo.city}`);
		// 			addLine(`<span class='success'>City</span>  ${data1.data.forecast[0].sunrise} ${data1.data.forecast[0].sunset}`);
		// 			addLine(`<span class='success'>Weather</span>  ${data1.data.forecast[0].type} ${data1.data.wendu} ${data1.data.shidu} ${data1.data.forecast[0].high} ${data1.data.forecast[0].low}`);
		// 			addLine(`<span class='success'>Air</span>  ${data1.data.quality} ${data1.data.pm25}： ${data1.data.pm10}：`);
		// 			addLine(`<span class='success'>Tip</span>  ${data1.data.forecast[0].ganmao} ${data1.data.forecast[0].notice}`);
		// 			addLine(`<span class="info">Tip</span><span> Input 'help' to see more!</span>`);
		// 		}
		// 	})
		// },
		// weathercc:function (){
		// 	return 	$.ajax({
		// 			url:'https://devapi.qweather.com/v7/weather/now?key=081c90ab04874a0fb4cf9ecd269b10b8&location=101190407',
		// 			success:function (data2){
		// 				addLine(`*********************`);
		// 				addLine(`<span class='success'>Weather</span>  ${data2.now.text} ${data2.now.windDir}(${data2.now.wind360}°)${data2.now.windScale}级 ${data2.now.windSpeed}km/h`);
		// 				addLine(`<span class='success'>Temp</span>  当前温度：${data2.now.temp}℃ 体感温度：${data2.now.feelsLike}℃`);
		// 				addLine(`<span class='success'>Other</span>  相对湿度：${data2.now.humidity}% 大气压强：${data2.now.pressure}hPa 能见度：${data2.now.vis}km 云量：${data2.now.cloud} 露点温度：${data2.now.dew}℃`);
		// 				commands.aircc()
		// 			}
		// 		})
		// 	},
		// aircc:function (){
		// 	return 	$.ajax({
		// 			url:'https://devapi.qweather.com/v7/air/now?key=081c90ab04874a0fb4cf9ecd269b10b8&location=101190407',
		// 			success:function (data3){
		// 				addLine(`<span class='success'>Air</span>  空气质量指数：${data3.now.aqi} 等级：${data3.now.level} 级别：${data3.now.category} 主要污染物：${data3.now.primary}`);
		// 				addLine(`<span class='success'>Pollution</span>  PM10：${data3.now.pm10} PM2.5：${data3.now.pm2p5} 二氧化氮：${data3.now.no2} 二氧化硫：${data3.now.so2} 一氧化碳：${data3.now.co} 臭氧：${data3.now.o3}`);
		// 				commands.lifecc()
		// 			}
		// 		})
		// 	},
		// lifecc:function (){
		// 	return 	$.ajax({
		// 			url:'https://devapi.qweather.com/v7/indices/1d?type=0&key=081c90ab04874a0fb4cf9ecd269b10b8&location=101190407',
		// 			success:function (data4){
		// 				addLine(`<span class='success'>${data4.daily[0].name}</span> ${data4.daily[0].level} ${data4.daily[0].category} ${data4.daily[0].text}`);
		// 				addLine(`<span class='success'>${data4.daily[1].name}</span> ${data4.daily[1].level} ${data4.daily[1].category} ${data4.daily[1].text}`);
		// 				addLine(`<span class='success'>${data4.daily[2].name}</span> ${data4.daily[2].level} ${data4.daily[2].category} ${data4.daily[2].text}`);
		// 				addLine(`<span class='success'>${data4.daily[3].name}</span> ${data4.daily[3].level} ${data4.daily[3].category} ${data4.daily[3].text}`);
		// 				addLine(`<span class='success'>${data4.daily[4].name}</span> ${data4.daily[4].level} ${data4.daily[4].category} ${data4.daily[4].text}`);
		// 				addLine(`<span class='success'>${data4.daily[5].name}</span> ${data4.daily[5].level} ${data4.daily[5].category} ${data4.daily[5].text}`);
		// 				addLine(`<span class='success'>${data4.daily[6].name}</span> ${data4.daily[6].level} ${data4.daily[6].category} ${data4.daily[6].text}`);
		// 				addLine(`<span class='success'>${data4.daily[7].name}</span> ${data4.daily[7].level} ${data4.daily[7].category} ${data4.daily[7].text}`);
		// 				addLine(`<span class='success'>${data4.daily[8].name}</span> ${data4.daily[8].level} ${data4.daily[8].category} ${data4.daily[8].text}`);
		// 				addLine(`<span class='success'>${data4.daily[9].name}</span> ${data4.daily[9].level} ${data4.daily[9].category} ${data4.daily[9].text}`);
		// 				addLine(`<span class='success'>${data4.daily[10].name}</span> ${data4.daily[10].level} ${data4.daily[10].category} ${data4.daily[10].text}`);
		// 				addLine(`<span class='success'>${data4.daily[11].name}</span> ${data4.daily[11].level} ${data4.daily[11].category} ${data4.daily[11].text}`);
		// 				addLine(`<span class='success'>${data4.daily[12].name}</span> ${data4.daily[12].level} ${data4.daily[12].category} ${data4.daily[12].text}`);
		// 				addLine(`<span class='success'>${data4.daily[13].name}</span> ${data4.daily[13].level} ${data4.daily[13].category} ${data4.daily[13].text}`);
		// 				addLine(`<span class='success'>${data4.daily[14].name}</span> ${data4.daily[14].level} ${data4.daily[14].category} ${data4.daily[14].text}`);
		// 				addLine(`<span class='success'>${data4.daily[15].name}</span> ${data4.daily[15].level} ${data4.daily[15].category} ${data4.daily[15].text}`);
		// 				commands.weather()
		// 			}
		// 		})
		// 	},
		weather:function (){
			return 	$.ajax({
					url:'https://api.vvhan.com/api/weather',
					success:function (data){
						addLine(`<span class="info">Tip</span><span> The weather in your city is as follows</span>`);
						addLine('$ weather')
						addLine(`*********************`);
						addLine(`<span class='success'>City</span>  ${data.city}`);
						addLine(`<span class='success'>Weather</span>  ${data.info.date} ${data.info.type} ${data.info.high} ${data.info.low} ${data.info.fengxiang}${data.info.fengli}`);
						addLine(`<span class='success'>Tip</span>  ${data.info.tip}`);
						addLine(`*********************`);
						addLine(`<span class="info">Tip</span><span> Input 'help' to see more!</span>`)
					}
				})
			},
		open: function (command) {
			if (command.length >= 2) {
				window.open(command[1], '_blank').location;
				addLine("<span class='success'>Success</span>  Oping");
				addLine("<span class='success'>Done</span>  :)");
			} else {
				addLine("<span class='error'>Error</span>  请输入打开的地址！");
			}
		}
	}
	init()
})()