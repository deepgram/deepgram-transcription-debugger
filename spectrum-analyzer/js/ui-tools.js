/** noUiSlider
 ** @author: Léon Gersen
 ** @documentation: http://refreshless.com/nouislider/
 **/
/*jslint browser: true, devel: true, plusplus: true, white: true, unparam: true */
!function(t,n){"use strict";if(t.zepto&&!t.fn.removeData)throw new ReferenceError("Zepto is loaded without the data module.");t.fn.noUiSlider=function(e){function a(n,e,a){t.isArray(n)||(n=[n]),t.each(n,function(t,n){"function"==typeof n&&n.call(e,a)})}function i(n){return n instanceof t||t.zepto&&t.zepto.isZ(n)}function o(e){e.preventDefault();var a,i,o=0===e.type.indexOf("touch"),r=0===e.type.indexOf("mouse"),s=0===e.type.indexOf("pointer"),l=e;return 0===e.type.indexOf("MSPointer")&&(s=!0),e.originalEvent&&(e=e.originalEvent),o&&(a=e.changedTouches[0].pageX,i=e.changedTouches[0].pageY),(r||s)&&(s||window.pageXOffset!==n||(window.pageXOffset=document.documentElement.scrollLeft,window.pageYOffset=document.documentElement.scrollTop),a=e.clientX+window.pageXOffset,i=e.clientY+window.pageYOffset),t.extend(l,{x:a,y:i})}function r(n,e,a,i,r){return n=n.replace(/\s/g,x+" ")+x,r?(r>1&&(i=t.extend(e,i)),e.on(n,t.proxy(a,i))):(i.handler=a,e.on(n,t.proxy(function(t){return this.target.is('[class*="noUi-state-"], [disabled]')?!1:void this.handler(o(t))},i)))}function s(t){return!isNaN(parseFloat(t))&&isFinite(t)}function l(t){return parseFloat(this.style[t])}function d(n,e){function a(t){return i(t)||"string"==typeof t||t===!1}var o={handles:{r:!0,t:function(t){return t=parseInt(t,10),1===t||2===t}},range:{r:!0,t:function(t,n,e){return 2!==t.length?!1:(t=[parseFloat(t[0]),parseFloat(t[1])],s(t[0])&&s(t[1])?"range"===e&&t[0]===t[1]?!1:t[1]<t[0]?!1:(n[e]=t,!0):!1)}},start:{r:!0,t:function(n,e,a){return 1===e.handles?(t.isArray(n)&&(n=n[0]),n=parseFloat(n),e.start=[n],s(n)):this.parent.range.t(n,e,a)}},connect:{t:function(t,n){return t===!0||t===!1||"lower"===t&&1===n.handles||"upper"===t&&1===n.handles}},orientation:{t:function(t){return"horizontal"===t||"vertical"===t}},margin:{r:!0,t:function(t,n,e){return t=parseFloat(t),n[e]=t,s(t)}},serialization:{r:!0,t:function(n,e){if(n.resolution)switch(n.resolution){case 1:case.1:case.01:case.001:case 1e-4:case 1e-5:break;default:return!1}else e.serialization.resolution=.01;return n.mark?"."===n.mark||","===n.mark:(e.serialization.mark=".",n.to?1===e.handles?(t.isArray(n.to)||(n.to=[n.to]),e.serialization.to=n.to,a(n.to[0])):2===n.to.length&&a(n.to[0])&&a(n.to[1]):!1)}},slide:{t:function(t){return"function"==typeof t}},set:{t:function(t,n){return this.parent.slide.t(t,n)}},step:{t:function(t,n,e){return this.parent.margin.t(t,n,e)}},init:function(){var n=this;return t.each(n,function(t,e){e.parent=n}),delete this.init,this}},r=o.init();t.each(r,function(t,a){if(a.r&&!n[t]&&0!==n[t]||(n[t]||0===n[t])&&!a.t(n[t],n,t))throw console&&console.log&&console.group&&(console.group("Invalid noUiSlider initialisation:"),console.log("Option:	",t),console.log("Value:	",n[t]),console.log("Slider:	",e[0]),console.groupEnd()),new RangeError("noUiSlider")})}function u(t,n){return Math.round(t/n)*n}function c(t,n){return t=t.toFixed(n.data("decimals")),t.replace(".",n.data("mark"))}function h(t,n,e){var a,i=t.data("nui").options,o=t.data("nui").base.data("handles"),r=t.data("nui").style;return s(n)?n===t[0].gPct(r)?!1:(n=0>n?0:n>100?100:n,i.step&&!e&&(n=u(n,k.from(i.range,i.step))),n===t[0].gPct(r)?!1:t.siblings("."+C[1]).length&&!e&&o&&(t.data("nui").number?(a=o[0][0].gPct(r)+i.margin,n=a>n?a:n):(a=o[1][0].gPct(r)-i.margin,n=n>a?a:n),n===t[0].gPct(r))?!1:(0===t.data("nui").number&&n>95?t.addClass(C[13]):t.removeClass(C[13]),t.css(r,n+"%"),t.data("store").val(c(k.is(i.range,n),t.data("nui").target)),!0)):!1}function f(e,a){var o=e.data("nui").number,s={target:e.data("nui").target,options:e.data("nui").options,handle:e,i:o};return i(a.to[o])?(r("change blur",a.to[o],O[0],s,2),r("change",a.to[o],s.options.set,s.target,1),a.to[o]):"string"==typeof a.to[o]?t('<input type="hidden" name="'+a.to[o]+'">').appendTo(e).addClass(C[3]).change(O[1]):a.to[o]===!1?{val:function(t){return t===n?this.handleElement.data("nui-val"):void this.handleElement.data("nui-val",t)},hasClass:function(){return!1},handleElement:e}:void 0}function p(t){var n=this.base,e=n.data("style"),i=t.x-this.startEvent.x,o="left"===e?n.width():n.height();"top"===e&&(i=t.y-this.startEvent.y),i=this.position+100*i/o,h(this.handle,i),a(n.data("options").slide,n.data("target"))}function g(){var n=this.base,e=this.handle;e.children().removeClass(C[4]),E.off(P.move),E.off(P.end),t("body").off(x),n.data("target").change(),a(e.data("nui").options.set,n.data("target"))}function v(n){var e=this.handle,a=e[0].gPct(e.data("nui").style);e.children().addClass(C[4]),r(P.move,E,p,{startEvent:n,position:a,base:this.base,target:this.target,handle:e}),r(P.end,E,g,{base:this.base,target:this.target,handle:e}),t("body").on("selectstart"+x,function(){return!1})}function m(t){t.stopPropagation(),g.call(this)}function b(t){if(!this.base.find("."+C[4]).length){var n,e,i,o=this.base,r=this.handles,s=o.data("style"),l=t["left"===s?"x":"y"],d="left"===s?o.width():o.height(),u={handles:[],base:{left:o.offset().left,top:o.offset().top}};for(n=0;n<r.length;n++)u.handles.push({left:r[n].offset().left,top:r[n].offset().top});i=1===r.length?0:(u.handles[0][s]+u.handles[1][s])/2,e=1===r.length||i>l?r[0]:r[1],o.addClass(C[5]),setTimeout(function(){o.removeClass(C[5])},300),h(e,100*(l-u.base[s])/d),a([e.data("nui").options.slide,e.data("nui").options.set],o.data("target")),o.data("target").change()}}function y(n){return this.each(function(e,a){a=t(a),a.addClass(C[6]);var i,o,s,u,c=t("<div/>").appendTo(a),p=[],g={base:S.base,origin:[S.origin.concat([C[1]+C[7]]),S.origin.concat([C[1]+C[8]])],handle:[S.handle.concat([C[2]+C[7]]),S.handle.concat([C[2]+C[8]])]};for(n=t.extend({handles:2,margin:0,orientation:"horizontal"},n)||{},n.serialization||(n.serialization={to:[!1,!1],resolution:.01,mark:"."}),d(n,a),n.S=n.serialization,n.connect?"lower"===n.connect?(g.base.push(C[9],C[9]+C[7]),g.origin[0].push(C[12])):(g.base.push(C[9]+C[8],C[12]),g.origin[0].push(C[9])):g.base.push(C[12]),o="vertical"===n.orientation?"top":"left",s=n.S.resolution.toString().split("."),s="1"===s[0]?0:s[1].length,"vertical"===n.orientation?g.base.push(C[10]):g.base.push(C[11]),c.addClass(g.base.join(" ")).data("target",a),a.data({base:c,mark:n.S.mark,decimals:s}),i=0;i<n.handles;i++)u=t("<div><div/></div>").appendTo(c),u.addClass(g.origin[i].join(" ")),u.children().addClass(g.handle[i].join(" ")),r(P.start,u.children(),v,{base:c,target:a,handle:u}),r(P.end,u.children(),m,{base:c,target:a,handle:u}),u.data("nui",{target:a,decimals:s,options:n,base:c,style:o,number:i}).data("store",f(u,n.S)),u[0].gPct=l,p.push(u),h(u,k.to(n.range,n.start[i]));c.data({options:n,handles:p,style:o}),a.data({handles:p}),r(P.end,c,b,{base:c,target:a,handles:p})})}function w(){var n=[];return t.each(t(this).data("handles"),function(t,e){n.push(e.data("store").val())}),1===n.length?n[0]:n}function U(e,i){return e===n?w.call(this):(i=i===!0?{trigger:!0}:i||{},t.isArray(e)||(e=[e]),this.each(function(o,r){r=t(r),t.each(t(this).data("handles"),function(o,s){if(null!==e[o]&&e[o]!==n){var l,d,u,f=s.data("nui").options.range,p=e[o];i.trusted=!0,(i.trusted===!1||1===e.length)&&(i.trusted=!1),2===e.length&&t.inArray(null,e)>=0&&(i.trusted=!1),"string"===t.type(p)&&(p=p.replace(",",".")),p=k.to(f,parseFloat(p)),u=h(s,p,i.trusted),i.trigger&&a(s.data("nui").options.set,r),u||(l=s.data("store").val(),d=k.is(f,s[0].gPct(s.data("nui").style)),l!==d&&s.data("store").val(c(d,r)))}})}))}var x=".nui",E=t(document),P={start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},z=t.fn.val,C=["noUi-base","noUi-origin","noUi-handle","noUi-input","noUi-active","noUi-state-tap","noUi-target","-lower","-upper","noUi-connect","noUi-vertical","noUi-horizontal","noUi-background","noUi-z-index"],S={base:[C[0]],origin:[C[1]],handle:[C[2]]},k={to:function(t,n){return n=t[0]<0?n+Math.abs(t[0]):n-t[0],100*n/this.len(t)},from:function(t,n){return 100*n/this.len(t)},is:function(t,n){return n*this.len(t)/100+t[0]},len:function(t){return t[0]>t[1]?t[0]-t[1]:t[1]-t[0]}},O=[function(){this.target.val([this.i?null:this.val(),this.i?this.val():null],{trusted:!1})},function(t){t.stopPropagation()}];return window.navigator.pointerEnabled?P={start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled&&(P={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}),t.fn.val=function(){return this.hasClass(C[6])?U.apply(this,arguments):z.apply(this,arguments)},y.call(this,e)}}($);
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
//LEGACY CODE. HAS BEEN SUPERCEDED BY demoClass.js

//thanks to http://stackoverflow.com/questions/11101364/javascript-detect-shift-key-down-within-another-function
var shiftDown = false;
var setShiftDown = function(event){
	if(event.keyCode === 16 || event.charCode === 16){ //for future reference, alt key is 18
		shiftDown = true;
	}
};

var setShiftUp = function(event){
	if(event.keyCode === 16 || event.charCode === 16){
		shiftDown = false;
	}
};

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

$(document).on("keydown", function(e){
	setShiftDown(e);
});

$(document).on("keyup", function(e){
	setShiftUp(e);
});

$(document).on("scriptLoaded", function(){

	if (typeof(ui) !== "undefined"){
		for (var prop in ui){

			(function(prop){

				propContainerSelector = '#'+prop+'-interface'; 

				if (ui[prop].className){
					className = ui[prop].className + " ";
				} else {
					className = '';
				}
				$('#ui-container').append("<div class='interface " +className+ "clearfix' id='"+prop+"-interface'></div>");

				//buttons don't need <label> tags because their "label" is determined like so: <button>Label</button>
				if (ui[prop].type != "button"){
					$(propContainerSelector).append("<label>"+ui[prop].title+"</label>");
				}

			  	if (isNumber(ui[prop].value) && (!$.isArray(ui[prop].values))){ 
			  		if (ui[prop].units){
			  			sliderInputBoxHTML = "<div class='input-group'><input class='form-control with-units' value='"+ui[prop].value+"'><span class='input-group-addon'>"+ui[prop].units+"</span></div>";
			  		} else if (ui[prop].input === 'readonly'){
			  			sliderInputBoxHTML = "<input value='"+ui[prop].value+"' readonly>";
			  		} else if (ui[prop].input === 'hidden') {
			  			sliderInputBoxHTML = "<input class='form-control' value='"+ui[prop].value+"' type='hidden'>";
			  		} else {
			  			sliderInputBoxHTML = "<input class='form-control' value='"+ui[prop].value+"'>";
			  		}

			  		$(propContainerSelector).append(sliderInputBoxHTML);

					$(propContainerSelector).noUiSlider({
						range: ui[prop].range,
						start: ui[prop].value,
						handles: 1,
						connect: "lower",
						step: (ui[prop].step) ? ui[prop].step : undefined,
						slide: function(){
							ui[prop].value = parseFloat($(this).val());
							update(prop);
						},
						change: function(){
							ui[prop].value = parseFloat($(this).val());
							update(prop);
						},
						set: function(){
							ui[prop].value = parseFloat($(this).val());
							update(prop);
							//ga('send', 'event', ui[prop].title, 'slide', window.location.pathname);
						},
						serialization: {
							to: (ui[prop].input !== 'hidden' || ui[prop].input !== 'readonly') ? [$('#'+prop+'-interface input')] : [false, false],
							resolution: ui[prop].resolution
						}
					});


					//Keyboard increment
					$('#'+prop+'-interface input').keydown(function(e){

						var value = parseInt($(propContainerSelector).val());
						var increment = shiftDown ? 10 : 1;

						switch (e.which){
							case 38:
								$(propContainerSelector).val( value + increment );
								ui[prop].value = parseFloat($(this).val());
							    //ga('send', 'event', ui[prop].title, 'increment: +'+increment, window.location.pathname);
								break;
						    case 40:
							    $(propContainerSelector).val( value - increment );
							    ui[prop].value = parseFloat($(this).val());				    
							    //ga('send', 'event', ui[prop].title, 'decrement: -'+increment, window.location.pathname);
							    break;
						}

						update(prop);

					});

					//set color
					if (ui[prop].color){
						$('#'+prop+'-interface .noUi-connect').css("background-color", ui[prop].color);
					}

				} else if (ui[prop].value === true || ui[prop].value === false) {

				    $('#'+prop+'-interface label').attr("for", prop+'-checkbox');

				    initialCheckboxSetting = ui[prop].value === true ? "checked" : "";

				    $(propContainerSelector).append("<div class='checkbox'><input type='checkbox' value='None' id='"+prop+"-checkbox' name='check' "+initialCheckboxSetting+" /><label for='"+prop+"-checkbox'></label></div>");

				    $('#'+prop+'-interface input').change(function(){
				    	if ($(this).prop('checked')){
				    		ui[prop].value = true;
				    		eventLabel = 'checkbox: switch on'
					    } else {
					    	ui[prop].value = false;
					    	eventLabel = 'checkbox: switch on'
					    }
				        //ga('send', 'event', ui[prop].title, eventLabel, window.location.pathname);
					    update(prop);
					});
				} else if ($.isArray(ui[prop].values)){
					//Dropdown Menus
					$(propContainerSelector).append("<select class='form-control'></select");

					for (var i  = 0 ; i < ui[prop].values.length ; i++){
						$('#'+prop+'-interface select').append("<option value='"+ui[prop].values[i][1]+"'>"+ui[prop].values[i][0]+"</option>");
				    }

					$('#'+prop+'-interface select option[value="'+ui[prop].value+'"]').prop('selected', true);

				    $('#'+prop+'-interface select').change(function(){
				    	ui[prop].value = $(this).val();
				    	//ga('send', 'event', ui[prop].title, 'Dropdown change: ' + ui[prop].value, window.location.pathname);
				    	$('#'+prop+'-interface select option')
					    	.prop('selected', false)
					    	.filter('[value="'+ui[prop].value+'"]').prop('selected', true);
				    	update(prop);
				    })

				} else if (ui[prop].type == "button"){
					$(propContainerSelector).append("<button>"+ui[prop].title+"</button>").click(function(){
						update(prop);
					});
				} else {
					$(propContainerSelector).append("<input value='"+ui[prop].value+"' readonly>");
				}
			})(prop);

		}
	}

	$("body").on('click', '#ui-container a', function(e){
		//sends data about clicking links in #ui-container. Such as in nuclear crater map
		//ga('send', 'event', $(this).html(), 'click', window.location.pathname);
	});

	$(document).trigger({
		type: "uiLoaded"
	});

});



function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}





function Demo(settings){
	var self = this;

	for (var name in settings) {
	    this[name] = settings[name];
	}
	
	this.ui = typeof this.ui === "undefined" ? {} : this.ui;

	this.shiftDown = false;

	//thanks to http://stackoverflow.com/questions/11101364/javascript-detect-shift-key-down-within-another-function
	this.setShiftDown = function(event){
		if(event.keyCode === 16 || event.charCode === 16){ //for future reference, alt key is 18
			self.shiftDown = true;
		}
	};

	this.setShiftUp = function(event){
		if(event.keyCode === 16 || event.charCode === 16){
			self.shiftDown = false;
		}
	};

	this.addUIElement = function(prop){
		var ui = this.ui;
		// console.log(this, ui);

		var propContainerSelector = '#'+prop+'-interface'; 

		if (ui[prop].className){
			className = ui[prop].className + " ";
		} else {
			className = '';
		}
		$('#ui-container').append("<div class='interface " +className+ "clearfix' id='"+prop+"-interface'></div>");

		//buttons don't need <label> tags because their "label" is determined like so: <button>Label</button>
		if (ui[prop].type != "button"){
			$(propContainerSelector).append("<label>"+ui[prop].title+"</label>");
		}

		if (ui[prop].type == "userInputNumerical"){
  			inputBoxHTML = "<input class='form-control user-input-numerical' value='"+ui[prop].value+"'>";
	  		$(propContainerSelector).append(inputBoxHTML);
  		    $('#'+prop+'-interface input').change(function(){
	    		ui[prop].value = parseFloat($('#'+prop+'-interface input').val());
  		        self.sendEvent(ui[prop].title, 'value changed', window.location.pathname);
  			    self.update(prop);
			});
		} else if (ui[prop].type == "userInputString"){
			var inputBoxHTML = "";
  			if (ui[prop].prepend){
	  			inputBoxHTML = "<div class='input-group'>";
  				inputBoxHTML += "<span class='input-group-addon'>"+ui[prop].prepend+"</span>";
  			}
  			inputBoxHTML += "<input class='form-control user-input-string' value='"+ui[prop].value+"'>";
  			if (ui[prop].prepend){
	  			inputBoxHTML += "</div>";
	  		}
	  		$(propContainerSelector).append(inputBoxHTML);
  		    $('#'+prop+'-interface input').change(function(){
	    		ui[prop].value = $('#'+prop+'-interface input').val();
  		        self.sendEvent(ui[prop].title, 'value changed', window.location.pathname);
  			    // self.update(prop);
			});
		} else if (ui[prop].type == "userInputTextarea"){
  			inputBoxHTML = "<textarea class='form-control user-input-textarea'>"+ui[prop].value+"</textarea>";
	  		$(propContainerSelector).append(inputBoxHTML);
  		    $('#'+prop+'-interface textarea').change(function(){
	    		ui[prop].value = $('#'+prop+'-interface textarea').val();
  		        self.sendEvent(ui[prop].title, 'value changed', window.location.pathname);
  			    // self.update(prop);
			});
		} else if (isNumber(ui[prop].value) && (!$.isArray(ui[prop].values))){ 
	  		if (ui[prop].units){
	  			sliderInputBoxHTML = "<div class='input-group'><input class='form-control with-units' value='"+ui[prop].value+"'><span class='input-group-addon'>"+ui[prop].units+"</span></div>";
	  		} else if (ui[prop].input === 'readonly'){
	  			sliderInputBoxHTML = "<input value='"+ui[prop].value+"' readonly>";
	  		} else if (ui[prop].input === 'hidden') {
	  			sliderInputBoxHTML = "<input class='form-control' value='"+ui[prop].value+"' type='hidden'>";
	  		} else {
	  			sliderInputBoxHTML = "<input class='form-control' value='"+ui[prop].value+"'>";
	  		}

	  		$(propContainerSelector).append(sliderInputBoxHTML);

			$(propContainerSelector).noUiSlider({
				range: ui[prop].range,
				start: ui[prop].value,
				handles: 1,
				connect: "lower",
				step: (ui[prop].step) ? ui[prop].step : undefined,
				slide: function(){
					ui[prop].value = parseFloat($(this).val());
					self.update(prop);
					if ($('#'+prop+'-interface input').val() === "-0"){
						$('#'+prop+'-interface input').val("0");
					}
					// self.update(prop);
				},
				change: function(){
					ui[prop].value = parseFloat($(this).val());
					self.update(prop);
				},
				set: function(){
					ui[prop].value = parseFloat($(this).val());
					self.update(prop);
					self.sendEvent(ui[prop].title, 'slide', window.location.pathname);
				},
				serialization: {
					to: (ui[prop].input !== 'hidden' || ui[prop].input !== 'readonly') ? [$('#'+prop+'-interface input')] : [false, false],
					resolution: ui[prop].resolution
				}
			});


			//Keyboard increment
			$('#'+prop+'-interface input').keydown(function(e){

				var value = parseInt($(propContainerSelector).val());
				var increment = self.shiftDown ? 10 : 1;

				switch (e.which){
					case 38:
						$('#'+prop+'-interface input').val( value + increment );
						ui[prop].value = parseFloat($(this).val());
					    self.sendEvent(ui[prop].title, 'increment: +'+increment, window.location.pathname);
						break;
				    case 40:
					    $('#'+prop+'-interface input').val( value - increment );
					    ui[prop].value = parseFloat($(this).val());				    
					    self.sendEvent(ui[prop].title, 'decrement: -'+increment, window.location.pathname);
					    break;
				}

				self.update(prop);

			});

			//set color
			if (ui[prop].color){
				$('#'+prop+'-interface .noUi-connect').css("background-color", ui[prop].color);
			}

		} else if (ui[prop].value === true || ui[prop].value === false) {

		    $('#'+prop+'-interface label').attr("for", prop+'-checkbox');

		    initialCheckboxSetting = ui[prop].value === true ? "checked" : "";

		    $(propContainerSelector).append("<div class='checkbox'><input type='checkbox' value='None' id='"+prop+"-checkbox' name='check' "+initialCheckboxSetting+" /><label for='"+prop+"-checkbox'></label></div>");

		    $('#'+prop+'-interface input').change(function(){
		    	if ($(this).prop('checked')){
		    		ui[prop].value = true;
		    		eventLabel = 'checkbox: switch on'
			    } else {
			    	ui[prop].value = false;
			    	eventLabel = 'checkbox: switch on'
			    }
		        self.sendEvent(ui[prop].title, eventLabel, window.location.pathname);
			    self.update(prop);
			});
		} else if ($.isArray(ui[prop].values)){
			//Dropdown Menus
			$(propContainerSelector).append("<select class='form-control'></select");

			for (var i  = 0 ; i < ui[prop].values.length ; i++){
				$('#'+prop+'-interface select').append("<option value='"+ui[prop].values[i][1]+"'>"+ui[prop].values[i][0]+"</option>");
		    }

			$('#'+prop+'-interface select option[value="'+ui[prop].value+'"]').prop('selected', true);

		    $('#'+prop+'-interface select').change(function(){
		    	ui[prop].value = $(this).val();
		    	self.sendEvent(ui[prop].title, 'Dropdown change: ' + ui[prop].value, window.location.pathname);
		    	$('#'+prop+'-interface select option')
			    	.prop('selected', false)
			    	.filter('[value="'+ui[prop].value+'"]').prop('selected', true);
		    	self.update(prop);
		    })

		} else if (ui[prop].type == "button"){
			$(propContainerSelector).append("<button>"+ui[prop].title+"</button>").click(function(){
				self.update(prop);
			});
		} else {
			$(propContainerSelector).append("<input value='"+ui[prop].value+"' readonly>");
		}
	}

	for (var prop in this.ui){
		this.addUIElement(prop);
	}

	//sends data about clicking links in #ui-container. Such as in nuclear crater map
	$("body").on('click', '#ui-container a', function(e){
		self.sendEvent($(this).html(), 'click', window.location.pathname);
	});


	$(document).on("keydown", function(e){
		self.setShiftDown(e);
	});

	$(document).on("keyup", function(e){
		self.setShiftUp(e);
	});

	this.sendEvent = function(category, action, label, value){
		if (window.location.host == 'academo.org' && typeof ga === "function"){
			//ga('send', 'event', category, action, label, value);
		}
	}


	this.init();
}
Colors = {
	colors:
		[
			"black",
			"blue",
			"red",
			"purple",
			"turquoise",
			"green",
			"orange",
			"magenta",
			"gold",
			"yellow",
			"violet",
			"khaki",
			"maroon",
			"beige",
			"darkorchid",
			"darkblue",
			"darkorange",
			"fuchsia",
			"aqua",
			"darkgrey",
			"darkkhaki",
			"navy",
			"darkolivegreen",
			"darkcyan",
			"darksalmon",
			"lightcyan",
			"lightyellow",
			"lightgreen",
			"lightpink",
			"darkgreen",
			"silver",
			"darkviolet",
			"lightblue",
			"brown",
			"darkmagenta",
			"lime",
			"indigo",
			"azure",
			"lightgrey",
			"olive",
			"pink",
			"cyan",
			"darkred",
		],
	colorMaps :
		{
			aqua: "#00ffff",
			azure: "#f0ffff",
			beige: "#f5f5dc",
			black: "#000000",
			blue: "#0000ff",
			brown: "#a52a2a",
			cyan: "#00ffff",
			darkblue: "#00008b",
			darkcyan: "#008b8b",
			darkgrey: "#a9a9a9",
			darkgreen: "#006400",
			darkkhaki: "#bdb76b",
			darkmagenta: "#8b008b",
			darkolivegreen: "#556b2f",
			darkorange: "#ff8c00",
			darkorchid: "#9932cc",
			darkred: "#8b0000",
			darksalmon: "#e9967a",
			darkviolet: "#9400d3",
			fuchsia: "#ff00ff",
			gold: "#ffd700",
			green: "#008000",
			indigo: "#4b0082",
			khaki: "#f0e68c",
			lightblue: "#add8e6",
			lightcyan: "#e0ffff",
			lightgreen: "#90ee90",
			lightgrey: "#d3d3d3",
			lightpink: "#ffb6c1",
			lightyellow: "#ffffe0",
			lime: "#00ff00",
			magenta: "#ff00ff",
			maroon: "#800000",
			navy: "#000080",
			olive: "#808000",
			orange: "#ffa500",
			pink: "#ffc0cb",
			purple: "#800080",
			violet: "#800080",
			red: "#ff0000",
			silver: "#c0c0c0",
			turquoise: "#40e0d0",
			white: "#ffffff",
			yellow: "#ffff00"
		},
	nameMaps :
		{
			aqua: "Aqua",
			azure: "Azure",
			beige: "Beige",
			black: "Black",
			blue: "Blue",
			brown: "Brown",
			cyan: "Cyan",
			darkblue: "Dark Blue",
			darkcyan: "Dark Cyan",
			darkgrey: "Dark Grey",
			darkgreen: "Dark Green",
			darkkhaki: "Dark Khaki",
			darkmagenta: "Dark Magenta",
			darkolivegreen: "Dark Olive Green",
			darkorange: "Dark Orange",
			darkorchid: "Dark Orchid",
			darkred: "Dark Red",
			darksalmon: "Dark Salmon",
			darkviolet: "Dark Violet",
			fuchsia: "Fuchsia",
			gold: "Gold",
			green: "Green",
			indigo: "Indigo",
			khaki: "Khaki",
			lightblue: "Light Blue",
			lightcyan: "Light Cyan",
			lightgreen: "Light Green",
			lightgrey: "Light Grey",
			lightpink: "Light Pink",
			lightyellow: "Light Yellow",
			lime: "Lime",
			magenta: "Magenta",
			maroon: "Maroon",
			navy: "Navy",
			olive: "Olive",
			orange: "Orange",
			pink: "Pink",
			purple: "Purple",
			violet: "Violet",
			red: "Red",
			silver: "Silver",
			turquoise: "Turquoise",
			white: "White",
			yellow: "Yellow",
		},
	colorTracker: -1,
};

function trackError(message, file, line){
	// console.log(message, line, file);
}

//doesn't work with addEventListener! The event passed to the function is NOT the error,
// so it does not contain e.message, e.filename etc in Firefox
// window.addEventListener('error', function(e){
		// trackJavaScriptError(e)
	// }, false);

window.onerror = function(message, file, line){
	// trackError(message, line, file);
	//ga('send', 'event', 'JavaScript Error', message, file + ": Line "+ line, { 'nonInteraction': 1 });
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


$(document).ready(function(){
	if ($("#demo").length){
		// $.getJSON("/search.json", function( data ) {
		// 	var items = [];
		// 	demoArray = shuffle(data.entries);
		// 	sidebarArray = [];
		// 	i = 6;
		// 	while (i){
		// 		potential = demoArray.pop();
		// 		if (potential.url != window.location.pathname && potential.url.indexOf("/demos/") != -1){
		// 			sidebarArray.push(potential);
		// 			htmlString = "<li><a href='"+potential.url+"' class='thumbnail'>"
		// 			if (potential.type == "demo"){
		// 				htmlString += "<img src='"+potential.url+"thumbnail.png' alt=''>";
		// 			}
		// 			htmlString += "<p class='thumbnail-title'>"+potential.title+"</p>";
		// 			htmlString += "</a></li>";
		// 			items.push(htmlString);
		// 			i--;
		// 		}
		// 	}

		// 	$(items.join("")).appendTo( ".sidebar ul" );
		// }).fail(function(){
		// 	$(".sidebar").css("display", "none");
		// });
	}
})

$("body").on("click", ".sidebar a", function(e){
	if ($(this).attr("target") != "_blank"){
		e.preventDefault();
		//ga('send', 'event', 'sidebar', 'click', $(this).attr("href"));
		document.location = $(this).attr("href");
	}
});



$(document).ready(function(){

	// Create codepen link
	if ($("#codepen-script").length){
		var time = new Date().getTime();
		var blurb = $.trim($(".blurb").text());
		if (blurb[blurb.length - 1] != "."){
			blurb += ".";
		}

		var jsExternal = [];

		jsExternal.push("//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js");
		jsExternal.push("https://academo.org/js/demoConcat.js?v=" + time);

		$(".js-demo-external-library").each(function(){
			jsExternal.push($(this).attr("src"));
		});

		$(".js-demo-library").each(function(){
			jsExternal.push("https://academo.org" + $(this).attr("src"));
		});


		blurb += "This demo is originally from https://academo.org.";

		var data = {
			title: $("h1").html(),
			description: blurb,
			html: '<div id="demo">\n</div>\n\n<div id="ui-container">\n</div>\n\n<a id="academo-banner" href="https://academo.org'+window.location.pathname+'" target="_blank">Find out more at Academo.org</a>',
			css: $(".demo-specific-styles").html(),
			js: $("#codepen-script").html(),
			css_external: "https://academo.org/scss/main.css?v=" + time,
			js_external: jsExternal.join(";"),
			editors: "011",
		};

		var JSONstring = 
		  JSON.stringify(data);		  
		  JSONstring = JSONstring.replace(/"/g, "&quot;").replace(/'/g, "&apos;");
		  
		var form = 
			'<div class="interface clearfix"><button id="codepen-submit-button" title="CodePen is a free online tool for editing and writing code." onclick=\'document.getElementById("codepen-form").submit();\'><i class="icon-link-ext"></i> Open with CodePen <i class="fa fa-codepen"></i></button></div>' +
			'<form action="https://codepen.io/pen/define" method="POST" target="_blank" id="codepen-form">' + 
		    '<input type="hidden" name="data" value=\'' + 
		      JSONstring + 
		      '\'>' + 
		    
		  '</form>';


		$("#ui-container").append(form);
	}




	var sponsoredLinks = [
		
	];

	// Randomise sponsored link
	// $(".js-sponsor-wrapper").html(shuffle(sponsoredLinks)[0]);


	// Sponsored tiles
		var sponsoredTilesInner = [
			
		]
		// $(".js-sponsored-tile").html(sponsoredTilesInner[Math.floor(Math.random() * sponsoredTilesInner.length) ] + "<p class='thumbnail-title'>Sponsored Link</p>");
	
});