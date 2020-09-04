"use strict";!function(t){function i(t){return new i.prototype.init(t)}i.extend=(i.prototype={constructor:i,version:"2020-09-04 v1",page:1,total_page:1,per_page:3,owner:"antmoe",repo:"speak",total_count:0,text:[],defaultLabelName:"Default",defaultLabelColor:"#ffc107",nickname:"XiaoKang🦄",highlightcss:"https://cdn.bootcdn.net/ajax/libs/highlight.js/10.1.1/styles/monokai-sublime.min.css",emojiLabel:{},init:function(t){for(var e in t)this[e]=t[e];return console.log("\n %c XiaoKang's Speak"+this.version+" %c https://docs.tzki.cn/Speak \n","color: #fff; background: #4285f4; padding:5px 0;","background: #66CCFF; padding:5px 0;"),i.setHead(this,i.getPageSpeak(this)),i.bindBtn(this),this}}).extend=function(t){for(var e in t)this[e]=t[e]},i.extend({setHead:function(){i.noRefer(),i.loadingCss()},noRefer:function(){$("head").append('<meta name="referrer" content="no-referrer" />')},loadingCss:function(){$("head").append("<style>.loader{width:150px;height:150px;margin:0 auto}svg{width:90%;fill:none}.load{transform-origin:50% 50%;stroke-dasharray:570;stroke-width:20px}.load.one{stroke:#554d73;animation:load 1.5s infinite}.load.two{stroke:#a496a4;animation:load 1.5s infinite;animation-delay:.1s}.load.three{stroke:#a5a7bb;animation:load 1.5s infinite;animation-delay:.2s}.point{animation:bounce 1s infinite ease-in-out}.point.one{fill:#a5a7bb;animation-delay:0s}.point.two{fill:#a496a4;animation-delay:.1s}.point.three{fill:#554d73;animation-delay:.2s}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes load{0%{stroke-dashoffset:570}50%{stroke-dashoffset:530}100%{stroke-dashoffset:570;transform:rotate(360deg)}}</style>")},loading:function(){$(".is-container").append('<div class="loader"><svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle class="load one" cx="60" cy="60" r="40"></circle><circle class="load two" cx="60" cy="60" r="40"></circle><circle class="load three" cx="60" cy="60" r="40"></circle><g><circle class="point one" cx="45" cy="70" r="5"></circle><circle class="point two" cx="60" cy="70" r="5"></circle><circle class="point three" cx="75" cy="70" r="5"></circle></g></svg></div>')},removeLoad:function(){$(".loader").remove()}}),i.extend({getSpeak:function(r){return $.ajax({url:"https://gitee.com/api/v5/repos/"+r.owner+"/"+r.repo+"/issues?state=open&sort=created&direction=desc&page="+r.page+"&per_page="+r.per_page+"&creator="+r.owner,type:"get",success:function(t,e,a){if(r.text=[],r.total_count=a.getResponseHeader("total_count"),r.total_page=Math.ceil(r.total_count/r.per_page),0!==t.length)for(var o in t.length<r.per_page&&$(".button").attr("disabled","disabled").attr("value","没有更多了！"),t){var n={};n.comments=t[o].comments,n.body=i.getBody(t[o].body),n.labels=i.getLabels(r,t[o].labels),n.created_at=i.getTime(t[o].created_at),n.html_url=t[o].html_url,r.text.push(n)}else $(".button").attr("disabled","disabled").attr("value","没有更多了！")}})},bindBtn:function(e){$(".button").on("click",function(t){t.preventDefault(),e.page+=1,i.getPageSpeak(e)})},getPageSpeak:function(t){i.loading(),i.getSpeak(t).then(function(){return i.createSpeak(t)})}}),i.extend({createSpeak:function(t){var e="",a=t.text;for(var o in a)e+='<div class="segment" style="border-color: '.concat(a[o].labels.color,';">\n\t\t\t\t\t\t\t\t\t\t\t<div class="label" style="color: ').concat(a[o].labels.color,';"><span style="color:').concat(i.getFontColor(a[o].labels.color),'">').concat(a[o].labels.name,'</span></div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="markdown about">').concat(a[o].body,'</div><span style="position: relative;text-align: right;width: 100%;display: inline-block;top: 15px;color: #666;font-size: 10px;">').concat(a[o].created_at,"</span></div>");i.removeLoad(),$(".is-container").append(e)}}),i.extend({getFontColor:function(t){var n=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;String.prototype.colorRgb=function(){var t=this.toLowerCase();if(t&&n.test(t)){if(4===t.length){for(var e="#",a=1;a<4;a+=1)e+=t.slice(a,a+1).concat(t.slice(a,a+1));t=e}for(var o=[],a=1;a<7;a+=2)o.push(parseInt("0x"+t.slice(a,a+2)));return"RGB("+o.join(",")+")"}return t};var e="white",a=t.colorRgb(),o=(a=(a=a.replace("RGB(","")).replace(")","")).split(",");return 450<parseInt(o[0])+parseInt(o[1])+parseInt(o[2])&&(e="black"),e},getLabels:function(t,e){var a={name:t.defaultLabelName,color:t.defaultLabelColor};return 0!==e.length&&(a.name=e[0].name,a.color="#"+e[0].color),a},getBody:function(t){var e=new marked.Renderer;return marked.setOptions({highlight:function(t){return hljs.highlightAuto(t).value}}),e.image=function(t,e,a){return'<a style="cursor: zoom-in" data-caption="'.concat(a,'" data-fancybox="gallery" href=').concat(t,'><img class="lazyload" src="').concat(t,'" data-src=').concat(t,' alt="').concat(a,'"></a>')},e.table=function(t,e){return'<div class="table-wrapper"><table><thead>'.concat(t,"</thead><tbody>").concat(e,"</tbody></table></div>")},marked(t,{renderer:e})},getTime:function(t){return Date.prototype.format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var a in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+a+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[a]:("00"+e[a]).substr((""+e[a]).length)));return t},new Date(t).format("yyyy-MM-dd hh:mm:ss")}}),i.prototype.init.prototype=i.prototype,t.Speak=i}(window);