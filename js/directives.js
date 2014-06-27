var module = angular.module('angularPolymer');

function scaffoldDirective(definition) {
	var nextUpperCase = false;
	var buffer = [];
	for (var i = 0; i < definition.name.length; i++) { 
		if (definition.name[i] === '-') { 
			nextUpperCase = true; 
		} else { 
			if (nextUpperCase) { 
				buffer.push(definition.name[i].toUpperCase());
				nextUpperCase = false; 
			} else { 
				buffer.push(definition.name[i]);
			} 
		} 
	}
	
	var directiveName = buffer.join('')
		.replace('core', 'ap')
		.replace('paper', 'ap');
	
	var apiName;
	
	if (definition.methods) {
		apiName = buffer.join('')
			.replace('core', '')
			.replace('paper', '') + 'API';
		
		apiName = apiName[0].toLowerCase() + apiName.substring(1);
	}
	
	module.directive(directiveName, function () {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: ['<', definition.name, ' ng-transclude></', definition.name, '>'].join(''),
			link: function (scope, element, attrs) {
				
				if (apiName) {
					document.addEventListener('polymer-ready', function() {
						var api = scope[apiName] = {};
						definition.methods.forEach(function (methodName) {
							api[methodName] = function () { 
								// console.log('called ' + methodName + ' from API');
								element[0][methodName]();
							};
						});
					});
				}
			}
		};
	});
}

function scaffoldDirectives(elementNames) {
	elementNames.forEach(function (elementName) {
		scaffoldDirective(elementName);
	});
}

scaffoldDirectives([
	{ name: 'core-scaffold' },
	{ name: 'core-header-panel' },
	{ name: 'core-toolbar' },
	{ name: 'core-menu' },
	{ name: 'core-item' },
	{ name: 'core-drawer-panel', methods: ['togglePanel'] },
	{ name: 'paper-icon-button' }
]);