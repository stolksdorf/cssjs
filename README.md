Check out the interactive demo [here!](http://stolksdorf.github.io/Cssjs)

# What is CssJs?
CssJs is a micro css preprocessor that take Javascript objects and turns them into valid CSS. Taking advantage of nesting within js objects and the ability to use functions, let's you have powerful and clean CSS without having to learn another preprocessing language or even install anything!

CssJs doesn't depend on any other library. You can use it at run time by directly injecting your JS styles as a CSS tag in the page using `css.render({..})`. Or just output the string using `css({...})` and save it to a css file.


# Simple Example
Here's a basic example. Notice that you can either quote the rule if it has a dash in it, or you can just use camel casing.

	var simpleCss = css({
		body: {
			marginTop: "20px",
			"margin-left": "20px",
			width: "100%"
		},
		header: {
			width: "100%"
		}
	});

	$(example).html('<pre>' + simpleCss + '</pre>')
			  .css('font-family', 'Courier');


# Nesting
One of the most useful parts of using CSS preprocessors is being able to nest rules together, giving a better flow to your file.

	var nestingIsHandy = css({
		body: {
			marginTop: "20px",
			width: "100%",
			p: {
				color: "#BADA55"
			}
		}
	});

	$(example).html('<pre>' + nestingIsHandy + '</pre>')
			  .css('font-family', 'Courier');

# Pseudo-classes
It also handles pseudo-classes!

	var pseudoPseudoPseudo = css({
		body: {
			a: {
				color: "#FFF",
				":hover": {
					textDecoration: "none"
				},
				":after": {
					display: "block",
					content: '"---"'
				}
			}
		}
	});

	$(example).html('<pre>' + pseudoPseudoPseudo + '</pre>')
			  .css('font-family', 'Courier');

# Functions and Plugins
Since we're in Javascript let's leverage our ability to use some logic. CssJs automatically processes any functions it comes across. You can also declare variables and use those too. Plugins allow you to create your own custom CSS rules.

	var themeColor = "#BADA55";
	var textStyles = function(size) {
		return {
			color      : themeColor,
			fontSize   : size + "px",
			lineHeight : size + "px"
		}
	}
	css.plugins.coolPadz = function(pad){
		return {
			paddingTop    : pad*0.6 + 'px',
			paddingBottom : pad*0.6 + 'px',
			paddingLeft   : pad + 'px',
			paddingRight  : pad + 'px',
		}
	}

	var suchPower = css({
		body: {
			color: themeColor,
			p: textStyles(16),
			'.title' : {
				color: "#000",
				coolPadz : 40
			}
		}
	})

	$(example).html('<pre>' + suchPower + '</pre>')
			  .css('font-family', 'Courier');


#Color
Write up some awesomeness using this lib, https://github.com/harthur/color

# Customization
By default CssJs uses a tab to space out it's generated CSS, but by changing the `css.space` variable to can change it to whatever you like.

	css.space = '  '; //just two spaces

	var customSpacing = css({
		body: {
			marginTop: "20px",
			"margin-left": "20px",
			width: "100%"
		},
		header: {
			width: "100%"
		}
	});

	$(example).html('<pre>' + customSpacing + '</pre>')
			  .css('font-family', 'Courier');

# Sheet Creation
A neat workflow using CssJs is to use the `css.render({...})` function while testing and developing to automatically generate you a style sheet and add it to your page. When you're happy with the results, simply use `css({...})` to generate the CSS string and save it to your own file for production. No need to preprocess all the time!

	css.render({
		'#coolDiv' :{
			color : 'green'
		}
	});

	$(example).html('<div id="coolDiv">Coolest green div around</div> <div>Not so green :(</div>');

