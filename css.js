;(function(){
	var reduce = function(obj, fn, memo){
		for(var propName in obj){
			if(obj.hasOwnProperty(propName)){ memo = fn(memo, obj[propName], propName); }
		}
		return memo;
	};

	//Converts camel case into dashes. marginTop -> margin-top
	var dashCase = function(str){
		return str.replace(/([A-Z])/g, function (m, w) {
			return '-'+w.toLowerCase();
		});
	}
	//Clones the array, pushes to it, and returns it
	var clonePush = function(arr, val){
		var temp = arr.slice(0);
		temp.push(val);
		return temp;
	}
	var isArray = function(obj){return Object.prototype.toString.call(obj) === '[object Array]';};

	//Creates and injects a stylesheet with the given code
	var makeSheet = function(cssCode) {
		var el = document.createElement("style");
		el.type = "text/css";
		if(el.styleSheet){el.styleSheet.cssText = cssCode;}
		else{el.appendChild(document.createTextNode(cssCode));}
		document.getElementsByTagName("head")[0].appendChild(el);
		return el;
	};

	css = function(json){
		var rules = [];
		var processContents = function(scope, contents){
			return reduce(contents, function(result, val, rule){
				if(css.plugins[rule]){
					return result + processContents(scope, css.plugins[rule](val));
				}
				if(isArray(contents)){
					return result + processContents(scope, val);
				}
				if(typeof val === 'function'){val = val();}
				if(typeof val === 'object' || isArray(val)){
					addRule(clonePush(scope, rule), val);
				}
				if(typeof val === 'string'){
					return result + css.space + dashCase(rule) + ': ' + val + ';\n';
				}
				return result;
			}, '');
		};

		var addRule = function(scope, contents){
			rules.unshift(scope.join(' ').replace(' :',':') + '{\n' +
				processContents(scope, contents)
				 + '}\n');
		};

		for(var def in json){
			addRule([def], json[def]);
		}
		return rules.join('');
	};

	css.space   = '\t';
	css.plugins = {};
	css.render = function(json){
		return makeSheet(css(json));
	};
})();

