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
		addLine(`<span class="info">Tip</span><span> The weather in your city is as follows</span>`)
		addLine('$ weather')
		commands.weather()
	}
	
	var commands = {
		help: function () {
			addLine("Available command list:");
			// addLine("<span class='success'>blog</span>   open CC's blog");
			// addLine("<span class='success'>skill</span>   see CC's skill");
			addLine("<span class='success'>me</span>   About CC");
			// addLine("<span class='success'>source</span>   see my site source");
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
			execCommand('open /chat')
		},
		weather:function (){
		return 	$.ajax({
				url:'https://v1.alapi.cn/api/tianqi/now',
				success:function (data){
					addLine(`*********************`)
					addLine(`<span class='success'>City</span>  ${data.data.country} ${data.data.city}`);
					addLine(`<span class='success'>Weater</span>  ${data.data.wea}`);
					addLine(`<span class='success'>Win</span>  ${data.data.win}`);
					addLine(`<span class='success'>Tip</span>  ${data.data.air_tips}`);
					addLine(`*********************`);
					addLine(`<span class="info">Tip</span><span> Input 'help' to see more!</span>`)
				}
			})
		},
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