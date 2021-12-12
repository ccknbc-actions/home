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
		addLine(`<span class="info">Tip</span><span> The weather in CC's city is as follows</span>`)
		addLine('$ weathercc')
		commands.weathercc();
		commands.aircc();
		commands.weather()
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
			execCommand('open /blog')
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
			execCommand('open https://www.tidio.com/talk/cc')
		},
		weather:function (){
		return 	$.ajax({
				url:'https://v2.alapi.cn/api/tianqi?token=BnqWzZxXlU9oxo6e',
				success:function (data){
					addLine(`<span class="info">Tip</span><span> The weather in your city is as follows</span>`);
					addLine('$ weather')
					addLine(`<span class='success'>City</span>  ${data.data.province} ${data.data.city}`);
					addLine(`<span class='success'>Weather</span>  ${data.data.weather} ${data.data.wind}${data.data.wind_speed} 当前温度 ${data.data.temp} ℃ 最低温度 ${data.data.min_temp} ℃ 最高温度${data.data.max_temp} ℃，`);
					addLine(`<span class='success'>Air</span>  ${data.data.aqi.air_tips}`);
					addLine(`<span class='success'>Sun</span>  日出时间：${data.data.sunrise} 日落时间：${data.data.sunset}`);
					addLine(`<span class="info">Tip</span><span> Input 'help' to see more!</span>`);
				}
			})
		},
		weathercc:function (){
		return 	$.ajax({
				url:'https://devapi.qweather.com/v7/weather/now?key=081c90ab04874a0fb4cf9ecd269b10b8&location=101190407',
				success:function (data){
					addLine(`<span class='success'>Weather</span>  ${data.now.text} ${data.now.windDir}(${data.now.wind360}°)${data.now.windScale}级 ${data.now.windSpeed}公里/小时`);
					addLine(`<span class='success'>Temp</span>  当前温度：${data.now.temp}℃ 体感温度：${data.now.feelsLike}℃`);
					addLine(`<span class='success'>Other</span>  相对湿度：${data.now.humidity} 大气压强：${data.now.pressure}hPa 能见度：${data.now.vis}km 云量：${data.now.cloud}，露点温度：${data.now.dew}℃`);
				}
			})
		},
		aircc:function (){
		return 	$.ajax({
				url:'https://devapi.qweather.com/v7/air/now?key=081c90ab04874a0fb4cf9ecd269b10b8&location=101190407',
				success:function (data){
					addLine(`<span class='success'>Air</span>  空气质量指数：${data.now.aqi} 等级：${data.now.level} 级别：${data.now.category} 主要污染物：${data.now.primary}`);
					addLine(`<span class='success'>Pollution</span>  PM10：${data.now.pm10} PM2.5：${data.now.pm2p5} 二氧化氮：${data.now.no2} 二氧化硫：${data.now.so2} 一氧化碳：${data.now.co} 臭氧：${data.now.o3}`);
				}
			})
		},
		// lifecc:function (){
		// return 	$.ajax({
		// 		url:'https://devapi.qweather.com/v7/indices/1d?type=0&location=101190407&key=081c90ab04874a0fb4cf9ecd269b10b8',
		// 		success:function (data){
		// 			addLine(`<span class='success'>Life</span>  ${data.daily.name}${data.daily.level}${data.daily.catagory}${data.daily.text}`);
		// 			addLine(`*********************`);
		// 		}
		// 	})
		// },
		open: function (command) {
			if (command.length >= 2) {
				window.open(command[1], '_blank').location;
				addLine("<span class='success'>Success</span>  Oping");
				addLine("<span class='success'>Dome</span>  :)");
			} else {
				addLine("<span class='error'>Error</span>  请输入打开的地址！");
			}
		}
	}
	init()
})()