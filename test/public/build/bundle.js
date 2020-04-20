
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.app = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	var check = function check(it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check((typeof globalThis === "undefined" ? "undefined" : _typeof_1(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof_1(window)) == 'object' && window) || check((typeof self === "undefined" ? "undefined" : _typeof_1(self)) == 'object' && self) || check(_typeof_1(commonjsGlobal) == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	Function('return this')();

	var fails = function fails(exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, {
	    get: function get() {
	      return 7;
	    }
	  })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
	  f: f
	};

	var createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function classofRaw(it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function requireObjectCoercible(it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function toIndexedObject(it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function isObject(it) {
	  return _typeof_1(it) === 'object' ? it !== null : typeof it === 'function';
	};

	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive = function toPrimitive(input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function has(it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function documentCreateElement(it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function get() {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
	  f: f$1
	};

	var anObject = function anObject(it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
	  f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function setGlobal(key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	  (module.exports = function (key, value) {
	    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: '3.6.4',
	    mode:  'global',
	    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function uid(key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function sharedKey(key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function enforce(it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function getterFor(TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function set(it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };

	  get = function get(it) {
	    return wmget.call(store$1, it) || {};
	  };

	  has$1 = function has(it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function set(it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };

	  get = function get(it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function has$1(it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	  var getInternalState = internalState.get;
	  var enforceInternalState = internalState.enforce;
	  var TEMPLATE = String(String).split('String');
	  (module.exports = function (O, key, value, options) {
	    var unsafe = options ? !!options.unsafe : false;
	    var simple = options ? !!options.enumerable : false;
	    var noTargetGet = options ? !!options.noTargetGet : false;

	    if (typeof value == 'function') {
	      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }

	    if (O === global_1) {
	      if (simple) O[key] = value;else setGlobal(key, value);
	      return;
	    } else if (!unsafe) {
	      delete O[key];
	    } else if (!noTargetGet && O[key]) {
	      simple = true;
	    }

	    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, 'toString', function toString() {
	    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	  });
	});

	var path = global_1;

	var aFunction = function aFunction(variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function getBuiltIn(namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function toInteger(argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function toLength(argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function createMethod(IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;

	var objectKeysInternal = function objectKeysInternal(object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) {
	    !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys


	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~indexOf(result, key) || result.push(key);
	    }
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
	  f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
	  f: f$4
	};

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function copyConstructorProperties(target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function isForced(feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/

	var _export = function _export(options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (_typeof_1(sourceProperty) === _typeof_1(targetProperty)) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    } // extend global


	    redefine(target, key, sourceProperty, options);
	  }
	};

	// https://tc39.github.io/ecma262/#sec-toobject

	var toObject = function toObject(argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill


	var arrayFill = function fill(value
	/* , start = 0, end = @length */
	) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

	  while (endPos > index) {
	    O[index++] = value;
	  }

	  return O;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
	&& !Symbol.sham // eslint-disable-next-line no-undef
	&& _typeof_1(Symbol.iterator) == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var _Symbol = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? _Symbol : _Symbol && _Symbol.withoutSetter || uid;

	var wellKnownSymbol = function wellKnownSymbol(name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(_Symbol, name)) WellKnownSymbolsStore[name] = _Symbol[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  }

	  return WellKnownSymbolsStore[name];
	};

	// https://tc39.github.io/ecma262/#sec-object.keys

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) {
	    objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  }

	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function EmptyConstructor() {
	  /* empty */
	};

	var scriptTag = function scriptTag(content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


	var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak

	  return temp;
	}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


	var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	}; // Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug


	var activeXDocument;

	var _NullProtoObject = function NullProtoObject() {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  _NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;

	  while (length--) {
	    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  }

	  return _NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true; // `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO] = O;
	  } else result = _NullProtoObject();

	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	} // add a key to Array.prototype[@@unscopables]


	var addToUnscopables = function addToUnscopables(key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill

	_export({
	  target: 'Array',
	  proto: true
	}, {
	  fill: arrayFill
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('fill');

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	  var defineProperty = objectDefineProperty.f;
	  var METADATA = uid('meta');
	  var id = 0;

	  var isExtensible = Object.isExtensible || function () {
	    return true;
	  };

	  var setMetadata = function setMetadata(it) {
	    defineProperty(it, METADATA, {
	      value: {
	        objectID: 'O' + ++id,
	        // object ID
	        weakData: {} // weak collections IDs

	      }
	    });
	  };

	  var fastKey = function fastKey(it, create) {
	    // return a primitive with prefix
	    if (!isObject(it)) return _typeof_1(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

	    if (!has(it, METADATA)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

	      if (!create) return 'E'; // add missing metadata

	      setMetadata(it); // return object ID
	    }

	    return it[METADATA].objectID;
	  };

	  var getWeakData = function getWeakData(it, create) {
	    if (!has(it, METADATA)) {
	      // can't set metadata to uncaught frozen object
	      if (!isExtensible(it)) return true; // not necessary to add metadata

	      if (!create) return false; // add missing metadata

	      setMetadata(it); // return the store of weak collections IDs
	    }

	    return it[METADATA].weakData;
	  }; // add metadata on freeze-family methods calling


	  var onFreeze = function onFreeze(it) {
	    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	    return it;
	  };

	  var meta = module.exports = {
	    REQUIRED: false,
	    fastKey: fastKey,
	    getWeakData: getWeakData,
	    onFreeze: onFreeze
	  };
	  hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

	var isArrayIteratorMethod = function isArrayIteratorMethod(it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR] === it);
	};

	var aFunction$1 = function aFunction(it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var functionBindContext = function functionBindContext(fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 0:
	      return function () {
	        return fn.call(that);
	      };

	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

	var CORRECT_ARGUMENTS = classofRaw(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (error) {
	    /* empty */
	  }
	}; // getting tag from ES6+ `Object.prototype.toString`


	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');

	var getIteratorMethod = function getIteratorMethod(it) {
	  if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || iterators[classof(it)];
	};

	var callWithSafeIterationClosing = function callWithSafeIterationClosing(iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	  var Result = function Result(stopped, result) {
	    this.stopped = stopped;
	    this.result = result;
	  };

	  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	    var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
	    var iterator, iterFn, index, length, result, next, step;

	    if (IS_ITERATOR) {
	      iterator = iterable;
	    } else {
	      iterFn = getIteratorMethod(iterable);
	      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

	      if (isArrayIteratorMethod(iterFn)) {
	        for (index = 0, length = toLength(iterable.length); length > index; index++) {
	          result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
	          if (result && result instanceof Result) return result;
	        }

	        return new Result(false);
	      }

	      iterator = iterFn.call(iterable);
	    }

	    next = iterator.next;

	    while (!(step = next.call(iterator)).done) {
	      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	      if (_typeof_1(result) == 'object' && result && result instanceof Result) return result;
	    }

	    return new Result(false);
	  };

	  iterate.stop = function (result) {
	    return new Result(true, result);
	  };
	});

	var anInstance = function anInstance(it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  }

	  return it;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function next() {
	      return {
	        done: !!called++
	      };
	    },
	    'return': function _return() {
	      SAFE_CLOSING = true;
	    }
	  };

	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  }; // eslint-disable-next-line no-throw-literal


	  Array.from(iteratorWithReturn, function () {
	    throw 2;
	  });
	} catch (error) {
	  /* empty */
	}

	var checkCorrectnessOfIteration = function checkCorrectnessOfIteration(exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;

	  try {
	    var object = {};

	    object[ITERATOR$2] = function () {
	      return {
	        next: function next() {
	          return {
	            done: ITERATION_SUPPORT = true
	          };
	        }
	      };
	    };

	    exec(object);
	  } catch (error) {
	    /* empty */
	  }

	  return ITERATION_SUPPORT;
	};

	var defineProperty = objectDefineProperty.f;
	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function setToStringTag(it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
	    defineProperty(it, TO_STRING_TAG$2, {
	      configurable: true,
	      value: TAG
	    });
	  }
	};

	var aPossiblePrototype = function aPossiblePrototype(it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.

	/* eslint-disable no-proto */

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;

	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var inheritIfRequired = function inheritIfRequired($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if ( // it can work only with native `setPrototypeOf`
	  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var collection = function collection(CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function fixMethod(KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
	      nativeMethod.call(this, value === 0 ? 0 : value);
	      return this;
	    } : KEY == 'delete' ? function (key) {
	      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	    } : KEY == 'get' ? function get(key) {
	      return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	    } : KEY == 'has' ? function has(key) {
	      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	    } : function set(key, value) {
	      nativeMethod.call(this, key === 0 ? 0 : key, value);
	      return this;
	    });
	  }; // eslint-disable-next-line max-len


	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor(); // early implementations not supports chaining

	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

	    var THROWS_ON_PRIMITIVES = fails(function () {
	      instance.has(1);
	    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new

	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
	      new NativeConstructor(iterable);
	    }); // for early implementations -0 and +0 not the same

	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;

	      while (index--) {
	        $instance[ADDER](index, index);
	      }

	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({
	    global: true,
	    forced: Constructor != NativeConstructor
	  }, exported);
	  setToStringTag(Constructor, CONSTRUCTOR_NAME);
	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
	  return Constructor;
	};

	var redefineAll = function redefineAll(target, src, options) {
	  for (var key in src) {
	    redefine(target, key, src[key], options);
	  }

	  return target;
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() {
	    /* empty */
	  }

	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function returnThis() {
	  return this;
	}; // `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	if ( !has(IteratorPrototype, ITERATOR$3)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var returnThis$1 = function returnThis() {
	  return this;
	};

	var createIteratorConstructor = function createIteratorConstructor(IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
	    next: createPropertyDescriptor(1, next)
	  });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function returnThis() {
	  return this;
	};

	var defineIterator = function defineIterator(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function getIterationMethod(KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS:
	        return function keys() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case VALUES:
	        return function values() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case ENTRIES:
	        return function entries() {
	          return new IteratorConstructor(this, KIND);
	        };
	    }

	    return function () {
	      return new IteratorConstructor(this);
	    };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY; // fix native

	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
	        }
	      } // Set @@toStringTag to native iterators


	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;

	    defaultIterator = function values() {
	      return nativeIterator.call(this);
	    };
	  } // define iterator


	  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
	  }

	  iterators[NAME] = defaultIterator; // export additional methods

	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({
	      target: NAME,
	      proto: true,
	      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
	    }, methods);
	  }

	  return methods;
	};

	var SPECIES = wellKnownSymbol('species');

	var setSpecies = function setSpecies(CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES]) {
	    defineProperty(Constructor, SPECIES, {
	      configurable: true,
	      get: function get() {
	        return this;
	      }
	    });
	  }
	};

	var defineProperty$1 = objectDefineProperty.f;
	var fastKey = internalMetadata.fastKey;
	var setInternalState = internalState.set;
	var internalStateGetterFor = internalState.getterFor;
	var collectionStrong = {
	  getConstructor: function getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });
	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function define(that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index; // change existing entry

	      if (entry) {
	        entry.value = value; // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;else that.size++; // add to index

	        if (index !== 'F') state.index[index] = entry;
	      }

	      return that;
	    };

	    var getEntry = function getEntry(that, key) {
	      var state = getInternalState(that); // fast case

	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index]; // frozen object case

	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;

	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }

	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function _delete(key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);

	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;else that.size--;
	        }

	        return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn
	      /* , that = undefined */
	      ) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;

	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this); // revert to the last existing entry

	          while (entry && entry.removed) {
	            entry = entry.previous;
	          }
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$1(C.prototype, 'size', {
	      get: function get() {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function setStrong(C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last; // revert to the last existing entry

	      while (entry && entry.removed) {
	        entry = entry.previous;
	      } // get next entry


	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return {
	          value: undefined,
	          done: true
	        };
	      } // return step by kind


	      if (kind == 'keys') return {
	        value: entry.key,
	        done: false
	      };
	      if (kind == 'values') return {
	        value: entry.value,
	        done: false
	      };
	      return {
	        value: [entry.key, entry.value],
	        done: false
	      };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// https://tc39.github.io/ecma262/#sec-map-objects


	var es_map = collection('Map', function (init) {
	  return function Map() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	}, collectionStrong);

	var nativeAssign = Object.assign;
	var defineProperty$2 = Object.defineProperty; // `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign

	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({
	    b: 1
	  }, nativeAssign(defineProperty$2({}, 'a', {
	    enumerable: true,
	    get: function get() {
	      defineProperty$2(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), {
	    b: 2
	  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) {
	    B[chr] = chr;
	  });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : nativeAssign;

	// https://tc39.github.io/ecma262/#sec-object.assign

	_export({
	  target: 'Object',
	  stat: true,
	  forced: Object.assign !== objectAssign
	}, {
	  assign: objectAssign
	});

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, {
	    unsafe: true
	  });
	}

	var nativePromiseConstructor = global_1.Promise;

	var SPECIES$1 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor

	var speciesConstructor = function speciesConstructor(O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function run(id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function runner(id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function listener(event) {
	  run(event.data);
	};

	var post = function post(id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;

	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }

	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };

	    defer(counter);
	    return counter;
	  };

	  clear = function clearImmediate(id) {
	    delete queue[id];
	  }; // Node.js 0.8-


	  if (classofRaw(process) == 'process') {
	    defer = function defer(id) {
	      process.nextTick(runner(id));
	    }; // Sphere (JS game engine) Dispatch API

	  } else if (Dispatch && Dispatch.now) {
	    defer = function defer(id) {
	      Dispatch.now(runner(id));
	    }; // Browsers with MessageChannel, includes WebWorkers
	    // except iOS - https://github.com/zloirock/core-js/issues/624

	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
	    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
	    defer = post;
	    global_1.addEventListener('message', listener, false); // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function defer(id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    }; // Rest old browsers

	  } else {
	    defer = function defer(id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$1,
	  clear: clear
	};

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task.set;
	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$1 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$1) == 'process'; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
	var flush, head, last, notify, toggle, node, promise, then; // modern engines have queueMicrotask method

	if (!queueMicrotask) {
	  flush = function flush() {
	    var parent, fn;
	    if (IS_NODE && (parent = process$1.domain)) parent.exit();

	    while (head) {
	      fn = head.fn;
	      head = head.next;

	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();else last = undefined;
	        throw error;
	      }
	    }

	    last = undefined;
	    if (parent) parent.enter();
	  }; // Node.js


	  if (IS_NODE) {
	    notify = function notify() {
	      process$1.nextTick(flush);
	    }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339

	  } else if (MutationObserver && !engineIsIos) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, {
	      characterData: true
	    });

	    notify = function notify() {
	      node.data = toggle = !toggle;
	    }; // environments with maybe non-completely correct, but existent Promise

	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;

	    notify = function notify() {
	      then.call(promise, flush);
	    }; // for other environments - macrotask based on:
	    // - setImmediate
	    // - MessageChannel
	    // - window.postMessag
	    // - onreadystatechange
	    // - setTimeout

	  } else {
	    notify = function notify() {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = {
	    fn: fn,
	    next: undefined
	  };
	  if (last) last.next = task;

	  if (!head) {
	    head = task;
	    notify();
	  }

	  last = task;
	};

	var PromiseCapability = function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	}; // 25.4.1.5 NewPromiseCapability(C)


	var f$5 = function f(C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
	  f: f$5
	};

	var promiseResolve = function promiseResolve(C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function hostReportErrors(a, b) {
	  var console = global_1.console;

	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function perform(exec) {
	  try {
	    return {
	      error: false,
	      value: exec()
	    };
	  } catch (error) {
	    return {
	      error: true,
	      value: error
	    };
	  }
	};

	var process$2 = global_1.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var task$1 = task.set;
	var SPECIES$2 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState = internalState.get;
	var setInternalState$1 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$3) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
	var FORCED = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);

	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

	    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
	  } // We need Promise#finally in the pure version for preventing prototype pollution
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679

	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false; // Detect correctness of subclassing with @@species support

	  var promise = PromiseConstructor.resolve(1);

	  var FakePromise = function FakePromise(exec) {
	    exec(function () {
	      /* empty */
	    }, function () {
	      /* empty */
	    });
	  };

	  var constructor = promise.constructor = {};
	  constructor[SPECIES$2] = FakePromise;
	  return !(promise.then(function () {
	    /* empty */
	  }) instanceof FakePromise);
	});
	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () {
	    /* empty */
	  });
	}); // helpers

	var isThenable = function isThenable(it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function notify(promise, state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0; // variable length - can't use forEach

	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;

	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
	            state.rejection = HANDLED;
	          }

	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw

	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }

	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }

	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function dispatchEvent(name, promise, reason) {
	  var event, handler;

	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = {
	    promise: promise,
	    reason: reason
	  };

	  if (handler = global_1['on' + name]) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function onUnhandled(promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;

	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function isUnhandled(state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function onHandleUnhandled(promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function bind(fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function internalReject(promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function internalResolve(promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;

	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);

	    if (then) {
	      microtask(function () {
	        var wrapper = {
	          done: false
	        };

	        try {
	          then.call(value, bind(internalResolve, promise, wrapper, state), bind(internalReject, promise, wrapper, state));
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, {
	      done: false
	    }, error, state);
	  }
	}; // constructor polyfill


	if (FORCED) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState(this);

	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  }; // eslint-disable-next-line no-unused-vars


	  Internal = function Promise(executor) {
	    setInternalState$1(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };

	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });

	  OwnPromiseCapability = function OwnPromiseCapability() {
	    var promise = new Internal();
	    var state = getInternalState(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };

	  newPromiseCapability.f = newPromiseCapability$1 = function newPromiseCapability(C) {
	    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then; // wrap native Promise#then for native async functions

	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
	    }, {
	      unsafe: true
	    }); // wrap fetch result

	    if (typeof $fetch == 'function') _export({
	      global: true,
	      enumerable: true,
	      forced: true
	    }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input
	      /* , init */
	      ) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}

	_export({
	  global: true,
	  wrap: true,
	  forced: FORCED
	}, {
	  Promise: PromiseConstructor
	});
	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);
	PromiseWrapper = getBuiltIn(PROMISE); // statics

	_export({
	  target: PROMISE,
	  stat: true,
	  forced: FORCED
	}, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});
	_export({
	  target: PROMISE,
	  stat: true,
	  forced:  FORCED
	}, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});
	_export({
	  target: PROMISE,
	  stat: true,
	  forced: INCORRECT_ITERATION
	}, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
	  nativePromiseConstructor.prototype['finally'].call({
	    then: function then() {
	      /* empty */
	    }
	  }, function () {
	    /* empty */
	  });
	}); // `Promise.prototype.finally` method
	// https://tc39.github.io/ecma262/#sec-promise.prototype.finally

	_export({
	  target: 'Promise',
	  proto: true,
	  real: true,
	  forced: NON_GENERIC
	}, {
	  'finally': function _finally(onFinally) {
	    var C = speciesConstructor(this, getBuiltIn('Promise'));
	    var isFunction = typeof onFinally == 'function';
	    return this.then(isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () {
	        return x;
	      });
	    } : onFinally, isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () {
	        throw e;
	      });
	    } : onFinally);
	  }
	}); // patch native Promise.prototype for native async functions

	if ( typeof nativePromiseConstructor == 'function' && !nativePromiseConstructor.prototype['finally']) {
	  redefine(nativePromiseConstructor.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
	}

	// https://tc39.github.io/ecma262/#sec-set-objects


	var es_set = collection('Set', function (init) {
	  return function Set() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	}, collectionStrong);

	var createMethod$1 = function createMethod(CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt = stringMultibyte.charAt;
	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$1 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  }); // `%StringIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return {
	    value: undefined,
	    done: true
	  };
	  point = charAt(string, index);
	  state.index += point.length;
	  return {
	    value: point,
	    done: false
	  };
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$3 = internalState.set;
	var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator

	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$3(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind

	  }); // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;

	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return {
	      value: undefined,
	      done: true
	    };
	  }

	  if (kind == 'keys') return {
	    value: index,
	    done: false
	  };
	  if (kind == 'values') return {
	    value: target[index],
	    done: false
	  };
	  return {
	    value: [index, target[index]],
	    done: false
	  };
	}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

	iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;

	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$5] = ArrayValues;
	    }

	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }

	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 1.1.20150312
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: Dedicated to the public domain.
	 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
	 */

	/*global self, document, DOMException */

	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
	if ("document" in self) {
	  // Full polyfill for browsers with no classList support
	  // Including IE < Edge missing SVGElement.classList
	  if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
	    (function (view) {

	      if (!('Element' in view)) return;

	      var classListProp = "classList",
	          protoProp = "prototype",
	          elemCtrProto = view.Element[protoProp],
	          objCtr = Object,
	          strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	      },
	          arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var i = 0,
	            len = this.length;

	        for (; i < len; i++) {
	          if (i in this && this[i] === item) {
	            return i;
	          }
	        }

	        return -1;
	      } // Vendors: please allow content code to instantiate DOMExceptions
	      ,
	          DOMEx = function DOMEx(type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	      },
	          checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
	        if (token === "") {
	          throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
	        }

	        if (/\s/.test(token)) {
	          throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
	        }

	        return arrIndexOf.call(classList, token);
	      },
	          ClassList = function ClassList(elem) {
	        var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
	            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
	            i = 0,
	            len = classes.length;

	        for (; i < len; i++) {
	          this.push(classes[i]);
	        }

	        this._updateClassName = function () {
	          elem.setAttribute("class", this.toString());
	        };
	      },
	          classListProto = ClassList[protoProp] = [],
	          classListGetter = function classListGetter() {
	        return new ClassList(this);
	      }; // Most DOMException implementations don't allow calling DOMException's toString()
	      // on non-DOMExceptions. Error's toString() is sufficient here.


	      DOMEx[protoProp] = Error[protoProp];

	      classListProto.item = function (i) {
	        return this[i] || null;
	      };

	      classListProto.contains = function (token) {
	        token += "";
	        return checkTokenAndGetIndex(this, token) !== -1;
	      };

	      classListProto.add = function () {
	        var tokens = arguments,
	            i = 0,
	            l = tokens.length,
	            token,
	            updated = false;

	        do {
	          token = tokens[i] + "";

	          if (checkTokenAndGetIndex(this, token) === -1) {
	            this.push(token);
	            updated = true;
	          }
	        } while (++i < l);

	        if (updated) {
	          this._updateClassName();
	        }
	      };

	      classListProto.remove = function () {
	        var tokens = arguments,
	            i = 0,
	            l = tokens.length,
	            token,
	            updated = false,
	            index;

	        do {
	          token = tokens[i] + "";
	          index = checkTokenAndGetIndex(this, token);

	          while (index !== -1) {
	            this.splice(index, 1);
	            updated = true;
	            index = checkTokenAndGetIndex(this, token);
	          }
	        } while (++i < l);

	        if (updated) {
	          this._updateClassName();
	        }
	      };

	      classListProto.toggle = function (token, force) {
	        token += "";
	        var result = this.contains(token),
	            method = result ? force !== true && "remove" : force !== false && "add";

	        if (method) {
	          this[method](token);
	        }

	        if (force === true || force === false) {
	          return force;
	        } else {
	          return !result;
	        }
	      };

	      classListProto.toString = function () {
	        return this.join(" ");
	      };

	      if (objCtr.defineProperty) {
	        var classListPropDesc = {
	          get: classListGetter,
	          enumerable: true,
	          configurable: true
	        };

	        try {
	          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        } catch (ex) {
	          // IE 8 doesn't support enumerable:true
	          if (ex.number === -0x7FF5EC54) {
	            classListPropDesc.enumerable = false;
	            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	          }
	        }
	      } else if (objCtr[protoProp].__defineGetter__) {
	        elemCtrProto.__defineGetter__(classListProp, classListGetter);
	      }
	    })(self);
	  } else {
	    // There is full or partial native classList support, so just check if we need
	    // to normalize the add/remove and toggle APIs.
	    (function () {

	      var testElement = document.createElement("_");
	      testElement.classList.add("c1", "c2"); // Polyfill for IE 10/11 and Firefox <26, where classList.add and
	      // classList.remove exist but support only one argument at a time.

	      if (!testElement.classList.contains("c2")) {
	        var createMethod = function createMethod(method) {
	          var original = DOMTokenList.prototype[method];

	          DOMTokenList.prototype[method] = function (token) {
	            var i,
	                len = arguments.length;

	            for (i = 0; i < len; i++) {
	              token = arguments[i];
	              original.call(this, token);
	            }
	          };
	        };

	        createMethod('add');
	        createMethod('remove');
	      }

	      testElement.classList.toggle("c3", false); // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	      // support the second argument.

	      if (testElement.classList.contains("c3")) {
	        var _toggle = DOMTokenList.prototype.toggle;

	        DOMTokenList.prototype.toggle = function (token, force) {
	          if (1 in arguments && !this.contains(token) === !force) {
	            return force;
	          } else {
	            return _toggle.call(this, token);
	          }
	        };
	      }

	      testElement = null;
	    })();
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	var inherits = _inherits;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	var arrayWithHoles = _arrayWithHoles;

	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	var iterableToArrayLimit = _iterableToArrayLimit;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	var arrayLikeToArray = _arrayLikeToArray;

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	var unsupportedIterableToArray = _unsupportedIterableToArray;

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableRest = _nonIterableRest;

	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
	}

	var slicedToArray = _slicedToArray;

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	var superPropBase = _superPropBase;

	var get$1 = createCommonjsModule(function (module) {
	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    module.exports = _get = Reflect.get;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	module.exports = _get;
	});

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	var isNativeFunction = _isNativeFunction;

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	var isNativeReflectConstruct = _isNativeReflectConstruct;

	var construct = createCommonjsModule(function (module) {
	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    module.exports = _construct = Reflect.construct;
	  } else {
	    module.exports = _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	module.exports = _construct;
	});

	var wrapNativeSuper = createCommonjsModule(function (module) {
	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return construct(Class, arguments, getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	module.exports = _wrapNativeSuper;
	});

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return arrayLikeToArray(arr);
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	function _createSuper(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$1()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function noop() {}

	var identity = function identity(x) {
	  return x;
	};

	function assign(tar, src) {
	  // @ts-ignore
	  for (var k in src) {
	    tar[k] = src[k];
	  }

	  return tar;
	}

	function is_promise(value) {
	  return value && _typeof_1(value) === 'object' && typeof value.then === 'function';
	}

	function add_location(element, file, line, column, char) {
	  element.__svelte_meta = {
	    loc: {
	      file: file,
	      line: line,
	      column: column,
	      char: char
	    }
	  };
	}

	function run$1(fn) {
	  return fn();
	}

	function blank_object() {
	  return Object.create(null);
	}

	function run_all(fns) {
	  fns.forEach(run$1);
	}

	function is_function(thing) {
	  return typeof thing === 'function';
	}

	function safe_not_equal(a, b) {
	  return a != a ? b == b : a !== b || a && _typeof_1(a) === 'object' || typeof a === 'function';
	}

	function validate_store(store, name) {
	  if (store != null && typeof store.subscribe !== 'function') {
	    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
	  }
	}

	function subscribe(store) {
	  if (store == null) {
	    return noop;
	  }

	  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    callbacks[_key - 1] = arguments[_key];
	  }

	  var unsub = store.subscribe.apply(store, callbacks);
	  return unsub.unsubscribe ? function () {
	    return unsub.unsubscribe();
	  } : unsub;
	}

	function component_subscribe(component, store, callback) {
	  component.$$.on_destroy.push(subscribe(store, callback));
	}

	function create_slot(definition, ctx, $$scope, fn) {
	  if (definition) {
	    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
	    return definition[0](slot_ctx);
	  }
	}

	function get_slot_context(definition, ctx, $$scope, fn) {
	  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
	}

	function get_slot_changes(definition, $$scope, dirty, fn) {
	  if (definition[2] && fn) {
	    var lets = definition[2](fn(dirty));

	    if ($$scope.dirty === undefined) {
	      return lets;
	    }

	    if (_typeof_1(lets) === 'object') {
	      var merged = [];
	      var len = Math.max($$scope.dirty.length, lets.length);

	      for (var i = 0; i < len; i += 1) {
	        merged[i] = $$scope.dirty[i] | lets[i];
	      }

	      return merged;
	    }

	    return $$scope.dirty | lets;
	  }

	  return $$scope.dirty;
	}

	var is_client = typeof window !== 'undefined';
	var now = is_client ? function () {
	  return window.performance.now();
	} : function () {
	  return Date.now();
	};
	var raf = is_client ? function (cb) {
	  return requestAnimationFrame(cb);
	} : noop; // used internally for testing

	var tasks = new Set();

	function run_tasks(now) {
	  tasks.forEach(function (task) {
	    if (!task.c(now)) {
	      tasks.delete(task);
	      task.f();
	    }
	  });
	  if (tasks.size !== 0) raf(run_tasks);
	}
	/**
	 * Creates a new task that runs on each raf frame
	 * until it returns a falsy value or is aborted
	 */


	function loop(callback) {
	  var task;
	  if (tasks.size === 0) raf(run_tasks);
	  return {
	    promise: new Promise(function (fulfill) {
	      tasks.add(task = {
	        c: callback,
	        f: fulfill
	      });
	    }),
	    abort: function abort() {
	      tasks.delete(task);
	    }
	  };
	}

	function append(target, node) {
	  target.appendChild(node);
	}

	function insert(target, node, anchor) {
	  target.insertBefore(node, anchor || null);
	}

	function detach(node) {
	  node.parentNode.removeChild(node);
	}

	function destroy_each(iterations, detaching) {
	  for (var i = 0; i < iterations.length; i += 1) {
	    if (iterations[i]) iterations[i].d(detaching);
	  }
	}

	function element(name) {
	  return document.createElement(name);
	}

	function svg_element(name) {
	  return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	function text(data) {
	  return document.createTextNode(data);
	}

	function space() {
	  return text(' ');
	}

	function empty() {
	  return text('');
	}

	function listen(node, event, handler, options) {
	  node.addEventListener(event, handler, options);
	  return function () {
	    return node.removeEventListener(event, handler, options);
	  };
	}

	function attr(node, attribute, value) {
	  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	function to_number(value) {
	  return value === '' ? undefined : +value;
	}

	function children(element) {
	  return Array.from(element.childNodes);
	}

	function set_input_value(input, value) {
	  if (value != null || input.value) {
	    input.value = value;
	  }
	}

	function set_style(node, key, value, important) {
	  node.style.setProperty(key, value, important ? 'important' : '');
	}

	function toggle_class(element, name, toggle) {
	  element.classList[toggle ? 'add' : 'remove'](name);
	}

	function custom_event(type, detail) {
	  var e = document.createEvent('CustomEvent');
	  e.initCustomEvent(type, false, false, detail);
	  return e;
	}

	var active_docs = new Set();
	var active = 0; // https://github.com/darkskyapp/string-hash/blob/master/index.js

	function hash(str) {
	  var hash = 5381;
	  var i = str.length;

	  while (i--) {
	    hash = (hash << 5) - hash ^ str.charCodeAt(i);
	  }

	  return hash >>> 0;
	}

	function create_rule(node, a, b, duration, delay, ease, fn) {
	  var uid = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
	  var step = 16.666 / duration;
	  var keyframes = '{\n';

	  for (var p = 0; p <= 1; p += step) {
	    var t = a + (b - a) * ease(p);
	    keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
	  }

	  var rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
	  var name = "__svelte_".concat(hash(rule), "_").concat(uid);
	  var doc = node.ownerDocument;
	  active_docs.add(doc);
	  var stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
	  var current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});

	  if (!current_rules[name]) {
	    current_rules[name] = true;
	    stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
	  }

	  var animation = node.style.animation || '';
	  node.style.animation = "".concat(animation ? "".concat(animation, ", ") : "").concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
	  active += 1;
	  return name;
	}

	function delete_rule(node, name) {
	  var previous = (node.style.animation || '').split(', ');
	  var next = previous.filter(name ? function (anim) {
	    return anim.indexOf(name) < 0;
	  } // remove specific animation
	  : function (anim) {
	    return anim.indexOf('__svelte') === -1;
	  } // remove all Svelte animations
	  );
	  var deleted = previous.length - next.length;

	  if (deleted) {
	    node.style.animation = next.join(', ');
	    active -= deleted;
	    if (!active) clear_rules();
	  }
	}

	function clear_rules() {
	  raf(function () {
	    if (active) return;
	    active_docs.forEach(function (doc) {
	      var stylesheet = doc.__svelte_stylesheet;
	      var i = stylesheet.cssRules.length;

	      while (i--) {
	        stylesheet.deleteRule(i);
	      }

	      doc.__svelte_rules = {};
	    });
	    active_docs.clear();
	  });
	}

	function create_animation(node, from, fn, params) {
	  if (!from) return noop;
	  var to = node.getBoundingClientRect();
	  if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom) return noop;

	  var _fn = fn(node, {
	    from: from,
	    to: to
	  }, params),
	      _fn$delay = _fn.delay,
	      delay = _fn$delay === void 0 ? 0 : _fn$delay,
	      _fn$duration = _fn.duration,
	      duration = _fn$duration === void 0 ? 300 : _fn$duration,
	      _fn$easing = _fn.easing,
	      easing = _fn$easing === void 0 ? identity : _fn$easing,
	      _fn$start = _fn.start,
	      start_time = _fn$start === void 0 ? now() + delay : _fn$start,
	      _fn$end = _fn.end,
	      end = _fn$end === void 0 ? start_time + duration : _fn$end,
	      _fn$tick = _fn.tick,
	      tick = _fn$tick === void 0 ? noop : _fn$tick,
	      css = _fn.css;

	  var running = true;
	  var started = false;
	  var name;

	  function start() {
	    if (css) {
	      name = create_rule(node, 0, 1, duration, delay, easing, css);
	    }

	    if (!delay) {
	      started = true;
	    }
	  }

	  function stop() {
	    if (css) delete_rule(node, name);
	    running = false;
	  }

	  loop(function (now) {
	    if (!started && now >= start_time) {
	      started = true;
	    }

	    if (started && now >= end) {
	      tick(1, 0);
	      stop();
	    }

	    if (!running) {
	      return false;
	    }

	    if (started) {
	      var p = now - start_time;
	      var t = 0 + 1 * easing(p / duration);
	      tick(t, 1 - t);
	    }

	    return true;
	  });
	  start();
	  tick(0, 1);
	  return stop;
	}

	function fix_position(node) {
	  var style = getComputedStyle(node);

	  if (style.position !== 'absolute' && style.position !== 'fixed') {
	    var width = style.width,
	        height = style.height;
	    var a = node.getBoundingClientRect();
	    node.style.position = 'absolute';
	    node.style.width = width;
	    node.style.height = height;
	    add_transform(node, a);
	  }
	}

	function add_transform(node, a) {
	  var b = node.getBoundingClientRect();

	  if (a.left !== b.left || a.top !== b.top) {
	    var style = getComputedStyle(node);
	    var transform = style.transform === 'none' ? '' : style.transform;
	    node.style.transform = "".concat(transform, " translate(").concat(a.left - b.left, "px, ").concat(a.top - b.top, "px)");
	  }
	}

	var current_component;

	function set_current_component(component) {
	  current_component = component;
	}

	function get_current_component() {
	  if (!current_component) throw new Error("Function called outside component initialization");
	  return current_component;
	}

	function onMount(fn) {
	  get_current_component().$$.on_mount.push(fn);
	}

	function onDestroy(fn) {
	  get_current_component().$$.on_destroy.push(fn);
	}

	function createEventDispatcher() {
	  var component = get_current_component();
	  return function (type, detail) {
	    var callbacks = component.$$.callbacks[type];

	    if (callbacks) {
	      // TODO are there situations where events could be dispatched
	      // in a server (non-DOM) environment?
	      var event = custom_event(type, detail);
	      callbacks.slice().forEach(function (fn) {
	        fn.call(component, event);
	      });
	    }
	  };
	}
	// shorthand events, or if we want to implement
	// a real bubbling mechanism


	function bubble(component, event) {
	  var callbacks = component.$$.callbacks[event.type];

	  if (callbacks) {
	    callbacks.slice().forEach(function (fn) {
	      return fn(event);
	    });
	  }
	}

	var dirty_components = [];
	var binding_callbacks = [];
	var render_callbacks = [];
	var flush_callbacks = [];
	var resolved_promise = Promise.resolve();
	var update_scheduled = false;

	function schedule_update() {
	  if (!update_scheduled) {
	    update_scheduled = true;
	    resolved_promise.then(flush$1);
	  }
	}

	function tick() {
	  schedule_update();
	  return resolved_promise;
	}

	function add_render_callback(fn) {
	  render_callbacks.push(fn);
	}

	var flushing = false;
	var seen_callbacks = new Set();

	function flush$1() {
	  if (flushing) return;
	  flushing = true;

	  do {
	    // first, call beforeUpdate functions
	    // and update components
	    for (var i = 0; i < dirty_components.length; i += 1) {
	      var component = dirty_components[i];
	      set_current_component(component);
	      update(component.$$);
	    }

	    dirty_components.length = 0;

	    while (binding_callbacks.length) {
	      binding_callbacks.pop()();
	    } // then, once components are updated, call
	    // afterUpdate functions. This may cause
	    // subsequent updates...


	    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
	      var callback = render_callbacks[_i];

	      if (!seen_callbacks.has(callback)) {
	        // ...so guard against infinite loops
	        seen_callbacks.add(callback);
	        callback();
	      }
	    }

	    render_callbacks.length = 0;
	  } while (dirty_components.length);

	  while (flush_callbacks.length) {
	    flush_callbacks.pop()();
	  }

	  update_scheduled = false;
	  flushing = false;
	  seen_callbacks.clear();
	}

	function update($$) {
	  if ($$.fragment !== null) {
	    $$.update();
	    run_all($$.before_update);
	    var dirty = $$.dirty;
	    $$.dirty = [-1];
	    $$.fragment && $$.fragment.p($$.ctx, dirty);
	    $$.after_update.forEach(add_render_callback);
	  }
	}

	var promise$1;

	function wait() {
	  if (!promise$1) {
	    promise$1 = Promise.resolve();
	    promise$1.then(function () {
	      promise$1 = null;
	    });
	  }

	  return promise$1;
	}

	function dispatch(node, direction, kind) {
	  node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
	}

	var outroing = new Set();
	var outros;

	function group_outros() {
	  outros = {
	    r: 0,
	    c: [],
	    p: outros // parent group

	  };
	}

	function check_outros() {
	  if (!outros.r) {
	    run_all(outros.c);
	  }

	  outros = outros.p;
	}

	function transition_in(block, local) {
	  if (block && block.i) {
	    outroing.delete(block);
	    block.i(local);
	  }
	}

	function transition_out(block, local, detach, callback) {
	  if (block && block.o) {
	    if (outroing.has(block)) return;
	    outroing.add(block);
	    outros.c.push(function () {
	      outroing.delete(block);

	      if (callback) {
	        if (detach) block.d(1);
	        callback();
	      }
	    });
	    block.o(local);
	  }
	}

	var null_transition = {
	  duration: 0
	};

	function create_in_transition(node, fn, params) {
	  var config = fn(node, params);
	  var running = false;
	  var animation_name;
	  var task;
	  var uid = 0;

	  function cleanup() {
	    if (animation_name) delete_rule(node, animation_name);
	  }

	  function go() {
	    var _ref = config || null_transition,
	        _ref$delay = _ref.delay,
	        delay = _ref$delay === void 0 ? 0 : _ref$delay,
	        _ref$duration = _ref.duration,
	        duration = _ref$duration === void 0 ? 300 : _ref$duration,
	        _ref$easing = _ref.easing,
	        easing = _ref$easing === void 0 ? identity : _ref$easing,
	        _ref$tick = _ref.tick,
	        tick = _ref$tick === void 0 ? noop : _ref$tick,
	        css = _ref.css;

	    if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
	    tick(0, 1);
	    var start_time = now() + delay;
	    var end_time = start_time + duration;
	    if (task) task.abort();
	    running = true;
	    add_render_callback(function () {
	      return dispatch(node, true, 'start');
	    });
	    task = loop(function (now) {
	      if (running) {
	        if (now >= end_time) {
	          tick(1, 0);
	          dispatch(node, true, 'end');
	          cleanup();
	          return running = false;
	        }

	        if (now >= start_time) {
	          var t = easing((now - start_time) / duration);
	          tick(t, 1 - t);
	        }
	      }

	      return running;
	    });
	  }

	  var started = false;
	  return {
	    start: function start() {
	      if (started) return;
	      delete_rule(node);

	      if (is_function(config)) {
	        config = config();
	        wait().then(go);
	      } else {
	        go();
	      }
	    },
	    invalidate: function invalidate() {
	      started = false;
	    },
	    end: function end() {
	      if (running) {
	        cleanup();
	        running = false;
	      }
	    }
	  };
	}

	function create_out_transition(node, fn, params) {
	  var config = fn(node, params);
	  var running = true;
	  var animation_name;
	  var group = outros;
	  group.r += 1;

	  function go() {
	    var _ref2 = config || null_transition,
	        _ref2$delay = _ref2.delay,
	        delay = _ref2$delay === void 0 ? 0 : _ref2$delay,
	        _ref2$duration = _ref2.duration,
	        duration = _ref2$duration === void 0 ? 300 : _ref2$duration,
	        _ref2$easing = _ref2.easing,
	        easing = _ref2$easing === void 0 ? identity : _ref2$easing,
	        _ref2$tick = _ref2.tick,
	        tick = _ref2$tick === void 0 ? noop : _ref2$tick,
	        css = _ref2.css;

	    if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
	    var start_time = now() + delay;
	    var end_time = start_time + duration;
	    add_render_callback(function () {
	      return dispatch(node, false, 'start');
	    });
	    loop(function (now) {
	      if (running) {
	        if (now >= end_time) {
	          tick(0, 1);
	          dispatch(node, false, 'end');

	          if (! --group.r) {
	            // this will result in `end()` being called,
	            // so we don't need to clean up here
	            run_all(group.c);
	          }

	          return false;
	        }

	        if (now >= start_time) {
	          var t = easing((now - start_time) / duration);
	          tick(1 - t, t);
	        }
	      }

	      return running;
	    });
	  }

	  if (is_function(config)) {
	    wait().then(function () {
	      // @ts-ignore
	      config = config();
	      go();
	    });
	  } else {
	    go();
	  }

	  return {
	    end: function end(reset) {
	      if (reset && config.tick) {
	        config.tick(1, 0);
	      }

	      if (running) {
	        if (animation_name) delete_rule(node, animation_name);
	        running = false;
	      }
	    }
	  };
	}

	function handle_promise(promise, info) {
	  var token = info.token = {};

	  function update(type, index, key, value) {
	    if (info.token !== token) return;
	    info.resolved = value;
	    var child_ctx = info.ctx;

	    if (key !== undefined) {
	      child_ctx = child_ctx.slice();
	      child_ctx[key] = value;
	    }

	    var block = type && (info.current = type)(child_ctx);
	    var needs_flush = false;

	    if (info.block) {
	      if (info.blocks) {
	        info.blocks.forEach(function (block, i) {
	          if (i !== index && block) {
	            group_outros();
	            transition_out(block, 1, 1, function () {
	              info.blocks[i] = null;
	            });
	            check_outros();
	          }
	        });
	      } else {
	        info.block.d(1);
	      }

	      block.c();
	      transition_in(block, 1);
	      block.m(info.mount(), info.anchor);
	      needs_flush = true;
	    }

	    info.block = block;
	    if (info.blocks) info.blocks[index] = block;

	    if (needs_flush) {
	      flush$1();
	    }
	  }

	  if (is_promise(promise)) {
	    var _current_component = get_current_component();

	    promise.then(function (value) {
	      set_current_component(_current_component);
	      update(info.then, 1, info.value, value);
	      set_current_component(null);
	    }, function (error) {
	      set_current_component(_current_component);
	      update(info.catch, 2, info.error, error);
	      set_current_component(null);
	    }); // if we previously had a then/catch block, destroy it

	    if (info.current !== info.pending) {
	      update(info.pending, 0);
	      return true;
	    }
	  } else {
	    if (info.current !== info.then) {
	      update(info.then, 1, info.value, promise);
	      return true;
	    }

	    info.resolved = promise;
	  }
	}

	var globals = typeof window !== 'undefined' ? window : global;

	function outro_and_destroy_block(block, lookup) {
	  transition_out(block, 1, 1, function () {
	    lookup.delete(block.key);
	  });
	}

	function fix_and_outro_and_destroy_block(block, lookup) {
	  block.f();
	  outro_and_destroy_block(block, lookup);
	}

	function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
	  var o = old_blocks.length;
	  var n = list.length;
	  var i = o;
	  var old_indexes = {};

	  while (i--) {
	    old_indexes[old_blocks[i].key] = i;
	  }

	  var new_blocks = [];
	  var new_lookup = new Map();
	  var deltas = new Map();
	  i = n;

	  while (i--) {
	    var child_ctx = get_context(ctx, list, i);
	    var key = get_key(child_ctx);
	    var block = lookup.get(key);

	    if (!block) {
	      block = create_each_block(key, child_ctx);
	      block.c();
	    } else if (dynamic) {
	      block.p(child_ctx, dirty);
	    }

	    new_lookup.set(key, new_blocks[i] = block);
	    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
	  }

	  var will_move = new Set();
	  var did_move = new Set();

	  function insert(block) {
	    transition_in(block, 1);
	    block.m(node, next, lookup.has(block.key));
	    lookup.set(block.key, block);
	    next = block.first;
	    n--;
	  }

	  while (o && n) {
	    var new_block = new_blocks[n - 1];
	    var old_block = old_blocks[o - 1];
	    var new_key = new_block.key;
	    var old_key = old_block.key;

	    if (new_block === old_block) {
	      // do nothing
	      next = new_block.first;
	      o--;
	      n--;
	    } else if (!new_lookup.has(old_key)) {
	      // remove old block
	      destroy(old_block, lookup);
	      o--;
	    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
	      insert(new_block);
	    } else if (did_move.has(old_key)) {
	      o--;
	    } else if (deltas.get(new_key) > deltas.get(old_key)) {
	      did_move.add(new_key);
	      insert(new_block);
	    } else {
	      will_move.add(old_key);
	      o--;
	    }
	  }

	  while (o--) {
	    var _old_block = old_blocks[o];
	    if (!new_lookup.has(_old_block.key)) destroy(_old_block, lookup);
	  }

	  while (n) {
	    insert(new_blocks[n - 1]);
	  }

	  return new_blocks;
	}

	function validate_each_keys(ctx, list, get_context, get_key) {
	  var keys = new Set();

	  for (var i = 0; i < list.length; i++) {
	    var key = get_key(get_context(ctx, list, i));

	    if (keys.has(key)) {
	      throw new Error("Cannot have duplicate keys in a keyed each");
	    }

	    keys.add(key);
	  }
	}

	function get_spread_update(levels, updates) {
	  var update = {};
	  var to_null_out = {};
	  var accounted_for = {
	    $$scope: 1
	  };
	  var i = levels.length;

	  while (i--) {
	    var o = levels[i];
	    var n = updates[i];

	    if (n) {
	      for (var key in o) {
	        if (!(key in n)) to_null_out[key] = 1;
	      }

	      for (var _key3 in n) {
	        if (!accounted_for[_key3]) {
	          update[_key3] = n[_key3];
	          accounted_for[_key3] = 1;
	        }
	      }

	      levels[i] = n;
	    } else {
	      for (var _key4 in o) {
	        accounted_for[_key4] = 1;
	      }
	    }
	  }

	  for (var _key5 in to_null_out) {
	    if (!(_key5 in update)) update[_key5] = undefined;
	  }

	  return update;
	}

	function get_spread_object(spread_props) {
	  return _typeof_1(spread_props) === 'object' && spread_props !== null ? spread_props : {};
	} // source: https://html.spec.whatwg.org/multipage/indices.html

	function create_component(block) {
	  block && block.c();
	}

	function mount_component(component, target, anchor) {
	  var _component$$$ = component.$$,
	      fragment = _component$$$.fragment,
	      on_mount = _component$$$.on_mount,
	      on_destroy = _component$$$.on_destroy,
	      after_update = _component$$$.after_update;
	  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

	  add_render_callback(function () {
	    var new_on_destroy = on_mount.map(run$1).filter(is_function);

	    if (on_destroy) {
	      on_destroy.push.apply(on_destroy, toConsumableArray(new_on_destroy));
	    } else {
	      // Edge case - component was destroyed immediately,
	      // most likely as a result of a binding initialising
	      run_all(new_on_destroy);
	    }

	    component.$$.on_mount = [];
	  });
	  after_update.forEach(add_render_callback);
	}

	function destroy_component(component, detaching) {
	  var $$ = component.$$;

	  if ($$.fragment !== null) {
	    run_all($$.on_destroy);
	    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
	    // preserve final state?)

	    $$.on_destroy = $$.fragment = null;
	    $$.ctx = [];
	  }
	}

	function make_dirty(component, i) {
	  if (component.$$.dirty[0] === -1) {
	    dirty_components.push(component);
	    schedule_update();
	    component.$$.dirty.fill(0);
	  }

	  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
	}

	function init(component, options, instance, create_fragment, not_equal, props) {
	  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
	  var parent_component = current_component;
	  set_current_component(component);
	  var prop_values = options.props || {};
	  var $$ = component.$$ = {
	    fragment: null,
	    ctx: null,
	    // state
	    props: props,
	    update: noop,
	    not_equal: not_equal,
	    bound: blank_object(),
	    // lifecycle
	    on_mount: [],
	    on_destroy: [],
	    before_update: [],
	    after_update: [],
	    context: new Map(parent_component ? parent_component.$$.context : []),
	    // everything else
	    callbacks: blank_object(),
	    dirty: dirty
	  };
	  var ready = false;
	  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
	    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

	    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	      if ($$.bound[i]) $$.bound[i](value);
	      if (ready) make_dirty(component, i);
	    }

	    return ret;
	  }) : [];
	  $$.update();
	  ready = true;
	  run_all($$.before_update); // `false` as a special case of no DOM component

	  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

	  if (options.target) {
	    if (options.hydrate) {
	      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

	      $$.fragment && $$.fragment.l(nodes);
	      nodes.forEach(detach);
	    } else {
	      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	      $$.fragment && $$.fragment.c();
	    }

	    if (options.intro) transition_in(component.$$.fragment);
	    mount_component(component, options.target, options.anchor);
	    flush$1();
	  }

	  set_current_component(parent_component);
	}

	var SvelteComponent = /*#__PURE__*/function () {
	  function SvelteComponent() {
	    classCallCheck(this, SvelteComponent);
	  }

	  createClass(SvelteComponent, [{
	    key: "$destroy",
	    value: function $destroy() {
	      destroy_component(this, 1);
	      this.$destroy = noop;
	    }
	  }, {
	    key: "$on",
	    value: function $on(type, callback) {
	      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
	      callbacks.push(callback);
	      return function () {
	        var index = callbacks.indexOf(callback);
	        if (index !== -1) callbacks.splice(index, 1);
	      };
	    }
	  }, {
	    key: "$set",
	    value: function $set() {// overridden by instance, if it has props
	    }
	  }]);

	  return SvelteComponent;
	}();

	function dispatch_dev(type, detail) {
	  document.dispatchEvent(custom_event(type, Object.assign({
	    version: '3.20.1'
	  }, detail)));
	}

	function append_dev(target, node) {
	  dispatch_dev("SvelteDOMInsert", {
	    target: target,
	    node: node
	  });
	  append(target, node);
	}

	function insert_dev(target, node, anchor) {
	  dispatch_dev("SvelteDOMInsert", {
	    target: target,
	    node: node,
	    anchor: anchor
	  });
	  insert(target, node, anchor);
	}

	function detach_dev(node) {
	  dispatch_dev("SvelteDOMRemove", {
	    node: node
	  });
	  detach(node);
	}

	function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
	  var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
	  if (has_prevent_default) modifiers.push('preventDefault');
	  if (has_stop_propagation) modifiers.push('stopPropagation');
	  dispatch_dev("SvelteDOMAddEventListener", {
	    node: node,
	    event: event,
	    handler: handler,
	    modifiers: modifiers
	  });
	  var dispose = listen(node, event, handler, options);
	  return function () {
	    dispatch_dev("SvelteDOMRemoveEventListener", {
	      node: node,
	      event: event,
	      handler: handler,
	      modifiers: modifiers
	    });
	    dispose();
	  };
	}

	function attr_dev(node, attribute, value) {
	  attr(node, attribute, value);
	  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
	    node: node,
	    attribute: attribute
	  });else dispatch_dev("SvelteDOMSetAttribute", {
	    node: node,
	    attribute: attribute,
	    value: value
	  });
	}

	function prop_dev(node, property, value) {
	  node[property] = value;
	  dispatch_dev("SvelteDOMSetProperty", {
	    node: node,
	    property: property,
	    value: value
	  });
	}

	function set_data_dev(text, data) {
	  data = '' + data;
	  if (text.data === data) return;
	  dispatch_dev("SvelteDOMSetData", {
	    node: text,
	    data: data
	  });
	  text.data = data;
	}

	function validate_each_argument(arg) {
	  if (typeof arg !== 'string' && !(arg && _typeof_1(arg) === 'object' && 'length' in arg)) {
	    var msg = '{#each} only iterates over array-like objects.';

	    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
	      msg += ' You can use a spread to convert this iterable into an array.';
	    }

	    throw new Error(msg);
	  }
	}

	function validate_slots(name, slot, keys) {
	  for (var _i2 = 0, _Object$keys = Object.keys(slot); _i2 < _Object$keys.length; _i2++) {
	    var slot_key = _Object$keys[_i2];

	    if (!~keys.indexOf(slot_key)) {
	      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
	    }
	  }
	}

	var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
	  inherits(SvelteComponentDev, _SvelteComponent);

	  var _super2 = _createSuper(SvelteComponentDev);

	  function SvelteComponentDev(options) {
	    classCallCheck(this, SvelteComponentDev);

	    if (!options || !options.target && !options.$$inline) {
	      throw new Error("'target' is a required option");
	    }

	    return _super2.call(this);
	  }

	  createClass(SvelteComponentDev, [{
	    key: "$destroy",
	    value: function $destroy() {
	      get$1(getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

	      this.$destroy = function () {
	        console.warn("Component was already destroyed"); // eslint-disable-line no-console
	      };
	    }
	  }, {
	    key: "$capture_state",
	    value: function $capture_state() {}
	  }, {
	    key: "$inject_state",
	    value: function $inject_state() {}
	  }]);

	  return SvelteComponentDev;
	}(SvelteComponent);

	function _createSuper$1(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$2()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file = "test/src/dynamic-attr/index.svelte";

	function create_fragment(ctx) {
	  var img;
	  var img_src_value;
	  var img_alt_value;
	  var block = {
	    c: function create() {
	      img = element("img");
	      if (img.src !== (img_src_value =
	      /*src*/
	      ctx[0])) attr_dev(img, "src", img_src_value);
	      attr_dev(img, "alt", img_alt_value = "" + (
	      /*name*/
	      ctx[1] + " dancing"));
	      add_location(img, file, 6, 0, 111);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, img, anchor);
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(img);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance($$self, $$props, $$invalidate) {
	  var src = "favicon.png";
	  var name = "Rick Astley";
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Dynamic_attr> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Dynamic_attr", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      src: src,
	      name: name
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("src" in $$props) $$invalidate(0, src = $$props.src);
	    if ("name" in $$props) $$invalidate(1, name = $$props.name);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [src, name];
	}

	var Dynamic_attr = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Dynamic_attr, _SvelteComponentDev);

	  var _super = _createSuper$1(Dynamic_attr);

	  function Dynamic_attr(options) {
	    var _this;

	    classCallCheck(this, Dynamic_attr);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Dynamic_attr",
	      options: options,
	      id: create_fragment.name
	    });
	    return _this;
	  }

	  return Dynamic_attr;
	}(SvelteComponentDev);

	function _createSuper$2(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$3()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$1 = "test/src/html-tags/index.svelte";

	function create_fragment$1(ctx) {
	  var p;
	  var block = {
	    c: function create() {
	      p = element("p");
	      add_location(p, file$1, 4, 0, 74);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, p, anchor);
	      p.innerHTML =
	      /*string*/
	      ctx[0];
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(p);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$1.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$1($$self, $$props, $$invalidate) {
	  var string = "here's some <strong>HTML!!!</strong>";
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Html_tags> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Html_tags", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      string: string
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("string" in $$props) $$invalidate(0, string = $$props.string);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [string];
	}

	var Html_tags = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Html_tags, _SvelteComponentDev);

	  var _super = _createSuper$2(Html_tags);

	  function Html_tags(options) {
	    var _this;

	    classCallCheck(this, Html_tags);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Html_tags",
	      options: options,
	      id: create_fragment$1.name
	    });
	    return _this;
	  }

	  return Html_tags;
	}(SvelteComponentDev);

	function _createSuper$3(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$4()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$2 = "test/src/reactive-statements/index.svelte";

	function create_fragment$2(ctx) {
	  var button;
	  var t0;
	  var t1;
	  var t2;
	  var t3_value = (
	  /*count*/
	  ctx[0] === 1 ? "time" : "times") + "";
	  var t3;
	  var dispose;
	  var block = {
	    c: function create() {
	      button = element("button");
	      t0 = text("Clicked ");
	      t1 = text(
	      /*count*/
	      ctx[0]);
	      t2 = space();
	      t3 = text(t3_value);
	      add_location(button, file$2, 13, 0, 159);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, button, anchor);
	      append_dev(button, t0);
	      append_dev(button, t1);
	      append_dev(button, t2);
	      append_dev(button, t3);
	      if (remount) dispose();
	      dispose = listen_dev(button, "click",
	      /*handleClick*/
	      ctx[1], false, false, false);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*count*/
	      1) set_data_dev(t1,
	      /*count*/
	      ctx[0]);
	      if (dirty &
	      /*count*/
	      1 && t3_value !== (t3_value = (
	      /*count*/
	      ctx[0] === 1 ? "time" : "times") + "")) set_data_dev(t3, t3_value);
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(button);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$2.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$2($$self, $$props, $$invalidate) {
	  var count = 0;

	  function handleClick() {
	    $$invalidate(0, count += 1);
	  }

	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Reactive_statements> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Reactive_statements", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      count: count,
	      handleClick: handleClick
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("count" in $$props) $$invalidate(0, count = $$props.count);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*count*/
	    1) {
	       if (count >= 10) {
	        alert("count is dangerously high!");
	        $$invalidate(0, count = 9);
	      }
	    }
	  };

	  return [count, handleClick];
	}

	var Reactive_statements = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Reactive_statements, _SvelteComponentDev);

	  var _super = _createSuper$3(Reactive_statements);

	  function Reactive_statements(options) {
	    var _this;

	    classCallCheck(this, Reactive_statements);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Reactive_statements",
	      options: options,
	      id: create_fragment$2.name
	    });
	    return _this;
	  }

	  return Reactive_statements;
	}(SvelteComponentDev);

	function _createSuper$4(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$5()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$3 = "test/src/spread-props/Info.svelte";

	function create_fragment$3(ctx) {
	  var p;
	  var t0;
	  var code;
	  var t1;
	  var t2;
	  var t3;
	  var t4;
	  var t5;
	  var t6;
	  var a0;
	  var t7;
	  var a0_href_value;
	  var t8;
	  var a1;
	  var t9;
	  var block = {
	    c: function create() {
	      p = element("p");
	      t0 = text("The ");
	      code = element("code");
	      t1 = text(
	      /*name*/
	      ctx[0]);
	      t2 = text(" package is ");
	      t3 = text(
	      /*speed*/
	      ctx[2]);
	      t4 = text(" fast.\n\tDownload version ");
	      t5 = text(
	      /*version*/
	      ctx[1]);
	      t6 = text(" from ");
	      a0 = element("a");
	      t7 = text("npm");
	      t8 = text("\n\tand ");
	      a1 = element("a");
	      t9 = text("learn more here");
	      add_location(code, file$3, 8, 5, 108);
	      attr_dev(a0, "href", a0_href_value = "https://www.npmjs.com/package/" +
	      /*name*/
	      ctx[0]);
	      add_location(a0, file$3, 9, 33, 186);
	      attr_dev(a1, "href",
	      /*website*/
	      ctx[3]);
	      add_location(a1, file$3, 10, 5, 246);
	      add_location(p, file$3, 7, 0, 99);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, p, anchor);
	      append_dev(p, t0);
	      append_dev(p, code);
	      append_dev(code, t1);
	      append_dev(p, t2);
	      append_dev(p, t3);
	      append_dev(p, t4);
	      append_dev(p, t5);
	      append_dev(p, t6);
	      append_dev(p, a0);
	      append_dev(a0, t7);
	      append_dev(p, t8);
	      append_dev(p, a1);
	      append_dev(a1, t9);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*name*/
	      1) set_data_dev(t1,
	      /*name*/
	      ctx[0]);
	      if (dirty &
	      /*speed*/
	      4) set_data_dev(t3,
	      /*speed*/
	      ctx[2]);
	      if (dirty &
	      /*version*/
	      2) set_data_dev(t5,
	      /*version*/
	      ctx[1]);

	      if (dirty &
	      /*name*/
	      1 && a0_href_value !== (a0_href_value = "https://www.npmjs.com/package/" +
	      /*name*/
	      ctx[0])) {
	        attr_dev(a0, "href", a0_href_value);
	      }

	      if (dirty &
	      /*website*/
	      8) {
	        attr_dev(a1, "href",
	        /*website*/
	        ctx[3]);
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(p);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$3.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$3($$self, $$props, $$invalidate) {
	  var name = $$props.name;
	  var version = $$props.version;
	  var speed = $$props.speed;
	  var website = $$props.website;
	  var writable_props = ["name", "version", "speed", "website"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Info> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Info", $$slots, []);

	  $$self.$set = function ($$props) {
	    if ("name" in $$props) $$invalidate(0, name = $$props.name);
	    if ("version" in $$props) $$invalidate(1, version = $$props.version);
	    if ("speed" in $$props) $$invalidate(2, speed = $$props.speed);
	    if ("website" in $$props) $$invalidate(3, website = $$props.website);
	  };

	  $$self.$capture_state = function () {
	    return {
	      name: name,
	      version: version,
	      speed: speed,
	      website: website
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("name" in $$props) $$invalidate(0, name = $$props.name);
	    if ("version" in $$props) $$invalidate(1, version = $$props.version);
	    if ("speed" in $$props) $$invalidate(2, speed = $$props.speed);
	    if ("website" in $$props) $$invalidate(3, website = $$props.website);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [name, version, speed, website];
	}

	var Info = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Info, _SvelteComponentDev);

	  var _super = _createSuper$4(Info);

	  function Info(options) {
	    var _this;

	    classCallCheck(this, Info);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
	      name: 0,
	      version: 1,
	      speed: 2,
	      website: 3
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Info",
	      options: options,
	      id: create_fragment$3.name
	    });
	    var ctx = _this.$$.ctx;
	    var props = options.props || {};

	    if (
	    /*name*/
	    ctx[0] === undefined && !("name" in props)) {
	      console.warn("<Info> was created without expected prop 'name'");
	    }

	    if (
	    /*version*/
	    ctx[1] === undefined && !("version" in props)) {
	      console.warn("<Info> was created without expected prop 'version'");
	    }

	    if (
	    /*speed*/
	    ctx[2] === undefined && !("speed" in props)) {
	      console.warn("<Info> was created without expected prop 'speed'");
	    }

	    if (
	    /*website*/
	    ctx[3] === undefined && !("website" in props)) {
	      console.warn("<Info> was created without expected prop 'website'");
	    }

	    return _this;
	  }

	  createClass(Info, [{
	    key: "name",
	    get: function get() {
	      throw new Error("<Info>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Info>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "version",
	    get: function get() {
	      throw new Error("<Info>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Info>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "speed",
	    get: function get() {
	      throw new Error("<Info>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Info>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "website",
	    get: function get() {
	      throw new Error("<Info>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Info>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return Info;
	}(SvelteComponentDev);

	function _createSuper$5(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$6()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function create_fragment$4(ctx) {
	  var current;
	  var info_spread_levels = [
	  /*pkg*/
	  ctx[0]];
	  var info_props = {};

	  for (var i = 0; i < info_spread_levels.length; i += 1) {
	    info_props = assign(info_props, info_spread_levels[i]);
	  }

	  var info = new Info({
	    props: info_props,
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      create_component(info.$$.fragment);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      mount_component(info, target, anchor);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      var info_changes = dirty &
	      /*pkg*/
	      1 ? get_spread_update(info_spread_levels, [get_spread_object(
	      /*pkg*/
	      ctx[0])]) : {};
	      info.$set(info_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(info.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(info.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(info, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$4.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$4($$self, $$props, $$invalidate) {
	  var pkg = {
	    name: "svelte",
	    version: 3,
	    speed: "blazing",
	    website: "https://svelte.dev"
	  };
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Spread_props> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Spread_props", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      Info: Info,
	      pkg: pkg
	    };
	  };

	  return [pkg];
	}

	var Spread_props = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Spread_props, _SvelteComponentDev);

	  var _super = _createSuper$5(Spread_props);

	  function Spread_props(options) {
	    var _this;

	    classCallCheck(this, Spread_props);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Spread_props",
	      options: options,
	      id: create_fragment$4.name
	    });
	    return _this;
	  }

	  return Spread_props;
	}(SvelteComponentDev);

	var runtime_1 = createCommonjsModule(function (module) {
	  /**
	   * Copyright (c) 2014-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */
	  var runtime = function (exports) {

	    var Op = Object.prototype;
	    var hasOwn = Op.hasOwnProperty;
	    var undefined$1; // More compressible than void 0.

	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	      var generator = Object.create(protoGenerator.prototype);
	      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.

	      generator._invoke = makeInvokeMethod(innerFn, self, context);
	      return generator;
	    }

	    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.

	    function tryCatch(fn, obj, arg) {
	      try {
	        return {
	          type: "normal",
	          arg: fn.call(obj, arg)
	        };
	      } catch (err) {
	        return {
	          type: "throw",
	          arg: err
	        };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.

	    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.

	    function Generator() {}

	    function GeneratorFunction() {}

	    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	    // don't natively support it.


	    var IteratorPrototype = {};

	    IteratorPrototype[iteratorSymbol] = function () {
	      return this;
	    };

	    var getProto = Object.getPrototypeOf;
	    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	      // This environment has a native %IteratorPrototype%; use it instead
	      // of the polyfill.
	      IteratorPrototype = NativeIteratorPrototype;
	    }

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.

	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }

	    exports.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    exports.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;

	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }

	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    }; // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `hasOwn.call(value, "__await")` to determine if the yielded value is
	    // meant to be awaited.


	    exports.awrap = function (arg) {
	      return {
	        __await: arg
	      };
	    };

	    function AsyncIterator(generator, PromiseImpl) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);

	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;

	          if (value && _typeof_1(value) === "object" && hasOwn.call(value, "__await")) {
	            return PromiseImpl.resolve(value.__await).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return PromiseImpl.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration.
	            result.value = unwrapped;
	            resolve(result);
	          }, function (error) {
	            // If a rejected Promise was yielded, throw the rejection back
	            // into the async generator function so it can be handled there.
	            return invoke("throw", error, resolve, reject);
	          });
	        }
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new PromiseImpl(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise = // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      } // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).


	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	      return this;
	    };

	    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.

	    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	      if (PromiseImpl === void 0) PromiseImpl = Promise;
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;
	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          } // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


	          return doneResult();
	        }

	        context.method = method;
	        context.arg = arg;

	        while (true) {
	          var delegate = context.delegate;

	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);

	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }

	          if (context.method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = context.arg;
	          } else if (context.method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw context.arg;
	            }

	            context.dispatchException(context.arg);
	          } else if (context.method === "return") {
	            context.abrupt("return", context.arg);
	          }

	          state = GenStateExecuting;
	          var record = tryCatch(innerFn, self, context);

	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            if (record.arg === ContinueSentinel) {
	              continue;
	            }

	            return {
	              value: record.arg,
	              done: context.done
	            };
	          } else if (record.type === "throw") {
	            state = GenStateCompleted; // Dispatch the exception by looping back around to the
	            // context.dispatchException(context.arg) call above.

	            context.method = "throw";
	            context.arg = record.arg;
	          }
	        }
	      };
	    } // Call delegate.iterator[context.method](context.arg) and handle the
	    // result, either by returning a { value, done } result from the
	    // delegate iterator, or by modifying context.method and context.arg,
	    // setting context.delegate to null, and returning the ContinueSentinel.


	    function maybeInvokeDelegate(delegate, context) {
	      var method = delegate.iterator[context.method];

	      if (method === undefined$1) {
	        // A .throw or .return when the delegate iterator has no .throw
	        // method always terminates the yield* loop.
	        context.delegate = null;

	        if (context.method === "throw") {
	          // Note: ["return"] must be used for ES3 parsing compatibility.
	          if (delegate.iterator["return"]) {
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            context.method = "return";
	            context.arg = undefined$1;
	            maybeInvokeDelegate(delegate, context);

	            if (context.method === "throw") {
	              // If maybeInvokeDelegate(context) changed context.method from
	              // "return" to "throw", let that override the TypeError below.
	              return ContinueSentinel;
	            }
	          }

	          context.method = "throw";
	          context.arg = new TypeError("The iterator does not provide a 'throw' method");
	        }

	        return ContinueSentinel;
	      }

	      var record = tryCatch(method, delegate.iterator, context.arg);

	      if (record.type === "throw") {
	        context.method = "throw";
	        context.arg = record.arg;
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      var info = record.arg;

	      if (!info) {
	        context.method = "throw";
	        context.arg = new TypeError("iterator result is not an object");
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      if (info.done) {
	        // Assign the result of the finished delegate to the temporary
	        // variable specified by delegate.resultName (see delegateYield).
	        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
	        // exception, let the outer generator proceed normally. If
	        // context.method was "next", forget context.arg since it has been
	        // "consumed" by the delegate iterator. If context.method was
	        // "return", allow the original .return call to continue in the
	        // outer generator.

	        if (context.method !== "return") {
	          context.method = "next";
	          context.arg = undefined$1;
	        }
	      } else {
	        // Re-yield the result returned by the delegate method.
	        return info;
	      } // The delegate iterator is finished, so forget it and continue with
	      // the outer generator.


	      context.delegate = null;
	      return ContinueSentinel;
	    } // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.


	    defineIteratorMethods(Gp);
	    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
	    // @@iterator function is called on it. Some browsers' implementations of the
	    // iterator prototype chain incorrectly implement this, causing the Generator
	    // object to not be returned from this call. This ensures that doesn't happen.
	    // See https://github.com/facebook/regenerator/issues/274 for more details.

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = {
	        tryLoc: locs[0]
	      };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{
	        tryLoc: "root"
	      }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    exports.keys = function (object) {
	      var keys = [];

	      for (var key in object) {
	        keys.push(key);
	      }

	      keys.reverse(); // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.

	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();

	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        } // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.


	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];

	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined$1;
	            next.done = true;
	            return next;
	          };

	          return next.next = next;
	        }
	      } // Return an iterator with no values.


	      return {
	        next: doneResult
	      };
	    }

	    exports.values = values;

	    function doneResult() {
	      return {
	        value: undefined$1,
	        done: true
	      };
	    }

	    Context.prototype = {
	      constructor: Context,
	      reset: function reset(skipTempReset) {
	        this.prev = 0;
	        this.next = 0; // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.

	        this.sent = this._sent = undefined$1;
	        this.done = false;
	        this.delegate = null;
	        this.method = "next";
	        this.arg = undefined$1;
	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined$1;
	            }
	          }
	        }
	      },
	      stop: function stop() {
	        this.done = true;
	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;

	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },
	      dispatchException: function dispatchException(exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;

	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;

	          if (caught) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            context.method = "next";
	            context.arg = undefined$1;
	          }

	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },
	      abrupt: function abrupt(type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.method = "next";
	          this.next = finallyEntry.finallyLoc;
	          return ContinueSentinel;
	        }

	        return this.complete(record);
	      },
	      complete: function complete(record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = this.arg = record.arg;
	          this.method = "return";
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }

	        return ContinueSentinel;
	      },
	      finish: function finish(finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },
	      "catch": function _catch(tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;

	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }

	            return thrown;
	          }
	        } // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.


	        throw new Error("illegal catch attempt");
	      },
	      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        if (this.method === "next") {
	          // Deliberately forget the last sent value so that we don't
	          // accidentally pass it on to the delegate.
	          this.arg = undefined$1;
	        }

	        return ContinueSentinel;
	      }
	    }; // Regardless of whether this script is executing as a CommonJS module
	    // or not, return the runtime object so that we can declare the variable
	    // regeneratorRuntime in the outer scope, which allows this module to be
	    // injected easily by `bin/regenerator --include-runtime script.js`.

	    return exports;
	  }( // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports );

	  try {
	    regeneratorRuntime = runtime;
	  } catch (accidentalStrictMode) {
	    // This module should not be running in strict mode, so the above
	    // assignment should always work unless something is misconfigured. Just
	    // in case runtime.js accidentally runs in strict mode, we can escape
	    // strict mode using a global Function call. This could conceivably fail
	    // if a Content Security Policy forbids using Function, but in that case
	    // the proper solution is to fix the accidental strict mode problem. If
	    // you've misconfigured your bundler to force strict mode and applied a
	    // CSP to forbid Function, and you're not willing to fix either of those
	    // problems, please detail your unique predicament in a GitHub issue.
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	});

	var regenerator = runtime_1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var asyncToGenerator = _asyncToGenerator;

	function _createSuper$6(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$7()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var Error_1 = globals.Error;
	var file$4 = "test/src/await-blocks/index.svelte"; // (28:0) {:catch error}

	function create_catch_block(ctx) {
	  var p;
	  var t_value =
	  /*error*/
	  ctx[3].message + "";
	  var t;
	  var block = {
	    c: function create() {
	      p = element("p");
	      t = text(t_value);
	      set_style(p, "color", "red");
	      add_location(p, file$4, 28, 1, 480);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, p, anchor);
	      append_dev(p, t);
	    },
	    p: function update(ctx, dirty) {
	      if (dirty &
	      /*promise*/
	      1 && t_value !== (t_value =
	      /*error*/
	      ctx[3].message + "")) set_data_dev(t, t_value);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(p);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_catch_block.name,
	    type: "catch",
	    source: "(28:0) {:catch error}",
	    ctx: ctx
	  });
	  return block;
	} // (26:0) {:then number}


	function create_then_block(ctx) {
	  var p;
	  var t0;
	  var t1_value =
	  /*number*/
	  ctx[2] + "";
	  var t1;
	  var block = {
	    c: function create() {
	      p = element("p");
	      t0 = text("The number is ");
	      t1 = text(t1_value);
	      add_location(p, file$4, 26, 1, 434);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, p, anchor);
	      append_dev(p, t0);
	      append_dev(p, t1);
	    },
	    p: function update(ctx, dirty) {
	      if (dirty &
	      /*promise*/
	      1 && t1_value !== (t1_value =
	      /*number*/
	      ctx[2] + "")) set_data_dev(t1, t1_value);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(p);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_then_block.name,
	    type: "then",
	    source: "(26:0) {:then number}",
	    ctx: ctx
	  });
	  return block;
	} // (24:16)   <p>...waiting</p> {:then number}


	function create_pending_block(ctx) {
	  var p;
	  var block = {
	    c: function create() {
	      p = element("p");
	      p.textContent = "...waiting";
	      add_location(p, file$4, 24, 1, 400);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, p, anchor);
	    },
	    p: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(p);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_pending_block.name,
	    type: "pending",
	    source: "(24:16)   <p>...waiting</p> {:then number}",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$5(ctx) {
	  var button;
	  var t1;
	  var await_block_anchor;
	  var promise_1;
	  var dispose;
	  var info = {
	    ctx: ctx,
	    current: null,
	    token: null,
	    pending: create_pending_block,
	    then: create_then_block,
	    catch: create_catch_block,
	    value: 2,
	    error: 3
	  };
	  handle_promise(promise_1 =
	  /*promise*/
	  ctx[0], info);
	  var block = {
	    c: function create() {
	      button = element("button");
	      button.textContent = "generate random number";
	      t1 = space();
	      await_block_anchor = empty();
	      info.block.c();
	      add_location(button, file$4, 19, 0, 315);
	    },
	    l: function claim(nodes) {
	      throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, button, anchor);
	      insert_dev(target, t1, anchor);
	      insert_dev(target, await_block_anchor, anchor);
	      info.block.m(target, info.anchor = anchor);

	      info.mount = function () {
	        return await_block_anchor.parentNode;
	      };

	      info.anchor = await_block_anchor;
	      if (remount) dispose();
	      dispose = listen_dev(button, "click",
	      /*handleClick*/
	      ctx[1], false, false, false);
	    },
	    p: function update(new_ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      ctx = new_ctx;
	      info.ctx = ctx;

	      if (dirty &
	      /*promise*/
	      1 && promise_1 !== (promise_1 =
	      /*promise*/
	      ctx[0]) && handle_promise(promise_1, info)) ; else {
	        var child_ctx = ctx.slice();
	        child_ctx[2] = info.resolved;
	        info.block.p(child_ctx, dirty);
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(button);
	      if (detaching) detach_dev(t1);
	      if (detaching) detach_dev(await_block_anchor);
	      info.block.d(detaching);
	      info.token = null;
	      info = null;
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$5.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function getRandomNumber() {
	  return _getRandomNumber.apply(this, arguments);
	}

	function _getRandomNumber() {
	  _getRandomNumber = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	    var res, text;
	    return regenerator.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return fetch("tutorial/random-number");

	          case 2:
	            res = _context.sent;
	            _context.next = 5;
	            return res.text();

	          case 5:
	            text = _context.sent;

	            if (!res.ok) {
	              _context.next = 10;
	              break;
	            }

	            return _context.abrupt("return", text);

	          case 10:
	            throw new Error(text);

	          case 11:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _getRandomNumber.apply(this, arguments);
	}

	function instance$5($$self, $$props, $$invalidate) {
	  var promise = getRandomNumber();

	  function handleClick() {
	    $$invalidate(0, promise = getRandomNumber());
	  }

	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Await_blocks> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Await_blocks", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      promise: promise,
	      getRandomNumber: getRandomNumber,
	      handleClick: handleClick
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("promise" in $$props) $$invalidate(0, promise = $$props.promise);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [promise, handleClick];
	}

	var Await_blocks = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Await_blocks, _SvelteComponentDev);

	  var _super = _createSuper$6(Await_blocks);

	  function Await_blocks(options) {
	    var _this;

	    classCallCheck(this, Await_blocks);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Await_blocks",
	      options: options,
	      id: create_fragment$5.name
	    });
	    return _this;
	  }

	  return Await_blocks;
	}(SvelteComponentDev);

	function _createSuper$7(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$8()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$5 = "test/src/event-forwarding/Inner.svelte";

	function create_fragment$6(ctx) {
	  var button;
	  var dispose;
	  var block = {
	    c: function create() {
	      button = element("button");
	      button.textContent = "Click to say hello";
	      add_location(button, file$5, 12, 0, 188);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, button, anchor);
	      if (remount) dispose();
	      dispose = listen_dev(button, "click",
	      /*sayHello*/
	      ctx[0], false, false, false);
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(button);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$6.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$6($$self, $$props, $$invalidate) {
	  var dispatch = createEventDispatcher();

	  function sayHello() {
	    dispatch("message", {
	      text: "Hello!"
	    });
	  }

	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Inner> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Inner", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      createEventDispatcher: createEventDispatcher,
	      dispatch: dispatch,
	      sayHello: sayHello
	    };
	  };

	  return [sayHello];
	}

	var Inner = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Inner, _SvelteComponentDev);

	  var _super = _createSuper$7(Inner);

	  function Inner(options) {
	    var _this;

	    classCallCheck(this, Inner);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Inner",
	      options: options,
	      id: create_fragment$6.name
	    });
	    return _this;
	  }

	  return Inner;
	}(SvelteComponentDev);

	function _createSuper$8(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$9()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function create_fragment$7(ctx) {
	  var current;
	  var inner = new Inner({
	    $$inline: true
	  });
	  inner.$on("message",
	  /*message_handler*/
	  ctx[0]);
	  var block = {
	    c: function create() {
	      create_component(inner.$$.fragment);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      mount_component(inner, target, anchor);
	      current = true;
	    },
	    p: noop,
	    i: function intro(local) {
	      if (current) return;
	      transition_in(inner.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(inner.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(inner, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$7.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$7($$self, $$props, $$invalidate) {
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Outer> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Outer", $$slots, []);

	  function message_handler(event) {
	    bubble($$self, event);
	  }

	  $$self.$capture_state = function () {
	    return {
	      Inner: Inner
	    };
	  };

	  return [message_handler];
	}

	var Outer = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Outer, _SvelteComponentDev);

	  var _super = _createSuper$8(Outer);

	  function Outer(options) {
	    var _this;

	    classCallCheck(this, Outer);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Outer",
	      options: options,
	      id: create_fragment$7.name
	    });
	    return _this;
	  }

	  return Outer;
	}(SvelteComponentDev);

	function _createSuper$9(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$a()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function create_fragment$8(ctx) {
	  var current;
	  var outer = new Outer({
	    $$inline: true
	  });
	  outer.$on("message", handleMessage);
	  var block = {
	    c: function create() {
	      create_component(outer.$$.fragment);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      mount_component(outer, target, anchor);
	      current = true;
	    },
	    p: noop,
	    i: function intro(local) {
	      if (current) return;
	      transition_in(outer.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(outer.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(outer, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$8.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function handleMessage(event) {
	  alert(event.detail.text);
	}

	function instance$8($$self, $$props, $$invalidate) {
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Event_forwarding> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Event_forwarding", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      Outer: Outer,
	      handleMessage: handleMessage
	    };
	  };

	  return [];
	}

	var Event_forwarding = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Event_forwarding, _SvelteComponentDev);

	  var _super = _createSuper$9(Event_forwarding);

	  function Event_forwarding(options) {
	    var _this;

	    classCallCheck(this, Event_forwarding);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Event_forwarding",
	      options: options,
	      id: create_fragment$8.name
	    });
	    return _this;
	  }

	  return Event_forwarding;
	}(SvelteComponentDev);

	function _createSuper$a(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$b()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$6 = "test/src/binding-canvas/index.svelte";

	function create_fragment$9(ctx) {
	  var canvas_1;
	  var canvas_1_width_value;
	  var canvas_1_height_value;
	  var block = {
	    c: function create() {
	      canvas_1 = element("canvas");
	      attr_dev(canvas_1, "width", canvas_1_width_value = 100);
	      attr_dev(canvas_1, "height", canvas_1_height_value = 100);
	      attr_dev(canvas_1, "class", "svelte-1cf4o9x");
	      add_location(canvas_1, file$6, 53, 0, 1133);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, canvas_1, anchor);
	      /*canvas_1_binding*/

	      ctx[1](canvas_1);
	    },
	    p: noop,
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(canvas_1);
	      /*canvas_1_binding*/

	      ctx[1](null);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$9.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$9($$self, $$props, $$invalidate) {
	  var canvas;
	  onMount(function () {
	    var ctx = canvas.getContext("2d");
	    var frame;

	    (function loop() {
	      frame = requestAnimationFrame(loop);
	      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	      for (var p = 0; p < imageData.data.length; p += 4) {
	        var i = p / 4;
	        var x = i % canvas.width;
	        var y = i / canvas.height >>> 0;
	        var t = void 0;

	        if (window.performance.now) {
	          t = window.performance.now();
	        } else {
	          t = 1000;
	        }

	        var r = 64 + 128 * x / canvas.width + 64 * Math.sin(t / 1000);
	        var g = 64 + 128 * y / canvas.height + 64 * Math.cos(t / 1000);
	        var b = 128;
	        imageData.data[p + 0] = r;
	        imageData.data[p + 1] = g;
	        imageData.data[p + 2] = b;
	        imageData.data[p + 3] = 255;
	      }

	      ctx.putImageData(imageData, 0, 0);
	    })();

	    return function () {
	      cancelAnimationFrame(frame);
	    };
	  });
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Binding_canvas> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Binding_canvas", $$slots, []);

	  function canvas_1_binding($$value) {
	    binding_callbacks[$$value ? "unshift" : "push"](function () {
	      $$invalidate(0, canvas = $$value);
	    });
	  }

	  $$self.$capture_state = function () {
	    return {
	      onMount: onMount,
	      canvas: canvas
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("canvas" in $$props) $$invalidate(0, canvas = $$props.canvas);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [canvas, canvas_1_binding];
	}

	var Binding_canvas = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Binding_canvas, _SvelteComponentDev);

	  var _super = _createSuper$a(Binding_canvas);

	  function Binding_canvas(options) {
	    var _this;

	    classCallCheck(this, Binding_canvas);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Binding_canvas",
	      options: options,
	      id: create_fragment$9.name
	    });
	    return _this;
	  }

	  return Binding_canvas;
	}(SvelteComponentDev);

	function _createSuper$b(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$c()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$7 = "test/src/tick/index.svelte";

	function create_fragment$a(ctx) {
	  var textarea;
	  var dispose;
	  var block = {
	    c: function create() {
	      textarea = element("textarea");
	      textarea.value =
	      /*text*/
	      ctx[0];
	      attr_dev(textarea, "class", "svelte-g4t076");
	      add_location(textarea, file$7, 36, 0, 712);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, textarea, anchor);
	      if (remount) dispose();
	      dispose = listen_dev(textarea, "keydown",
	      /*handleKeydown*/
	      ctx[1], false, false, false);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*text*/
	      1) {
	        prop_dev(textarea, "value",
	        /*text*/
	        ctx[0]);
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(textarea);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$a.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$a($$self, $$props, $$invalidate) {
	  var text = "Select some text and hit the tab key to toggle uppercase";

	  function handleKeydown(_x) {
	    return _handleKeydown.apply(this, arguments);
	  }

	  function _handleKeydown() {
	    _handleKeydown = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(event) {
	      var selectionStart, selectionEnd, value, selection, replacement;
	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (!(event.which !== 9)) {
	                _context.next = 2;
	                break;
	              }

	              return _context.abrupt("return");

	            case 2:
	              event.preventDefault();
	              selectionStart = this.selectionStart, selectionEnd = this.selectionEnd, value = this.value;
	              selection = value.slice(selectionStart, selectionEnd);
	              replacement = /[a-z]/.test(selection) ? selection.toUpperCase() : selection.toLowerCase();
	              $$invalidate(0, text = value.slice(0, selectionStart) + replacement + value.slice(selectionEnd));
	              _context.next = 9;
	              return tick();

	            case 9:
	              this.selectionStart = selectionStart;
	              this.selectionEnd = selectionEnd;

	            case 11:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee, this);
	    }));
	    return _handleKeydown.apply(this, arguments);
	  }

	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Tick> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Tick", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      tick: tick,
	      text: text,
	      handleKeydown: handleKeydown
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("text" in $$props) $$invalidate(0, text = $$props.text);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [text, handleKeydown];
	}

	var Tick = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Tick, _SvelteComponentDev);

	  var _super = _createSuper$b(Tick);

	  function Tick(options) {
	    var _this;

	    classCallCheck(this, Tick);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Tick",
	      options: options,
	      id: create_fragment$a.name
	    });
	    return _this;
	  }

	  return Tick;
	}(SvelteComponentDev);

	var subscriber_queue = [];
	/**
	 * Create a `Writable` store that allows both updating and reading by subscription.
	 * @param {*=}value initial value
	 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
	 */


	function writable(value) {
	  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	  var stop;
	  var subscribers = [];

	  function set(new_value) {
	    if (safe_not_equal(value, new_value)) {
	      value = new_value;

	      if (stop) {
	        // store is ready
	        var run_queue = !subscriber_queue.length;

	        for (var i = 0; i < subscribers.length; i += 1) {
	          var s = subscribers[i];
	          s[1]();
	          subscriber_queue.push(s, value);
	        }

	        if (run_queue) {
	          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
	            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
	          }

	          subscriber_queue.length = 0;
	        }
	      }
	    }
	  }

	  function update(fn) {
	    set(fn(value));
	  }

	  function subscribe(run) {
	    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
	    var subscriber = [run, invalidate];
	    subscribers.push(subscriber);

	    if (subscribers.length === 1) {
	      stop = start(set) || noop;
	    }

	    run(value);
	    return function () {
	      var index = subscribers.indexOf(subscriber);

	      if (index !== -1) {
	        subscribers.splice(index, 1);
	      }

	      if (subscribers.length === 0) {
	        stop();
	        stop = null;
	      }
	    };
	  }

	  return {
	    set: set,
	    update: update,
	    subscribe: subscribe
	  };
	}

	function createCount() {
	  var _writable = writable(0),
	      subscribe = _writable.subscribe,
	      set = _writable.set,
	      update = _writable.update;

	  return {
	    subscribe: subscribe,
	    increment: function increment() {
	      return update(function (n) {
	        return n + 1;
	      });
	    },
	    decrement: function decrement() {
	      return update(function (n) {
	        return n - 1;
	      });
	    },
	    reset: function reset() {
	      return set(0);
	    }
	  };
	}

	var count = createCount();

	function _createSuper$c(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$d()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$8 = "test/src/custom-stores/index.svelte";

	function create_fragment$b(ctx) {
	  var h1;
	  var t0;
	  var t1;
	  var t2;
	  var button0;
	  var t4;
	  var button1;
	  var t6;
	  var button2;
	  var dispose;
	  var block = {
	    c: function create() {
	      h1 = element("h1");
	      t0 = text("The count is ");
	      t1 = text(
	      /*$count*/
	      ctx[0]);
	      t2 = space();
	      button0 = element("button");
	      button0.textContent = "+";
	      t4 = space();
	      button1 = element("button");
	      button1.textContent = "-";
	      t6 = space();
	      button2 = element("button");
	      button2.textContent = "reset";
	      add_location(h1, file$8, 4, 0, 58);
	      add_location(button0, file$8, 6, 0, 90);
	      add_location(button1, file$8, 7, 0, 136);
	      add_location(button2, file$8, 8, 0, 182);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, h1, anchor);
	      append_dev(h1, t0);
	      append_dev(h1, t1);
	      insert_dev(target, t2, anchor);
	      insert_dev(target, button0, anchor);
	      insert_dev(target, t4, anchor);
	      insert_dev(target, button1, anchor);
	      insert_dev(target, t6, anchor);
	      insert_dev(target, button2, anchor);
	      if (remount) run_all(dispose);
	      dispose = [listen_dev(button0, "click", count.increment, false, false, false), listen_dev(button1, "click", count.decrement, false, false, false), listen_dev(button2, "click", count.reset, false, false, false)];
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*$count*/
	      1) set_data_dev(t1,
	      /*$count*/
	      ctx[0]);
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(h1);
	      if (detaching) detach_dev(t2);
	      if (detaching) detach_dev(button0);
	      if (detaching) detach_dev(t4);
	      if (detaching) detach_dev(button1);
	      if (detaching) detach_dev(t6);
	      if (detaching) detach_dev(button2);
	      run_all(dispose);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$b.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$b($$self, $$props, $$invalidate) {
	  var $count;
	  validate_store(count, "count");
	  component_subscribe($$self, count, function ($$value) {
	    return $$invalidate(0, $count = $$value);
	  });
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Custom_stores> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Custom_stores", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      count: count,
	      $count: $count
	    };
	  };

	  return [$count];
	}

	var Custom_stores = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Custom_stores, _SvelteComponentDev);

	  var _super = _createSuper$c(Custom_stores);

	  function Custom_stores(options) {
	    var _this;

	    classCallCheck(this, Custom_stores);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Custom_stores",
	      options: options,
	      id: create_fragment$b.name
	    });
	    return _this;
	  }

	  return Custom_stores;
	}(SvelteComponentDev);

	function cubicOut(t) {
	  var f = t - 1.0;
	  return f * f * f + 1.0;
	}

	function quintOut(t) {
	  return --t * t * t * t * t + 1;
	}

	function is_date(obj) {
	  return Object.prototype.toString.call(obj) === '[object Date]';
	}

	function tick_spring(ctx, last_value, current_value, target_value) {
	  if (typeof current_value === 'number' || is_date(current_value)) {
	    // @ts-ignore
	    var delta = target_value - current_value; // @ts-ignore

	    var velocity = (current_value - last_value) / (ctx.dt || 1 / 60); // guard div by 0

	    var _spring = ctx.opts.stiffness * delta;

	    var damper = ctx.opts.damping * velocity;
	    var acceleration = (_spring - damper) * ctx.inv_mass;
	    var d = (velocity + acceleration) * ctx.dt;

	    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
	      return target_value; // settled
	    } else {
	      ctx.settled = false; // signal loop to keep ticking
	      // @ts-ignore

	      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
	    }
	  } else if (Array.isArray(current_value)) {
	    // @ts-ignore
	    return current_value.map(function (_, i) {
	      return tick_spring(ctx, last_value[i], current_value[i], target_value[i]);
	    });
	  } else if (_typeof_1(current_value) === 'object') {
	    var next_value = {};

	    for (var k in current_value) {
	      // @ts-ignore
	      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
	    } // @ts-ignore


	    return next_value;
	  } else {
	    throw new Error("Cannot spring ".concat(_typeof_1(current_value), " values"));
	  }
	}

	function spring(value) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var store = writable(value);
	  var _opts$stiffness = opts.stiffness,
	      stiffness = _opts$stiffness === void 0 ? 0.15 : _opts$stiffness,
	      _opts$damping = opts.damping,
	      damping = _opts$damping === void 0 ? 0.8 : _opts$damping,
	      _opts$precision = opts.precision,
	      precision = _opts$precision === void 0 ? 0.01 : _opts$precision;
	  var last_time;
	  var task;
	  var current_token;
	  var last_value = value;
	  var target_value = value;
	  var inv_mass = 1;
	  var inv_mass_recovery_rate = 0;
	  var cancel_task = false;

	  function set(new_value) {
	    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    target_value = new_value;
	    var token = current_token = {};

	    if (value == null || opts.hard || spring.stiffness >= 1 && spring.damping >= 1) {
	      cancel_task = true; // cancel any running animation

	      last_time = now();
	      last_value = new_value;
	      store.set(value = target_value);
	      return Promise.resolve();
	    } else if (opts.soft) {
	      var rate = opts.soft === true ? .5 : +opts.soft;
	      inv_mass_recovery_rate = 1 / (rate * 60);
	      inv_mass = 0; // infinite mass, unaffected by spring forces
	    }

	    if (!task) {
	      last_time = now();
	      cancel_task = false;
	      task = loop(function (now) {
	        if (cancel_task) {
	          cancel_task = false;
	          task = null;
	          return false;
	        }

	        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
	        var ctx = {
	          inv_mass: inv_mass,
	          opts: spring,
	          settled: true,
	          dt: (now - last_time) * 60 / 1000
	        };
	        var next_value = tick_spring(ctx, last_value, value, target_value);
	        last_time = now;
	        last_value = value;
	        store.set(value = next_value);
	        if (ctx.settled) task = null;
	        return !ctx.settled;
	      });
	    }

	    return new Promise(function (fulfil) {
	      task.promise.then(function () {
	        if (token === current_token) fulfil();
	      });
	    });
	  }

	  var spring = {
	    set: set,
	    update: function update(fn, opts) {
	      return set(fn(target_value, value), opts);
	    },
	    subscribe: store.subscribe,
	    stiffness: stiffness,
	    damping: damping,
	    precision: precision
	  };
	  return spring;
	}

	function _createSuper$d(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$e()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$9 = "test/src/spring/index.svelte";

	function create_fragment$c(ctx) {
	  var div1;
	  var div0;
	  var label0;
	  var h30;
	  var t0;
	  var t1_value =
	  /*coords*/
	  ctx[0].stiffness + "";
	  var t1;
	  var t2;
	  var t3;
	  var input0;
	  var t4;
	  var label1;
	  var h31;
	  var t5;
	  var t6_value =
	  /*coords*/
	  ctx[0].damping + "";
	  var t6;
	  var t7;
	  var t8;
	  var input1;
	  var t9;
	  var svg;
	  var circle;
	  var circle_cx_value;
	  var circle_cy_value;
	  var dispose;
	  var block = {
	    c: function create() {
	      div1 = element("div");
	      div0 = element("div");
	      label0 = element("label");
	      h30 = element("h3");
	      t0 = text("stiffness (");
	      t1 = text(t1_value);
	      t2 = text(")");
	      t3 = space();
	      input0 = element("input");
	      t4 = space();
	      label1 = element("label");
	      h31 = element("h3");
	      t5 = text("damping (");
	      t6 = text(t6_value);
	      t7 = text(")");
	      t8 = space();
	      input1 = element("input");
	      t9 = space();
	      svg = svg_element("svg");
	      circle = svg_element("circle");
	      add_location(h30, file$9, 25, 12, 482);
	      attr_dev(input0, "type", "range");
	      attr_dev(input0, "min", "0");
	      attr_dev(input0, "max", "1");
	      attr_dev(input0, "step", "0.01");
	      add_location(input0, file$9, 26, 12, 534);
	      add_location(label0, file$9, 24, 8, 462);
	      add_location(h31, file$9, 30, 12, 659);
	      attr_dev(input1, "type", "range");
	      attr_dev(input1, "min", "0");
	      attr_dev(input1, "max", "1");
	      attr_dev(input1, "step", "0.01");
	      add_location(input1, file$9, 31, 12, 707);
	      add_location(label1, file$9, 29, 8, 639);
	      set_style(div0, "position", "absolute");
	      set_style(div0, "right", "1em");
	      add_location(div0, file$9, 23, 4, 408);
	      attr_dev(circle, "cx", circle_cx_value =
	      /*$coords*/
	      ctx[1].x);
	      attr_dev(circle, "cy", circle_cy_value =
	      /*$coords*/
	      ctx[1].y);
	      attr_dev(circle, "r",
	      /*$size*/
	      ctx[2]);
	      attr_dev(circle, "class", "svelte-9huv1i");
	      add_location(circle, file$9, 40, 8, 995);
	      attr_dev(svg, "class", "svelte-9huv1i");
	      add_location(svg, file$9, 35, 4, 817);
	      attr_dev(div1, "class", "spring-con svelte-9huv1i");
	      add_location(div1, file$9, 22, 0, 379);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, div1, anchor);
	      append_dev(div1, div0);
	      append_dev(div0, label0);
	      append_dev(label0, h30);
	      append_dev(h30, t0);
	      append_dev(h30, t1);
	      append_dev(h30, t2);
	      append_dev(label0, t3);
	      append_dev(label0, input0);
	      set_input_value(input0,
	      /*coords*/
	      ctx[0].stiffness);
	      append_dev(div0, t4);
	      append_dev(div0, label1);
	      append_dev(label1, h31);
	      append_dev(h31, t5);
	      append_dev(h31, t6);
	      append_dev(h31, t7);
	      append_dev(label1, t8);
	      append_dev(label1, input1);
	      set_input_value(input1,
	      /*coords*/
	      ctx[0].damping);
	      append_dev(div1, t9);
	      append_dev(div1, svg);
	      append_dev(svg, circle);
	      if (remount) run_all(dispose);
	      dispose = [listen_dev(input0, "change",
	      /*input0_change_input_handler*/
	      ctx[4]), listen_dev(input0, "input",
	      /*input0_change_input_handler*/
	      ctx[4]), listen_dev(input1, "change",
	      /*input1_change_input_handler*/
	      ctx[5]), listen_dev(input1, "input",
	      /*input1_change_input_handler*/
	      ctx[5]), listen_dev(svg, "mousemove",
	      /*mousemove_handler*/
	      ctx[6], false, false, false), listen_dev(svg, "mousedown",
	      /*mousedown_handler*/
	      ctx[7], false, false, false), listen_dev(svg, "mouseup",
	      /*mouseup_handler*/
	      ctx[8], false, false, false)];
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*coords*/
	      1 && t1_value !== (t1_value =
	      /*coords*/
	      ctx[0].stiffness + "")) set_data_dev(t1, t1_value);

	      if (dirty &
	      /*coords*/
	      1) {
	        set_input_value(input0,
	        /*coords*/
	        ctx[0].stiffness);
	      }

	      if (dirty &
	      /*coords*/
	      1 && t6_value !== (t6_value =
	      /*coords*/
	      ctx[0].damping + "")) set_data_dev(t6, t6_value);

	      if (dirty &
	      /*coords*/
	      1) {
	        set_input_value(input1,
	        /*coords*/
	        ctx[0].damping);
	      }

	      if (dirty &
	      /*$coords*/
	      2 && circle_cx_value !== (circle_cx_value =
	      /*$coords*/
	      ctx[1].x)) {
	        attr_dev(circle, "cx", circle_cx_value);
	      }

	      if (dirty &
	      /*$coords*/
	      2 && circle_cy_value !== (circle_cy_value =
	      /*$coords*/
	      ctx[1].y)) {
	        attr_dev(circle, "cy", circle_cy_value);
	      }

	      if (dirty &
	      /*$size*/
	      4) {
	        attr_dev(circle, "r",
	        /*$size*/
	        ctx[2]);
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div1);
	      run_all(dispose);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$c.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$c($$self, $$props, $$invalidate) {
	  var $coords;
	  var $size;
	  var coords = spring({
	    x: 50,
	    y: 50
	  }, {
	    stiffness: 0.1,
	    damping: 0.25
	  });
	  validate_store(coords, "coords");
	  component_subscribe($$self, coords, function (value) {
	    return $$invalidate(1, $coords = value);
	  });
	  var size = spring(10);
	  validate_store(size, "size");
	  component_subscribe($$self, size, function (value) {
	    return $$invalidate(2, $size = value);
	  });
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Spring> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Spring", $$slots, []);

	  function input0_change_input_handler() {
	    coords.stiffness = to_number(this.value);
	    $$invalidate(0, coords);
	  }

	  function input1_change_input_handler() {
	    coords.damping = to_number(this.value);
	    $$invalidate(0, coords);
	  }

	  var mousemove_handler = function mousemove_handler(e) {
	    return coords.set({
	      x: e.clientX,
	      y: e.clientY
	    });
	  };

	  var mousedown_handler = function mousedown_handler() {
	    return size.set(30);
	  };

	  var mouseup_handler = function mouseup_handler() {
	    return size.set(10);
	  };

	  $$self.$capture_state = function () {
	    return {
	      spring: spring,
	      coords: coords,
	      size: size,
	      $coords: $coords,
	      $size: $size
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("coords" in $$props) $$invalidate(0, coords = $$props.coords);
	    if ("size" in $$props) $$invalidate(3, size = $$props.size);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [coords, $coords, $size, size, input0_change_input_handler, input1_change_input_handler, mousemove_handler, mousedown_handler, mouseup_handler];
	}

	var Spring = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Spring, _SvelteComponentDev);

	  var _super = _createSuper$d(Spring);

	  function Spring(options) {
	    var _this;

	    classCallCheck(this, Spring);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Spring",
	      options: options,
	      id: create_fragment$c.name
	    });
	    return _this;
	  }

	  return Spring;
	}(SvelteComponentDev);

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	function __rest(s, e) {
	  var t = {};

	  for (var p in s) {
	    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	  }

	  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	  }
	  return t;
	}

	function scale(node, _ref5) {
	  var _ref5$delay = _ref5.delay,
	      delay = _ref5$delay === void 0 ? 0 : _ref5$delay,
	      _ref5$duration = _ref5.duration,
	      duration = _ref5$duration === void 0 ? 400 : _ref5$duration,
	      _ref5$easing = _ref5.easing,
	      easing = _ref5$easing === void 0 ? cubicOut : _ref5$easing,
	      _ref5$start = _ref5.start,
	      start = _ref5$start === void 0 ? 0 : _ref5$start,
	      _ref5$opacity = _ref5.opacity,
	      opacity = _ref5$opacity === void 0 ? 0 : _ref5$opacity;
	  var style = getComputedStyle(node);
	  var target_opacity = +style.opacity;
	  var transform = style.transform === 'none' ? '' : style.transform;
	  var sd = 1 - start;
	  var od = target_opacity * (1 - opacity);
	  return {
	    delay: delay,
	    duration: duration,
	    easing: easing,
	    css: function css(_t, u) {
	      return "\n\t\t\ttransform: ".concat(transform, " scale(").concat(1 - sd * u, ");\n\t\t\topacity: ").concat(target_opacity - od * u, "\n\t\t");
	    }
	  };
	}

	function crossfade(_a) {
	  var fallback = _a.fallback,
	      defaults = __rest(_a, ["fallback"]);

	  var to_receive = new Map();
	  var to_send = new Map();

	  function crossfade(from, node, params) {
	    var _assign = assign(assign({}, defaults), params),
	        _assign$delay = _assign.delay,
	        delay = _assign$delay === void 0 ? 0 : _assign$delay,
	        _assign$duration = _assign.duration,
	        duration = _assign$duration === void 0 ? function (d) {
	      return Math.sqrt(d) * 30;
	    } : _assign$duration,
	        _assign$easing = _assign.easing,
	        easing = _assign$easing === void 0 ? cubicOut : _assign$easing;

	    var to = node.getBoundingClientRect();
	    var dx = from.left - to.left;
	    var dy = from.top - to.top;
	    var dw = from.width / to.width;
	    var dh = from.height / to.height;
	    var d = Math.sqrt(dx * dx + dy * dy);
	    var style = getComputedStyle(node);
	    var transform = style.transform === 'none' ? '' : style.transform;
	    var opacity = +style.opacity;
	    return {
	      delay: delay,
	      duration: is_function(duration) ? duration(d) : duration,
	      easing: easing,
	      css: function css(t, u) {
	        return "\n\t\t\t\topacity: ".concat(t * opacity, ";\n\t\t\t\ttransform-origin: top left;\n\t\t\t\ttransform: ").concat(transform, " translate(").concat(u * dx, "px,").concat(u * dy, "px) scale(").concat(t + (1 - t) * dw, ", ").concat(t + (1 - t) * dh, ");\n\t\t\t");
	      }
	    };
	  }

	  function transition(items, counterparts, intro) {
	    return function (node, params) {
	      items.set(params.key, {
	        rect: node.getBoundingClientRect()
	      });
	      return function () {
	        if (counterparts.has(params.key)) {
	          var _counterparts$get = counterparts.get(params.key),
	              rect = _counterparts$get.rect;

	          counterparts.delete(params.key);
	          return crossfade(rect, node, params);
	        } // if the node is disappearing altogether
	        // (i.e. wasn't claimed by the other list)
	        // then we need to supply an outro


	        items.delete(params.key);
	        return fallback && fallback(node, params, intro);
	      };
	    };
	  }

	  return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
	}

	var BY = {
	  name: 'CC BY 2.0',
	  url: 'https://creativecommons.org/licenses/by/2.0/'
	};
	var BY_SA = {
	  name: 'CC BY-SA 2.0',
	  url: 'https://creativecommons.org/licenses/by-sa/2.0/'
	};
	var BY_ND = {
	  name: 'CC BY-ND 2.0',
	  url: 'https://creativecommons.org/licenses/by-nd/2.0/'
	}; // via http://labs.tineye.com/multicolr

	var images = [{
	  color: '#001f3f',
	  id: '1',
	  alt: 'Crepuscular rays',
	  path: '43428526@N03/7863279376',
	  license: BY
	}, {
	  color: '#0074D9',
	  id: '2',
	  alt: 'Lapland winter scene',
	  path: '25507134@N00/6527537485',
	  license: BY
	}, {
	  color: '#7FDBFF',
	  id: '3',
	  alt: 'Jellyfish',
	  path: '37707866@N00/3354331318',
	  license: BY
	}, {
	  color: '#39CCCC',
	  id: '4',
	  alt: 'A man scuba diving',
	  path: '32751486@N00/4608886209',
	  license: BY_SA
	}, {
	  color: '#3D9970',
	  id: '5',
	  alt: 'Underwater scene',
	  path: '25483059@N08/5548569010',
	  license: BY
	}, {
	  color: '#2ECC40',
	  id: '6',
	  alt: 'Ferns',
	  path: '8404611@N06/2447470760',
	  license: BY
	}, {
	  color: '#01FF70',
	  id: '7',
	  alt: 'Posters in a bar',
	  path: '33917831@N00/114428206',
	  license: BY_SA
	}, {
	  color: '#FFDC00',
	  id: '8',
	  alt: 'Daffodil',
	  path: '46417125@N04/4818617089',
	  license: BY_ND
	}, {
	  color: '#FF851B',
	  id: '9',
	  alt: 'Dust storm in Sydney',
	  path: '56068058@N00/3945496657',
	  license: BY
	}, {
	  color: '#FF4136',
	  id: '10',
	  alt: 'Postbox',
	  path: '31883499@N05/4216820032',
	  license: BY
	}, {
	  color: '#85144b',
	  id: '11',
	  alt: 'Fireworks',
	  path: '8484971@N07/2625506561',
	  license: BY_ND
	}, {
	  color: '#B10DC9',
	  id: '12',
	  alt: 'The Stereophonics',
	  path: '58028312@N00/5385464371',
	  license: BY_ND
	}];

	function _createSuper$e(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$f()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$a = "test/src/deferred-transitions/index.svelte";

	function get_each_context(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[9] = list[i];
	  return child_ctx;
	} // (37:5) {#if selected !== image}


	function create_if_block_1(ctx) {
	  var button;
	  var t_value = (
	  /*loading*/
	  ctx[1] ===
	  /*image*/
	  ctx[9] ? "..." :
	  /*image*/
	  ctx[9].id) + "";
	  var t;
	  var button_intro;
	  var button_outro;
	  var current;
	  var dispose;

	  function click_handler() {
	    var _ctx;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return (
	      /*click_handler*/
	      (_ctx = ctx)[6].apply(_ctx, [
	      /*image*/
	      ctx[9]].concat(args))
	    );
	  }

	  var block = {
	    c: function create() {
	      button = element("button");
	      t = text(t_value);
	      set_style(button, "background-color",
	      /*image*/
	      ctx[9].color);
	      attr_dev(button, "class", "svelte-5aoete");
	      add_location(button, file$a, 37, 6, 729);
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, button, anchor);
	      append_dev(button, t);
	      current = true;
	      if (remount) dispose();
	      dispose = listen_dev(button, "click", click_handler, false, false, false);
	    },
	    p: function update(new_ctx, dirty) {
	      ctx = new_ctx;
	      if ((!current || dirty &
	      /*loading*/
	      2) && t_value !== (t_value = (
	      /*loading*/
	      ctx[1] ===
	      /*image*/
	      ctx[9] ? "..." :
	      /*image*/
	      ctx[9].id) + "")) set_data_dev(t, t_value);
	    },
	    i: function intro(local) {
	      if (current) return;
	      add_render_callback(function () {
	        if (button_outro) button_outro.end(1);
	        if (!button_intro) button_intro = create_in_transition(button,
	        /*receive*/
	        ctx[3], {
	          key:
	          /*image*/
	          ctx[9].id
	        });
	        button_intro.start();
	      });
	      current = true;
	    },
	    o: function outro(local) {
	      if (button_intro) button_intro.invalidate();
	      button_outro = create_out_transition(button,
	      /*send*/
	      ctx[2], {
	        key:
	        /*image*/
	        ctx[9].id
	      });
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(button);
	      if (detaching && button_outro) button_outro.end();
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block_1.name,
	    type: "if",
	    source: "(37:5) {#if selected !== image}",
	    ctx: ctx
	  });
	  return block;
	} // (35:3) {#each images as image}


	function create_each_block(ctx) {
	  var div;
	  var t;
	  var current;
	  var if_block =
	  /*selected*/
	  ctx[0] !==
	  /*image*/
	  ctx[9] && create_if_block_1(ctx);
	  var block = {
	    c: function create() {
	      div = element("div");
	      if (if_block) if_block.c();
	      t = space();
	      attr_dev(div, "class", "square");
	      add_location(div, file$a, 35, 4, 672);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, div, anchor);
	      if (if_block) if_block.m(div, null);
	      append_dev(div, t);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      if (
	      /*selected*/
	      ctx[0] !==
	      /*image*/
	      ctx[9]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	          transition_in(if_block, 1);
	        } else {
	          if_block = create_if_block_1(ctx);
	          if_block.c();
	          transition_in(if_block, 1);
	          if_block.m(div, t);
	        }
	      } else if (if_block) {
	        group_outros();
	        transition_out(if_block, 1, 1, function () {
	          if_block = null;
	        });
	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div);
	      if (if_block) if_block.d();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_each_block.name,
	    type: "each",
	    source: "(35:3) {#each images as image}",
	    ctx: ctx
	  });
	  return block;
	} // (49:2) {#if selected}


	function create_if_block(ctx) {
	  var await_block_anchor;
	  var promise;
	  var current;
	  var info = {
	    ctx: ctx,
	    current: null,
	    token: null,
	    pending: create_pending_block$1,
	    then: create_then_block$1,
	    catch: create_catch_block$1,
	    value: 8,
	    blocks: [,,,]
	  };
	  handle_promise(promise =
	  /*selected*/
	  ctx[0], info);
	  var block = {
	    c: function create() {
	      await_block_anchor = empty();
	      info.block.c();
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, await_block_anchor, anchor);
	      info.block.m(target, info.anchor = anchor);

	      info.mount = function () {
	        return await_block_anchor.parentNode;
	      };

	      info.anchor = await_block_anchor;
	      current = true;
	    },
	    p: function update(new_ctx, dirty) {
	      ctx = new_ctx;
	      info.ctx = ctx;

	      if (dirty &
	      /*selected*/
	      1 && promise !== (promise =
	      /*selected*/
	      ctx[0]) && handle_promise(promise, info)) ; else {
	        var child_ctx = ctx.slice();
	        child_ctx[8] = info.resolved;
	        info.block.p(child_ctx, dirty);
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(info.block);
	      current = true;
	    },
	    o: function outro(local) {
	      for (var i = 0; i < 3; i += 1) {
	        var _block = info.blocks[i];
	        transition_out(_block);
	      }

	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(await_block_anchor);
	      info.block.d(detaching);
	      info.token = null;
	      info = null;
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block.name,
	    type: "if",
	    source: "(49:2) {#if selected}",
	    ctx: ctx
	  });
	  return block;
	} // (1:0) <script>  import { crossfade, scale }


	function create_catch_block$1(ctx) {
	  var block = {
	    c: noop,
	    m: noop,
	    p: noop,
	    i: noop,
	    o: noop,
	    d: noop
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_catch_block$1.name,
	    type: "catch",
	    source: "(1:0) <script>  import { crossfade, scale }",
	    ctx: ctx
	  });
	  return block;
	} // (50:27)      <div class="photo" in:receive={{key:d.id}}


	function create_then_block$1(ctx) {
	  var div;
	  var img;
	  var img_alt_value;
	  var img_src_value;
	  var t0;
	  var p;
	  var a0;
	  var t1;
	  var a0_href_value;
	  var t2;
	  var a1;
	  var t3_value =
	  /*d*/
	  ctx[8].license.name + "";
	  var t3;
	  var a1_href_value;
	  var div_intro;
	  var div_outro;
	  var current;
	  var dispose;
	  var block = {
	    c: function create() {
	      div = element("div");
	      img = element("img");
	      t0 = space();
	      p = element("p");
	      a0 = element("a");
	      t1 = text("via Flickr");
	      t2 = text(" –\n\t\t\t\t\t\t");
	      a1 = element("a");
	      t3 = text(t3_value);
	      attr_dev(img, "alt", img_alt_value =
	      /*d*/
	      ctx[8].alt);
	      if (img.src !== (img_src_value = "" + (
	      /*ASSETS*/
	      ctx[4] + "/" +
	      /*d*/
	      ctx[8].id + ".jpg"))) attr_dev(img, "src", img_src_value);
	      attr_dev(img, "class", "svelte-5aoete");
	      add_location(img, file$a, 51, 5, 1109);
	      attr_dev(a0, "target", "_blank");
	      attr_dev(a0, "href", a0_href_value = "https://www.flickr.com/photos/" +
	      /*d*/
	      ctx[8].path);
	      attr_dev(a0, "class", "svelte-5aoete");
	      add_location(a0, file$a, 58, 6, 1243);
	      attr_dev(a1, "target", "_blank");
	      attr_dev(a1, "href", a1_href_value =
	      /*d*/
	      ctx[8].license.url);
	      attr_dev(a1, "class", "svelte-5aoete");
	      add_location(a1, file$a, 59, 6, 1337);
	      attr_dev(p, "class", "credit svelte-5aoete");
	      add_location(p, file$a, 57, 5, 1218);
	      attr_dev(div, "class", "photo svelte-5aoete");
	      add_location(div, file$a, 50, 4, 1038);
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, div, anchor);
	      append_dev(div, img);
	      append_dev(div, t0);
	      append_dev(div, p);
	      append_dev(p, a0);
	      append_dev(a0, t1);
	      append_dev(p, t2);
	      append_dev(p, a1);
	      append_dev(a1, t3);
	      current = true;
	      if (remount) dispose();
	      dispose = listen_dev(img, "click",
	      /*click_handler_1*/
	      ctx[7], false, false, false);
	    },
	    p: function update(ctx, dirty) {
	      if (!current || dirty &
	      /*selected*/
	      1 && img_alt_value !== (img_alt_value =
	      /*d*/
	      ctx[8].alt)) {
	        attr_dev(img, "alt", img_alt_value);
	      }

	      if (!current || dirty &
	      /*selected*/
	      1 && img.src !== (img_src_value = "" + (
	      /*ASSETS*/
	      ctx[4] + "/" +
	      /*d*/
	      ctx[8].id + ".jpg"))) {
	        attr_dev(img, "src", img_src_value);
	      }

	      if (!current || dirty &
	      /*selected*/
	      1 && a0_href_value !== (a0_href_value = "https://www.flickr.com/photos/" +
	      /*d*/
	      ctx[8].path)) {
	        attr_dev(a0, "href", a0_href_value);
	      }

	      if ((!current || dirty &
	      /*selected*/
	      1) && t3_value !== (t3_value =
	      /*d*/
	      ctx[8].license.name + "")) set_data_dev(t3, t3_value);

	      if (!current || dirty &
	      /*selected*/
	      1 && a1_href_value !== (a1_href_value =
	      /*d*/
	      ctx[8].license.url)) {
	        attr_dev(a1, "href", a1_href_value);
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      add_render_callback(function () {
	        if (div_outro) div_outro.end(1);
	        if (!div_intro) div_intro = create_in_transition(div,
	        /*receive*/
	        ctx[3], {
	          key:
	          /*d*/
	          ctx[8].id
	        });
	        div_intro.start();
	      });
	      current = true;
	    },
	    o: function outro(local) {
	      if (div_intro) div_intro.invalidate();
	      div_outro = create_out_transition(div,
	      /*send*/
	      ctx[2], {
	        key:
	        /*d*/
	        ctx[8].id
	      });
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div);
	      if (detaching && div_outro) div_outro.end();
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_then_block$1.name,
	    type: "then",
	    source: "(50:27)      <div class=\\\"photo\\\" in:receive={{key:d.id}}",
	    ctx: ctx
	  });
	  return block;
	} // (1:0) <script>  import { crossfade, scale }


	function create_pending_block$1(ctx) {
	  var block = {
	    c: noop,
	    m: noop,
	    p: noop,
	    i: noop,
	    o: noop,
	    d: noop
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_pending_block$1.name,
	    type: "pending",
	    source: "(1:0) <script>  import { crossfade, scale }",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$d(ctx) {
	  var div2;
	  var div1;
	  var h1;
	  var t1;
	  var div0;
	  var t2;
	  var current;
	  var each_value = images;
	  validate_each_argument(each_value);
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  var if_block =
	  /*selected*/
	  ctx[0] && create_if_block(ctx);
	  var block = {
	    c: function create() {
	      div2 = element("div");
	      div1 = element("div");
	      h1 = element("h1");
	      h1.textContent = "Photo gallery";
	      t1 = space();
	      div0 = element("div");

	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      t2 = space();
	      if (if_block) if_block.c();
	      attr_dev(h1, "class", "svelte-5aoete");
	      add_location(h1, file$a, 31, 2, 596);
	      attr_dev(div0, "class", "grid svelte-5aoete");
	      add_location(div0, file$a, 33, 2, 622);
	      attr_dev(div1, "class", "phone svelte-5aoete");
	      add_location(div1, file$a, 30, 1, 574);
	      attr_dev(div2, "class", "container svelte-5aoete");
	      add_location(div2, file$a, 29, 0, 549);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, div2, anchor);
	      append_dev(div2, div1);
	      append_dev(div1, h1);
	      append_dev(div1, t1);
	      append_dev(div1, div0);

	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(div0, null);
	      }

	      append_dev(div1, t2);
	      if (if_block) if_block.m(div1, null);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*images, load, loading, selected*/
	      35) {
	        each_value = images;
	        validate_each_argument(each_value);

	        var _i3;

	        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
	          var child_ctx = get_each_context(ctx, each_value, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);

	            transition_in(each_blocks[_i3], 1);
	          } else {
	            each_blocks[_i3] = create_each_block(child_ctx);

	            each_blocks[_i3].c();

	            transition_in(each_blocks[_i3], 1);

	            each_blocks[_i3].m(div0, null);
	          }
	        }

	        group_outros();

	        for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
	          out(_i3);
	        }

	        check_outros();
	      }

	      if (
	      /*selected*/
	      ctx[0]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	          transition_in(if_block, 1);
	        } else {
	          if_block = create_if_block(ctx);
	          if_block.c();
	          transition_in(if_block, 1);
	          if_block.m(div1, null);
	        }
	      } else if (if_block) {
	        group_outros();
	        transition_out(if_block, 1, 1, function () {
	          if_block = null;
	        });
	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div2);
	      destroy_each(each_blocks, detaching);
	      if (if_block) if_block.d();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$d.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$d($$self, $$props, $$invalidate) {
	  var _crossfade = crossfade({
	    duration: 200,
	    fallback: scale
	  }),
	      _crossfade2 = slicedToArray(_crossfade, 2),
	      send = _crossfade2[0],
	      receive = _crossfade2[1];

	  var selected = null;
	  var loading = null;
	  var ASSETS = "https://sveltejs.github.io/assets/crossfade";

	  var load = function load(image) {
	    var timeout = setTimeout(function () {
	      return $$invalidate(1, loading = image);
	    }, 100);
	    var img = new Image();

	    img.onload = function () {
	      $$invalidate(0, selected = image);
	      clearTimeout(timeout);
	      $$invalidate(1, loading = null);
	    };

	    img.src = "".concat(ASSETS, "/").concat(image.id, ".jpg");
	  };

	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Deferred_transitions> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Deferred_transitions", $$slots, []);

	  var click_handler = function click_handler(image) {
	    return load(image);
	  };

	  var click_handler_1 = function click_handler_1() {
	    return $$invalidate(0, selected = null);
	  };

	  $$self.$capture_state = function () {
	    return {
	      crossfade: crossfade,
	      scale: scale,
	      images: images,
	      send: send,
	      receive: receive,
	      selected: selected,
	      loading: loading,
	      ASSETS: ASSETS,
	      load: load
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("selected" in $$props) $$invalidate(0, selected = $$props.selected);
	    if ("loading" in $$props) $$invalidate(1, loading = $$props.loading);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [selected, loading, send, receive, ASSETS, load, click_handler, click_handler_1];
	}

	var Deferred_transitions = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Deferred_transitions, _SvelteComponentDev);

	  var _super = _createSuper$e(Deferred_transitions);

	  function Deferred_transitions(options) {
	    var _this;

	    classCallCheck(this, Deferred_transitions);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Deferred_transitions",
	      options: options,
	      id: create_fragment$d.name
	    });
	    return _this;
	  }

	  return Deferred_transitions;
	}(SvelteComponentDev);

	function flip(node, animation, params) {
	  var style = getComputedStyle(node);
	  var transform = style.transform === 'none' ? '' : style.transform;
	  var scaleX = animation.from.width / node.clientWidth;
	  var scaleY = animation.from.height / node.clientHeight;
	  var dx = (animation.from.left - animation.to.left) / scaleX;
	  var dy = (animation.from.top - animation.to.top) / scaleY;
	  var d = Math.sqrt(dx * dx + dy * dy);
	  var _params$delay = params.delay,
	      delay = _params$delay === void 0 ? 0 : _params$delay,
	      _params$duration = params.duration,
	      duration = _params$duration === void 0 ? function (d) {
	    return Math.sqrt(d) * 120;
	  } : _params$duration,
	      _params$easing = params.easing,
	      easing = _params$easing === void 0 ? cubicOut : _params$easing;
	  return {
	    delay: delay,
	    duration: is_function(duration) ? duration(d) : duration,
	    easing: easing,
	    css: function css(_t, u) {
	      return "transform: ".concat(transform, " translate(").concat(u * dx, "px, ").concat(u * dy, "px);");
	    }
	  };
	}

	function _createSuper$f(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$g()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$b = "test/src/animate-directive/index.svelte";

	function get_each_context$1(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[11] = list[i];
	  child_ctx[12] = list;
	  child_ctx[13] = i;
	  return child_ctx;
	}

	function get_each_context_1(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[11] = list[i];
	  child_ctx[14] = list;
	  child_ctx[15] = i;
	  return child_ctx;
	} // (122:2) {#each todos.filter(t => !t.done) as todo (todo.id)}


	function create_each_block_1(key_1, ctx) {
	  var label;
	  var input;
	  var t0;
	  var t1_value =
	  /*todo*/
	  ctx[11].description + "";
	  var t1;
	  var t2;
	  var button;
	  var t4;
	  var label_intro;
	  var label_outro;
	  var rect;
	  var stop_animation = noop;
	  var current;
	  var dispose;

	  function input_change_handler() {
	    /*input_change_handler*/
	    ctx[7].call(input,
	    /*todo*/
	    ctx[11]);
	  }

	  function click_handler() {
	    var _ctx;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return (
	      /*click_handler*/
	      (_ctx = ctx)[8].apply(_ctx, [
	      /*todo*/
	      ctx[11]].concat(args))
	    );
	  }

	  var block = {
	    key: key_1,
	    first: null,
	    c: function create() {
	      label = element("label");
	      input = element("input");
	      t0 = space();
	      t1 = text(t1_value);
	      t2 = space();
	      button = element("button");
	      button.textContent = "x";
	      t4 = space();
	      attr_dev(input, "type", "checkbox");
	      attr_dev(input, "class", "svelte-ylwlgm");
	      add_location(input, file$b, 127, 4, 2373);
	      attr_dev(button, "class", "svelte-ylwlgm");
	      add_location(button, file$b, 129, 4, 2447);
	      attr_dev(label, "class", "svelte-ylwlgm");
	      add_location(label, file$b, 122, 3, 2274);
	      this.first = label;
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, label, anchor);
	      append_dev(label, input);
	      input.checked =
	      /*todo*/
	      ctx[11].done;
	      append_dev(label, t0);
	      append_dev(label, t1);
	      append_dev(label, t2);
	      append_dev(label, button);
	      append_dev(label, t4);
	      current = true;
	      if (remount) run_all(dispose);
	      dispose = [listen_dev(input, "change", input_change_handler), listen_dev(button, "click", click_handler, false, false, false)];
	    },
	    p: function update(new_ctx, dirty) {
	      ctx = new_ctx;

	      if (dirty &
	      /*todos*/
	      1) {
	        input.checked =
	        /*todo*/
	        ctx[11].done;
	      }

	      if ((!current || dirty &
	      /*todos*/
	      1) && t1_value !== (t1_value =
	      /*todo*/
	      ctx[11].description + "")) set_data_dev(t1, t1_value);
	    },
	    r: function measure() {
	      rect = label.getBoundingClientRect();
	    },
	    f: function fix() {
	      fix_position(label);
	      stop_animation();
	      add_transform(label, rect);
	    },
	    a: function animate() {
	      stop_animation();
	      stop_animation = create_animation(label, rect, flip, {});
	    },
	    i: function intro(local) {
	      if (current) return;
	      add_render_callback(function () {
	        if (label_outro) label_outro.end(1);
	        if (!label_intro) label_intro = create_in_transition(label,
	        /*receive*/
	        ctx[2], {
	          key:
	          /*todo*/
	          ctx[11].id
	        });
	        label_intro.start();
	      });
	      current = true;
	    },
	    o: function outro(local) {
	      if (label_intro) label_intro.invalidate();
	      label_outro = create_out_transition(label,
	      /*send*/
	      ctx[1], {
	        key:
	        /*todo*/
	        ctx[11].id
	      });
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(label);
	      if (detaching && label_outro) label_outro.end();
	      run_all(dispose);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_each_block_1.name,
	    type: "each",
	    source: "(122:2) {#each todos.filter(t => !t.done) as todo (todo.id)}",
	    ctx: ctx
	  });
	  return block;
	} // (137:2) {#each todos.filter(t => t.done) as todo (todo.id)}


	function create_each_block$1(key_1, ctx) {
	  var label;
	  var input;
	  var t0;
	  var t1_value =
	  /*todo*/
	  ctx[11].description + "";
	  var t1;
	  var t2;
	  var button;
	  var t4;
	  var label_intro;
	  var label_outro;
	  var rect;
	  var stop_animation = noop;
	  var current;
	  var dispose;

	  function input_change_handler_1() {
	    /*input_change_handler_1*/
	    ctx[9].call(input,
	    /*todo*/
	    ctx[11]);
	  }

	  function click_handler_1() {
	    var _ctx2;

	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    return (
	      /*click_handler_1*/
	      (_ctx2 = ctx)[10].apply(_ctx2, [
	      /*todo*/
	      ctx[11]].concat(args))
	    );
	  }

	  var block = {
	    key: key_1,
	    first: null,
	    c: function create() {
	      label = element("label");
	      input = element("input");
	      t0 = space();
	      t1 = text(t1_value);
	      t2 = space();
	      button = element("button");
	      button.textContent = "x";
	      t4 = space();
	      attr_dev(input, "type", "checkbox");
	      attr_dev(input, "class", "svelte-ylwlgm");
	      add_location(input, file$b, 142, 4, 2722);
	      attr_dev(button, "class", "svelte-ylwlgm");
	      add_location(button, file$b, 144, 4, 2796);
	      attr_dev(label, "class", "svelte-ylwlgm");
	      add_location(label, file$b, 137, 3, 2623);
	      this.first = label;
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, label, anchor);
	      append_dev(label, input);
	      input.checked =
	      /*todo*/
	      ctx[11].done;
	      append_dev(label, t0);
	      append_dev(label, t1);
	      append_dev(label, t2);
	      append_dev(label, button);
	      append_dev(label, t4);
	      current = true;
	      if (remount) run_all(dispose);
	      dispose = [listen_dev(input, "change", input_change_handler_1), listen_dev(button, "click", click_handler_1, false, false, false)];
	    },
	    p: function update(new_ctx, dirty) {
	      ctx = new_ctx;

	      if (dirty &
	      /*todos*/
	      1) {
	        input.checked =
	        /*todo*/
	        ctx[11].done;
	      }

	      if ((!current || dirty &
	      /*todos*/
	      1) && t1_value !== (t1_value =
	      /*todo*/
	      ctx[11].description + "")) set_data_dev(t1, t1_value);
	    },
	    r: function measure() {
	      rect = label.getBoundingClientRect();
	    },
	    f: function fix() {
	      fix_position(label);
	      stop_animation();
	      add_transform(label, rect);
	    },
	    a: function animate() {
	      stop_animation();
	      stop_animation = create_animation(label, rect, flip, {});
	    },
	    i: function intro(local) {
	      if (current) return;
	      add_render_callback(function () {
	        if (label_outro) label_outro.end(1);
	        if (!label_intro) label_intro = create_in_transition(label,
	        /*receive*/
	        ctx[2], {
	          key:
	          /*todo*/
	          ctx[11].id
	        });
	        label_intro.start();
	      });
	      current = true;
	    },
	    o: function outro(local) {
	      if (label_intro) label_intro.invalidate();
	      label_outro = create_out_transition(label,
	      /*send*/
	      ctx[1], {
	        key:
	        /*todo*/
	        ctx[11].id
	      });
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(label);
	      if (detaching && label_outro) label_outro.end();
	      run_all(dispose);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_each_block$1.name,
	    type: "each",
	    source: "(137:2) {#each todos.filter(t => t.done) as todo (todo.id)}",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$e(ctx) {
	  var div2;
	  var input;
	  var t0;
	  var div0;
	  var h20;
	  var t2;
	  var each_blocks_1 = [];
	  var each0_lookup = new Map();
	  var t3;
	  var div1;
	  var h21;
	  var t5;
	  var each_blocks = [];
	  var each1_lookup = new Map();
	  var current;
	  var dispose;
	  var each_value_1 =
	  /*todos*/
	  ctx[0].filter(func);
	  validate_each_argument(each_value_1);

	  var get_key = function get_key(ctx) {
	    return (
	      /*todo*/
	      ctx[11].id
	    );
	  };

	  validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

	  for (var i = 0; i < each_value_1.length; i += 1) {
	    var child_ctx = get_each_context_1(ctx, each_value_1, i);
	    var key = get_key(child_ctx);
	    each0_lookup.set(key, each_blocks_1[i] = create_each_block_1(key, child_ctx));
	  }

	  var each_value =
	  /*todos*/
	  ctx[0].filter(func_1);
	  validate_each_argument(each_value);

	  var get_key_1 = function get_key_1(ctx) {
	    return (
	      /*todo*/
	      ctx[11].id
	    );
	  };

	  validate_each_keys(ctx, each_value, get_each_context$1, get_key_1);

	  for (var _i = 0; _i < each_value.length; _i += 1) {
	    var _child_ctx = get_each_context$1(ctx, each_value, _i);

	    var _key3 = get_key_1(_child_ctx);

	    each1_lookup.set(_key3, each_blocks[_i] = create_each_block$1(_key3, _child_ctx));
	  }

	  var block = {
	    c: function create() {
	      div2 = element("div");
	      input = element("input");
	      t0 = space();
	      div0 = element("div");
	      h20 = element("h2");
	      h20.textContent = "todo";
	      t2 = space();

	      for (var _i2 = 0; _i2 < each_blocks_1.length; _i2 += 1) {
	        each_blocks_1[_i2].c();
	      }

	      t3 = space();
	      div1 = element("div");
	      h21 = element("h2");
	      h21.textContent = "done";
	      t5 = space();

	      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
	        each_blocks[_i3].c();
	      }

	      attr_dev(input, "class", "new-todo svelte-ylwlgm");
	      attr_dev(input, "placeholder", "what needs to be done?");
	      add_location(input, file$b, 113, 1, 2045);
	      attr_dev(h20, "class", "svelte-ylwlgm");
	      add_location(h20, file$b, 120, 2, 2202);
	      attr_dev(div0, "class", "left svelte-ylwlgm");
	      add_location(div0, file$b, 119, 1, 2181);
	      attr_dev(h21, "class", "svelte-ylwlgm");
	      add_location(h21, file$b, 135, 2, 2552);
	      attr_dev(div1, "class", "right svelte-ylwlgm");
	      add_location(div1, file$b, 134, 1, 2530);
	      attr_dev(div2, "class", "board svelte-ylwlgm");
	      add_location(div2, file$b, 112, 0, 2024);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, div2, anchor);
	      append_dev(div2, input);
	      append_dev(div2, t0);
	      append_dev(div2, div0);
	      append_dev(div0, h20);
	      append_dev(div0, t2);

	      for (var _i4 = 0; _i4 < each_blocks_1.length; _i4 += 1) {
	        each_blocks_1[_i4].m(div0, null);
	      }

	      append_dev(div2, t3);
	      append_dev(div2, div1);
	      append_dev(div1, h21);
	      append_dev(div1, t5);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        each_blocks[_i5].m(div1, null);
	      }

	      current = true;
	      if (remount) dispose();
	      dispose = listen_dev(input, "keydown",
	      /*keydown_handler*/
	      ctx[6], false, false, false);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*remove, todos*/
	      17) {
	        var _each_value_ =
	        /*todos*/
	        ctx[0].filter(func);

	        validate_each_argument(_each_value_);
	        group_outros();

	        for (var _i6 = 0; _i6 < each_blocks_1.length; _i6 += 1) {
	          each_blocks_1[_i6].r();
	        }

	        validate_each_keys(ctx, _each_value_, get_each_context_1, get_key);
	        each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, _each_value_, each0_lookup, div0, fix_and_outro_and_destroy_block, create_each_block_1, null, get_each_context_1);

	        for (var _i7 = 0; _i7 < each_blocks_1.length; _i7 += 1) {
	          each_blocks_1[_i7].a();
	        }

	        check_outros();
	      }

	      if (dirty &
	      /*remove, todos*/
	      17) {
	        var _each_value =
	        /*todos*/
	        ctx[0].filter(func_1);

	        validate_each_argument(_each_value);
	        group_outros();

	        for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
	          each_blocks[_i8].r();
	        }

	        validate_each_keys(ctx, _each_value, get_each_context$1, get_key_1);
	        each_blocks = update_keyed_each(each_blocks, dirty, get_key_1, 1, ctx, _each_value, each1_lookup, div1, fix_and_outro_and_destroy_block, create_each_block$1, null, get_each_context$1);

	        for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
	          each_blocks[_i9].a();
	        }

	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;

	      for (var _i10 = 0; _i10 < each_value_1.length; _i10 += 1) {
	        transition_in(each_blocks_1[_i10]);
	      }

	      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
	        transition_in(each_blocks[_i11]);
	      }

	      current = true;
	    },
	    o: function outro(local) {
	      for (var _i12 = 0; _i12 < each_blocks_1.length; _i12 += 1) {
	        transition_out(each_blocks_1[_i12]);
	      }

	      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
	        transition_out(each_blocks[_i13]);
	      }

	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div2);

	      for (var _i14 = 0; _i14 < each_blocks_1.length; _i14 += 1) {
	        each_blocks_1[_i14].d();
	      }

	      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
	        each_blocks[_i15].d();
	      }

	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$e.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	var func = function func(t) {
	  return !t.done;
	};

	var func_1 = function func_1(t) {
	  return t.done;
	};

	function instance$e($$self, $$props, $$invalidate) {
	  var _crossfade = crossfade({
	    fallback: function fallback(node, params) {
	      var style = getComputedStyle(node);
	      var transform = style.transform === "none" ? "" : style.transform;
	      return {
	        duration: 600,
	        easing: quintOut,
	        css: function css(t) {
	          return "\n\t\t\t\t\ttransform: ".concat(transform, " scale(").concat(t, ");\n\t\t\t\t\topacity: ").concat(t, "\n\t\t\t\t");
	        }
	      };
	    }
	  }),
	      _crossfade2 = slicedToArray(_crossfade, 2),
	      send = _crossfade2[0],
	      receive = _crossfade2[1];

	  var todos = [{
	    id: 1,
	    done: false,
	    description: "write some docs"
	  }, {
	    id: 2,
	    done: false,
	    description: "start writing JSConf talk"
	  }, {
	    id: 3,
	    done: true,
	    description: "buy some milk"
	  }, {
	    id: 4,
	    done: false,
	    description: "mow the lawn"
	  }, {
	    id: 5,
	    done: false,
	    description: "feed the turtle"
	  }, {
	    id: 6,
	    done: false,
	    description: "fix some bugs"
	  }];
	  var uid = todos.length + 1;

	  function add(input) {
	    var todo = {
	      id: uid++,
	      done: false,
	      description: input.value
	    };
	    $$invalidate(0, todos = [todo].concat(toConsumableArray(todos)));
	    input.value = "";
	  }

	  function remove(todo) {
	    $$invalidate(0, todos = todos.filter(function (t) {
	      return t !== todo;
	    }));
	  }

	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Animate_directive> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Animate_directive", $$slots, []);

	  var keydown_handler = function keydown_handler(event) {
	    return event.which === 13 && add(event.target);
	  };

	  function input_change_handler(todo) {
	    todo.done = this.checked;
	    $$invalidate(0, todos);
	  }

	  var click_handler = function click_handler(todo) {
	    return remove(todo);
	  };

	  function input_change_handler_1(todo) {
	    todo.done = this.checked;
	    $$invalidate(0, todos);
	  }

	  var click_handler_1 = function click_handler_1(todo) {
	    return remove(todo);
	  };

	  $$self.$capture_state = function () {
	    return {
	      quintOut: quintOut,
	      crossfade: crossfade,
	      flip: flip,
	      send: send,
	      receive: receive,
	      todos: todos,
	      uid: uid,
	      add: add,
	      remove: remove
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("todos" in $$props) $$invalidate(0, todos = $$props.todos);
	    if ("uid" in $$props) uid = $$props.uid;
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [todos, send, receive, add, remove, uid, keydown_handler, input_change_handler, click_handler, input_change_handler_1, click_handler_1];
	}

	var Animate_directive = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Animate_directive, _SvelteComponentDev);

	  var _super = _createSuper$f(Animate_directive);

	  function Animate_directive(options) {
	    var _this;

	    classCallCheck(this, Animate_directive);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Animate_directive",
	      options: options,
	      id: create_fragment$e.name
	    });
	    return _this;
	  }

	  return Animate_directive;
	}(SvelteComponentDev);

	function _createSuper$g(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$h()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$c = "test/src/class-directive/index.svelte";

	function create_fragment$f(ctx) {
	  var label;
	  var input;
	  var t0;
	  var t1;
	  var div;
	  var t2;
	  var t3_value = (
	  /*big*/
	  ctx[0] ? "big" : "small") + "";
	  var t3;
	  var t4;
	  var dispose;
	  var block = {
	    c: function create() {
	      label = element("label");
	      input = element("input");
	      t0 = text("\n\tbig");
	      t1 = space();
	      div = element("div");
	      t2 = text("some ");
	      t3 = text(t3_value);
	      t4 = text(" text");
	      attr_dev(input, "type", "checkbox");
	      add_location(input, file$c, 11, 1, 94);
	      add_location(label, file$c, 10, 0, 85);
	      attr_dev(div, "class", "svelte-crddqb");
	      toggle_class(div, "big",
	      /*big*/
	      ctx[0]);
	      add_location(div, file$c, 15, 0, 150);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, label, anchor);
	      append_dev(label, input);
	      input.checked =
	      /*big*/
	      ctx[0];
	      append_dev(label, t0);
	      insert_dev(target, t1, anchor);
	      insert_dev(target, div, anchor);
	      append_dev(div, t2);
	      append_dev(div, t3);
	      append_dev(div, t4);
	      if (remount) dispose();
	      dispose = listen_dev(input, "change",
	      /*input_change_handler*/
	      ctx[1]);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*big*/
	      1) {
	        input.checked =
	        /*big*/
	        ctx[0];
	      }

	      if (dirty &
	      /*big*/
	      1 && t3_value !== (t3_value = (
	      /*big*/
	      ctx[0] ? "big" : "small") + "")) set_data_dev(t3, t3_value);

	      if (dirty &
	      /*big*/
	      1) {
	        toggle_class(div, "big",
	        /*big*/
	        ctx[0]);
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(label);
	      if (detaching) detach_dev(t1);
	      if (detaching) detach_dev(div);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$f.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$f($$self, $$props, $$invalidate) {
	  var big = false;
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Class_directive> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Class_directive", $$slots, []);

	  function input_change_handler() {
	    big = this.checked;
	    $$invalidate(0, big);
	  }

	  $$self.$capture_state = function () {
	    return {
	      big: big
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("big" in $$props) $$invalidate(0, big = $$props.big);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [big, input_change_handler];
	}

	var Class_directive = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Class_directive, _SvelteComponentDev);

	  var _super = _createSuper$g(Class_directive);

	  function Class_directive(options) {
	    var _this;

	    classCallCheck(this, Class_directive);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$f, create_fragment$f, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Class_directive",
	      options: options,
	      id: create_fragment$f.name
	    });
	    return _this;
	  }

	  return Class_directive;
	}(SvelteComponentDev);

	function _createSuper$h(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$i()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$d = "test/src/modal/Modal.svelte";

	var get_header_slot_changes = function get_header_slot_changes(dirty) {
	  return {};
	};

	var get_header_slot_context = function get_header_slot_context(ctx) {
	  return {};
	};

	function create_fragment$g(ctx) {
	  var div0;
	  var t0;
	  var div1;
	  var t1;
	  var hr0;
	  var t2;
	  var t3;
	  var hr1;
	  var t4;
	  var button;
	  var current;
	  var dispose;
	  var header_slot_template =
	  /*$$slots*/
	  ctx[6].header;
	  var header_slot = create_slot(header_slot_template, ctx,
	  /*$$scope*/
	  ctx[5], get_header_slot_context);
	  var default_slot_template =
	  /*$$slots*/
	  ctx[6].default;
	  var default_slot = create_slot(default_slot_template, ctx,
	  /*$$scope*/
	  ctx[5], null);
	  var block = {
	    c: function create() {
	      div0 = element("div");
	      t0 = space();
	      div1 = element("div");
	      if (header_slot) header_slot.c();
	      t1 = space();
	      hr0 = element("hr");
	      t2 = space();
	      if (default_slot) default_slot.c();
	      t3 = space();
	      hr1 = element("hr");
	      t4 = space();
	      button = element("button");
	      button.textContent = "close modal";
	      attr_dev(div0, "class", "modal-background svelte-1k3utew");
	      add_location(div0, file$d, 41, 0, 890);
	      add_location(hr0, file$d, 45, 1, 1045);
	      add_location(hr1, file$d, 47, 1, 1066);
	      button.autofocus = true;
	      attr_dev(button, "class", "svelte-1k3utew");
	      add_location(button, file$d, 50, 1, 1112);
	      attr_dev(div1, "class", "modal svelte-1k3utew");
	      attr_dev(div1, "role", "dialog");
	      attr_dev(div1, "aria-modal", "true");
	      add_location(div1, file$d, 43, 0, 945);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, div0, anchor);
	      insert_dev(target, t0, anchor);
	      insert_dev(target, div1, anchor);

	      if (header_slot) {
	        header_slot.m(div1, null);
	      }

	      append_dev(div1, t1);
	      append_dev(div1, hr0);
	      append_dev(div1, t2);

	      if (default_slot) {
	        default_slot.m(div1, null);
	      }

	      append_dev(div1, t3);
	      append_dev(div1, hr1);
	      append_dev(div1, t4);
	      append_dev(div1, button);
	      /*div1_binding*/

	      ctx[7](div1);
	      current = true;
	      button.focus();
	      if (remount) run_all(dispose);
	      dispose = [listen_dev(window, "keydown",
	      /*handle_keydown*/
	      ctx[2], false, false, false), listen_dev(div0, "click",
	      /*close*/
	      ctx[1], false, false, false), listen_dev(button, "click",
	      /*close*/
	      ctx[1], false, false, false)];
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (header_slot) {
	        if (header_slot.p && dirty &
	        /*$$scope*/
	        32) {
	          header_slot.p(get_slot_context(header_slot_template, ctx,
	          /*$$scope*/
	          ctx[5], get_header_slot_context), get_slot_changes(header_slot_template,
	          /*$$scope*/
	          ctx[5], dirty, get_header_slot_changes));
	        }
	      }

	      if (default_slot) {
	        if (default_slot.p && dirty &
	        /*$$scope*/
	        32) {
	          default_slot.p(get_slot_context(default_slot_template, ctx,
	          /*$$scope*/
	          ctx[5], null), get_slot_changes(default_slot_template,
	          /*$$scope*/
	          ctx[5], dirty, null));
	        }
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(header_slot, local);
	      transition_in(default_slot, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(header_slot, local);
	      transition_out(default_slot, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div0);
	      if (detaching) detach_dev(t0);
	      if (detaching) detach_dev(div1);
	      if (header_slot) header_slot.d(detaching);
	      if (default_slot) default_slot.d(detaching);
	      /*div1_binding*/

	      ctx[7](null);
	      run_all(dispose);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$g.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$g($$self, $$props, $$invalidate) {
	  var dispatch = createEventDispatcher();

	  var close = function close() {
	    return dispatch("close");
	  };

	  var modal;

	  var handle_keydown = function handle_keydown(e) {
	    if (e.key === "Escape") {
	      close();
	      return;
	    }

	    if (e.key === "Tab") {
	      // trap focus
	      var nodes = modal.querySelectorAll("*");
	      var tabbable = Array.from(nodes).filter(function (n) {
	        return n.tabIndex >= 0;
	      });
	      var index = tabbable.indexOf(document.activeElement);
	      if (index === -1 && e.shiftKey) index = 0;
	      index += tabbable.length + (e.shiftKey ? -1 : 1);
	      index %= tabbable.length;
	      tabbable[index].focus();
	      e.preventDefault();
	    }
	  };

	  var previously_focused = typeof document !== "undefined" && document.activeElement;

	  if (previously_focused) {
	    onDestroy(function () {
	      previously_focused.focus();
	    });
	  }

	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Modal> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Modal", $$slots, ['header', 'default']);

	  function div1_binding($$value) {
	    binding_callbacks[$$value ? "unshift" : "push"](function () {
	      $$invalidate(0, modal = $$value);
	    });
	  }

	  $$self.$set = function ($$props) {
	    if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	  };

	  $$self.$capture_state = function () {
	    return {
	      createEventDispatcher: createEventDispatcher,
	      onDestroy: onDestroy,
	      dispatch: dispatch,
	      close: close,
	      modal: modal,
	      handle_keydown: handle_keydown,
	      previously_focused: previously_focused
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("modal" in $$props) $$invalidate(0, modal = $$props.modal);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [modal, close, handle_keydown, dispatch, previously_focused, $$scope, $$slots, div1_binding];
	}

	var Modal = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Modal, _SvelteComponentDev);

	  var _super = _createSuper$h(Modal);

	  function Modal(options) {
	    var _this;

	    classCallCheck(this, Modal);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$g, create_fragment$g, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Modal",
	      options: options,
	      id: create_fragment$g.name
	    });
	    return _this;
	  }

	  return Modal;
	}(SvelteComponentDev);

	function _createSuper$i(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$j()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$e = "test/src/modal/index.svelte"; // (11:0) {#if showModal}

	function create_if_block$1(ctx) {
	  var current;
	  var modal = new Modal({
	    props: {
	      $$slots: {
	        default: [create_default_slot],
	        header: [create_header_slot]
	      },
	      $$scope: {
	        ctx: ctx
	      }
	    },
	    $$inline: true
	  });
	  modal.$on("close",
	  /*close_handler*/
	  ctx[2]);
	  var block = {
	    c: function create() {
	      create_component(modal.$$.fragment);
	    },
	    m: function mount(target, anchor) {
	      mount_component(modal, target, anchor);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      var modal_changes = {};

	      if (dirty &
	      /*$$scope*/
	      8) {
	        modal_changes.$$scope = {
	          dirty: dirty,
	          ctx: ctx
	        };
	      }

	      modal.$set(modal_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(modal.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(modal.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(modal, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block$1.name,
	    type: "if",
	    source: "(11:0) {#if showModal}",
	    ctx: ctx
	  });
	  return block;
	} // (13:2) <h2 slot="header">


	function create_header_slot(ctx) {
	  var h2;
	  var t0;
	  var small;
	  var em;
	  var block = {
	    c: function create() {
	      h2 = element("h2");
	      t0 = text("modal\n\t\t\t");
	      small = element("small");
	      em = element("em");
	      em.textContent = "adjective";
	      add_location(em, file$e, 14, 10, 252);
	      add_location(small, file$e, 14, 3, 245);
	      attr_dev(h2, "slot", "header");
	      add_location(h2, file$e, 12, 2, 214);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, h2, anchor);
	      append_dev(h2, t0);
	      append_dev(h2, small);
	      append_dev(small, em);
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(h2);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_header_slot.name,
	    type: "slot",
	    source: "(13:2) <h2 slot=\\\"header\\\">",
	    ctx: ctx
	  });
	  return block;
	} // (12:1) <Modal on:close="{() => showModal = false}">


	function create_default_slot(ctx) {
	  var t0;
	  var ol;
	  var li0;
	  var t2;
	  var li1;
	  var t4;
	  var li2;
	  var t6;
	  var li3;
	  var t8;
	  var li4;
	  var t10;
	  var li5;
	  var t12;
	  var a;
	  var block = {
	    c: function create() {
	      t0 = space();
	      ol = element("ol");
	      li0 = element("li");
	      li0.textContent = "of or relating to modality in logic";
	      t2 = space();
	      li1 = element("li");
	      li1.textContent = "containing provisions as to the mode of procedure or the manner of taking effect —used of a contract or legacy";
	      t4 = space();
	      li2 = element("li");
	      li2.textContent = "of or relating to a musical mode";
	      t6 = space();
	      li3 = element("li");
	      li3.textContent = "of or relating to structure as opposed to substance";
	      t8 = space();
	      li4 = element("li");
	      li4.textContent = "of, relating to, or constituting a grammatical form or category characteristically indicating predication";
	      t10 = space();
	      li5 = element("li");
	      li5.textContent = "of or relating to a statistical mode";
	      t12 = space();
	      a = element("a");
	      a.textContent = "merriam-webster.com";
	      add_location(li0, file$e, 18, 3, 322);
	      add_location(li1, file$e, 19, 3, 370);
	      add_location(li2, file$e, 20, 3, 493);
	      add_location(li3, file$e, 21, 3, 538);
	      add_location(li4, file$e, 22, 3, 602);
	      add_location(li5, file$e, 23, 3, 720);
	      attr_dev(ol, "class", "definition-list");
	      add_location(ol, file$e, 17, 2, 290);
	      attr_dev(a, "href", "https://www.merriam-webster.com/dictionary/modal");
	      add_location(a, file$e, 26, 2, 777);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, t0, anchor);
	      insert_dev(target, ol, anchor);
	      append_dev(ol, li0);
	      append_dev(ol, t2);
	      append_dev(ol, li1);
	      append_dev(ol, t4);
	      append_dev(ol, li2);
	      append_dev(ol, t6);
	      append_dev(ol, li3);
	      append_dev(ol, t8);
	      append_dev(ol, li4);
	      append_dev(ol, t10);
	      append_dev(ol, li5);
	      insert_dev(target, t12, anchor);
	      insert_dev(target, a, anchor);
	    },
	    p: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(t0);
	      if (detaching) detach_dev(ol);
	      if (detaching) detach_dev(t12);
	      if (detaching) detach_dev(a);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_default_slot.name,
	    type: "slot",
	    source: "(12:1) <Modal on:close=\\\"{() => showModal = false}\\\">",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$h(ctx) {
	  var button;
	  var t1;
	  var if_block_anchor;
	  var current;
	  var dispose;
	  var if_block =
	  /*showModal*/
	  ctx[0] && create_if_block$1(ctx);
	  var block = {
	    c: function create() {
	      button = element("button");
	      button.textContent = "show modal";
	      t1 = space();
	      if (if_block) if_block.c();
	      if_block_anchor = empty();
	      add_location(button, file$e, 6, 0, 82);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, button, anchor);
	      insert_dev(target, t1, anchor);
	      if (if_block) if_block.m(target, anchor);
	      insert_dev(target, if_block_anchor, anchor);
	      current = true;
	      if (remount) dispose();
	      dispose = listen_dev(button, "click",
	      /*click_handler*/
	      ctx[1], false, false, false);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (
	      /*showModal*/
	      ctx[0]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	          transition_in(if_block, 1);
	        } else {
	          if_block = create_if_block$1(ctx);
	          if_block.c();
	          transition_in(if_block, 1);
	          if_block.m(if_block_anchor.parentNode, if_block_anchor);
	        }
	      } else if (if_block) {
	        group_outros();
	        transition_out(if_block, 1, 1, function () {
	          if_block = null;
	        });
	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(button);
	      if (detaching) detach_dev(t1);
	      if (if_block) if_block.d(detaching);
	      if (detaching) detach_dev(if_block_anchor);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$h.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$h($$self, $$props, $$invalidate) {
	  var showModal = false;
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Modal> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Modal", $$slots, []);

	  var click_handler = function click_handler() {
	    return $$invalidate(0, showModal = true);
	  };

	  var close_handler = function close_handler() {
	    return $$invalidate(0, showModal = false);
	  };

	  $$self.$capture_state = function () {
	    return {
	      Modal: Modal,
	      showModal: showModal
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("showModal" in $$props) $$invalidate(0, showModal = $$props.showModal);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [showModal, click_handler, close_handler];
	}

	var Modal_1 = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Modal_1, _SvelteComponentDev);

	  var _super = _createSuper$i(Modal_1);

	  function Modal_1(options) {
	    var _this;

	    classCallCheck(this, Modal_1);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$h, create_fragment$h, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Modal_1",
	      options: options,
	      id: create_fragment$h.name
	    });
	    return _this;
	  }

	  return Modal_1;
	}(SvelteComponentDev);

	function _createSuper$j(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$k()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$f = "test/src/svelte-self/File.svelte";

	function create_fragment$i(ctx) {
	  var span;
	  var t;
	  var block = {
	    c: function create() {
	      span = element("span");
	      t = text(
	      /*name*/
	      ctx[0]);
	      set_style(span, "background-image", "url(../img/" +
	      /*type*/
	      ctx[1] + ".svg)");
	      attr_dev(span, "class", "svelte-9d81kn");
	      add_location(span, file$f, 13, 0, 202);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, span, anchor);
	      append_dev(span, t);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (dirty &
	      /*name*/
	      1) set_data_dev(t,
	      /*name*/
	      ctx[0]);

	      if (dirty &
	      /*type*/
	      2) {
	        set_style(span, "background-image", "url(../img/" +
	        /*type*/
	        ctx[1] + ".svg)");
	      }
	    },
	    i: noop,
	    o: noop,
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(span);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$i.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$i($$self, $$props, $$invalidate) {
	  var name = $$props.name;
	  var writable_props = ["name"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<File> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("File", $$slots, []);

	  $$self.$set = function ($$props) {
	    if ("name" in $$props) $$invalidate(0, name = $$props.name);
	  };

	  $$self.$capture_state = function () {
	    return {
	      name: name,
	      type: type
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("name" in $$props) $$invalidate(0, name = $$props.name);
	    if ("type" in $$props) $$invalidate(1, type = $$props.type);
	  };

	  var type;

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  $$self.$$.update = function () {
	    if ($$self.$$.dirty &
	    /*name*/
	    1) {
	       $$invalidate(1, type = name.slice(name.lastIndexOf(".") + 1));
	    }
	  };

	  return [name, type];
	}

	var File = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(File, _SvelteComponentDev);

	  var _super = _createSuper$j(File);

	  function File(options) {
	    var _this;

	    classCallCheck(this, File);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$i, create_fragment$i, safe_not_equal, {
	      name: 0
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "File",
	      options: options,
	      id: create_fragment$i.name
	    });
	    var ctx = _this.$$.ctx;
	    var props = options.props || {};

	    if (
	    /*name*/
	    ctx[0] === undefined && !("name" in props)) {
	      console.warn("<File> was created without expected prop 'name'");
	    }

	    return _this;
	  }

	  createClass(File, [{
	    key: "name",
	    get: function get() {
	      throw new Error("<File>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<File>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return File;
	}(SvelteComponentDev);

	function _createSuper$k(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$l()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$g = "test/src/svelte-self/Folder.svelte";

	function get_each_context$2(ctx, list, i) {
	  var child_ctx = ctx.slice();
	  child_ctx[4] = list[i];
	  return child_ctx;
	} // (40:0) {#if expanded}


	function create_if_block$2(ctx) {
	  var ul;
	  var current;
	  var each_value =
	  /*files*/
	  ctx[2];
	  validate_each_argument(each_value);
	  var each_blocks = [];

	  for (var i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	  }

	  var out = function out(i) {
	    return transition_out(each_blocks[i], 1, 1, function () {
	      each_blocks[i] = null;
	    });
	  };

	  var block = {
	    c: function create() {
	      ul = element("ul");

	      for (var _i = 0; _i < each_blocks.length; _i += 1) {
	        each_blocks[_i].c();
	      }

	      attr_dev(ul, "class", "svelte-54v2fp");
	      add_location(ul, file$g, 40, 1, 627);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, ul, anchor);

	      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
	        each_blocks[_i2].m(ul, null);
	      }

	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      if (dirty &
	      /*files*/
	      4) {
	        each_value =
	        /*files*/
	        ctx[2];
	        validate_each_argument(each_value);

	        var _i3;

	        for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
	          var child_ctx = get_each_context$2(ctx, each_value, _i3);

	          if (each_blocks[_i3]) {
	            each_blocks[_i3].p(child_ctx, dirty);

	            transition_in(each_blocks[_i3], 1);
	          } else {
	            each_blocks[_i3] = create_each_block$2(child_ctx);

	            each_blocks[_i3].c();

	            transition_in(each_blocks[_i3], 1);

	            each_blocks[_i3].m(ul, null);
	          }
	        }

	        group_outros();

	        for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
	          out(_i3);
	        }

	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;

	      for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
	        transition_in(each_blocks[_i4]);
	      }

	      current = true;
	    },
	    o: function outro(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
	        transition_out(each_blocks[_i5]);
	      }

	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(ul);
	      destroy_each(each_blocks, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block$2.name,
	    type: "if",
	    source: "(40:0) {#if expanded}",
	    ctx: ctx
	  });
	  return block;
	} // (46:4) {:else}


	function create_else_block(ctx) {
	  var current;
	  var file_1_spread_levels = [
	  /*file*/
	  ctx[4]];
	  var file_1_props = {};

	  for (var i = 0; i < file_1_spread_levels.length; i += 1) {
	    file_1_props = assign(file_1_props, file_1_spread_levels[i]);
	  }

	  var file_1 = new File({
	    props: file_1_props,
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      create_component(file_1.$$.fragment);
	    },
	    m: function mount(target, anchor) {
	      mount_component(file_1, target, anchor);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      var file_1_changes = dirty &
	      /*files*/
	      4 ? get_spread_update(file_1_spread_levels, [get_spread_object(
	      /*file*/
	      ctx[4])]) : {};
	      file_1.$set(file_1_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(file_1.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(file_1.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(file_1, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_else_block.name,
	    type: "else",
	    source: "(46:4) {:else}",
	    ctx: ctx
	  });
	  return block;
	} // (44:4) {#if file.type === 'folder'}


	function create_if_block_1$1(ctx) {
	  var current;
	  var folder_spread_levels = [
	  /*file*/
	  ctx[4]];
	  var folder_props = {};

	  for (var i = 0; i < folder_spread_levels.length; i += 1) {
	    folder_props = assign(folder_props, folder_spread_levels[i]);
	  }

	  var folder = new Folder({
	    props: folder_props,
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      create_component(folder.$$.fragment);
	    },
	    m: function mount(target, anchor) {
	      mount_component(folder, target, anchor);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      var folder_changes = dirty &
	      /*files*/
	      4 ? get_spread_update(folder_spread_levels, [get_spread_object(
	      /*file*/
	      ctx[4])]) : {};
	      folder.$set(folder_changes);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(folder.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(folder.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      destroy_component(folder, detaching);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_if_block_1$1.name,
	    type: "if",
	    source: "(44:4) {#if file.type === 'folder'}",
	    ctx: ctx
	  });
	  return block;
	} // (42:2) {#each files as file}


	function create_each_block$2(ctx) {
	  var li;
	  var current_block_type_index;
	  var if_block;
	  var t;
	  var current;
	  var if_block_creators = [create_if_block_1$1, create_else_block];
	  var if_blocks = [];

	  function select_block_type(ctx, dirty) {
	    if (
	    /*file*/
	    ctx[4].type === "folder") return 0;
	    return 1;
	  }

	  current_block_type_index = select_block_type(ctx);
	  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	  var block = {
	    c: function create() {
	      li = element("li");
	      if_block.c();
	      t = space();
	      attr_dev(li, "class", "svelte-54v2fp");
	      add_location(li, file$g, 42, 3, 659);
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, li, anchor);
	      if_blocks[current_block_type_index].m(li, null);
	      append_dev(li, t);
	      current = true;
	    },
	    p: function update(ctx, dirty) {
	      var previous_block_index = current_block_type_index;
	      current_block_type_index = select_block_type(ctx);

	      if (current_block_type_index === previous_block_index) {
	        if_blocks[current_block_type_index].p(ctx, dirty);
	      } else {
	        group_outros();
	        transition_out(if_blocks[previous_block_index], 1, 1, function () {
	          if_blocks[previous_block_index] = null;
	        });
	        check_outros();
	        if_block = if_blocks[current_block_type_index];

	        if (!if_block) {
	          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	          if_block.c();
	        }

	        transition_in(if_block, 1);
	        if_block.m(li, t);
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(li);
	      if_blocks[current_block_type_index].d();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_each_block$2.name,
	    type: "each",
	    source: "(42:2) {#each files as file}",
	    ctx: ctx
	  });
	  return block;
	}

	function create_fragment$j(ctx) {
	  var span;
	  var t0;
	  var t1;
	  var if_block_anchor;
	  var current;
	  var dispose;
	  var if_block =
	  /*expanded*/
	  ctx[0] && create_if_block$2(ctx);
	  var block = {
	    c: function create() {
	      span = element("span");
	      t0 = text(
	      /*name*/
	      ctx[1]);
	      t1 = space();
	      if (if_block) if_block.c();
	      if_block_anchor = empty();
	      attr_dev(span, "class", "svelte-54v2fp");
	      toggle_class(span, "expanded",
	      /*expanded*/
	      ctx[0]);
	      add_location(span, file$g, 37, 0, 557);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor, remount) {
	      insert_dev(target, span, anchor);
	      append_dev(span, t0);
	      insert_dev(target, t1, anchor);
	      if (if_block) if_block.m(target, anchor);
	      insert_dev(target, if_block_anchor, anchor);
	      current = true;
	      if (remount) dispose();
	      dispose = listen_dev(span, "click",
	      /*toggle*/
	      ctx[3], false, false, false);
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (!current || dirty &
	      /*name*/
	      2) set_data_dev(t0,
	      /*name*/
	      ctx[1]);

	      if (dirty &
	      /*expanded*/
	      1) {
	        toggle_class(span, "expanded",
	        /*expanded*/
	        ctx[0]);
	      }

	      if (
	      /*expanded*/
	      ctx[0]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	          transition_in(if_block, 1);
	        } else {
	          if_block = create_if_block$2(ctx);
	          if_block.c();
	          transition_in(if_block, 1);
	          if_block.m(if_block_anchor.parentNode, if_block_anchor);
	        }
	      } else if (if_block) {
	        group_outros();
	        transition_out(if_block, 1, 1, function () {
	          if_block = null;
	        });
	        check_outros();
	      }
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(if_block);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(span);
	      if (detaching) detach_dev(t1);
	      if (if_block) if_block.d(detaching);
	      if (detaching) detach_dev(if_block_anchor);
	      dispose();
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$j.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$j($$self, $$props, $$invalidate) {
	  var _$$props$expanded = $$props.expanded,
	      expanded = _$$props$expanded === void 0 ? false : _$$props$expanded;
	  var name = $$props.name;
	  var files = $$props.files;

	  function toggle() {
	    $$invalidate(0, expanded = !expanded);
	  }

	  var writable_props = ["expanded", "name", "files"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Folder> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Folder", $$slots, []);

	  $$self.$set = function ($$props) {
	    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
	    if ("name" in $$props) $$invalidate(1, name = $$props.name);
	    if ("files" in $$props) $$invalidate(2, files = $$props.files);
	  };

	  $$self.$capture_state = function () {
	    return {
	      File: File,
	      expanded: expanded,
	      name: name,
	      files: files,
	      toggle: toggle
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
	    if ("name" in $$props) $$invalidate(1, name = $$props.name);
	    if ("files" in $$props) $$invalidate(2, files = $$props.files);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [expanded, name, files, toggle];
	}

	var Folder = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Folder, _SvelteComponentDev);

	  var _super = _createSuper$k(Folder);

	  function Folder(options) {
	    var _this;

	    classCallCheck(this, Folder);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$j, create_fragment$j, safe_not_equal, {
	      expanded: 0,
	      name: 1,
	      files: 2
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Folder",
	      options: options,
	      id: create_fragment$j.name
	    });
	    var ctx = _this.$$.ctx;
	    var props = options.props || {};

	    if (
	    /*name*/
	    ctx[1] === undefined && !("name" in props)) {
	      console.warn("<Folder> was created without expected prop 'name'");
	    }

	    if (
	    /*files*/
	    ctx[2] === undefined && !("files" in props)) {
	      console.warn("<Folder> was created without expected prop 'files'");
	    }

	    return _this;
	  }

	  createClass(Folder, [{
	    key: "expanded",
	    get: function get() {
	      throw new Error("<Folder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Folder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "name",
	    get: function get() {
	      throw new Error("<Folder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Folder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }, {
	    key: "files",
	    get: function get() {
	      throw new Error("<Folder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<Folder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return Folder;
	}(SvelteComponentDev);

	function _createSuper$l(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$m()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$h = "test/src/svelte-self/index.svelte";

	function create_fragment$k(ctx) {
	  var div;
	  var current;
	  var folder = new Folder({
	    props: {
	      name: "Home",
	      files:
	      /*root*/
	      ctx[0],
	      expanded: true
	    },
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      div = element("div");
	      create_component(folder.$$.fragment);
	      attr_dev(div, "class", "folder-con svelte-1t77urj");
	      add_location(div, file$h, 48, 0, 881);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, div, anchor);
	      mount_component(folder, div, null);
	      current = true;
	    },
	    p: noop,
	    i: function intro(local) {
	      if (current) return;
	      transition_in(folder.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(folder.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(div);
	      destroy_component(folder);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$k.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$k($$self, $$props, $$invalidate) {
	  var root = [{
	    type: "folder",
	    name: "Important work stuff",
	    files: [{
	      type: "file",
	      name: "quarterly-results.xlsx"
	    }]
	  }, {
	    type: "folder",
	    name: "Animal GIFs",
	    files: [{
	      type: "folder",
	      name: "Dogs",
	      files: [{
	        type: "file",
	        name: "treadmill.gif"
	      }, {
	        type: "file",
	        name: "rope-jumping.gif"
	      }]
	    }, {
	      type: "folder",
	      name: "Goats",
	      files: [{
	        type: "file",
	        name: "parkour.gif"
	      }, {
	        type: "file",
	        name: "rampage.gif"
	      }]
	    }, {
	      type: "file",
	      name: "cat-roomba.gif"
	    }, {
	      type: "file",
	      name: "duck-shuffle.gif"
	    }, {
	      type: "file",
	      name: "monkey-on-a-pig.gif"
	    }]
	  }, {
	    type: "file",
	    name: "TODO.md"
	  }];
	  var writable_props = [];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Svelte_self> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("Svelte_self", $$slots, []);

	  $$self.$capture_state = function () {
	    return {
	      Folder: Folder,
	      root: root
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("root" in $$props) $$invalidate(0, root = $$props.root);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [root];
	}

	var Svelte_self = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(Svelte_self, _SvelteComponentDev);

	  var _super = _createSuper$l(Svelte_self);

	  function Svelte_self(options) {
	    var _this;

	    classCallCheck(this, Svelte_self);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$k, create_fragment$k, safe_not_equal, {});
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "Svelte_self",
	      options: options,
	      id: create_fragment$k.name
	    });
	    return _this;
	  }

	  return Svelte_self;
	}(SvelteComponentDev);

	function _createSuper$m(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$n()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	var file$i = "test/src/App.svelte";

	function create_fragment$l(ctx) {
	  var main0;
	  var h10;
	  var t0;
	  var t1;
	  var t2;
	  var t3;
	  var p;
	  var t4;
	  var a;
	  var t6;
	  var t7;
	  var main1;
	  var h11;
	  var t9;
	  var h40;
	  var t11;
	  var t12;
	  var h41;
	  var t14;
	  var t15;
	  var h42;
	  var t17;
	  var t18;
	  var h43;
	  var t20;
	  var t21;
	  var h44;
	  var t23;
	  var t24;
	  var h45;
	  var t26;
	  var t27;
	  var h46;
	  var t29;
	  var t30;
	  var h47;
	  var t32;
	  var t33;
	  var h48;
	  var t35;
	  var t36;
	  var h49;
	  var t38;
	  var t39;
	  var h410;
	  var t41;
	  var t42;
	  var h411;
	  var t44;
	  var t45;
	  var h412;
	  var t47;
	  var t48;
	  var h413;
	  var t50;
	  var t51;
	  var h414;
	  var t53;
	  var current;
	  var dynamicattr = new Dynamic_attr({
	    $$inline: true
	  });
	  var htmltags = new Html_tags({
	    $$inline: true
	  });
	  var reactivestatements = new Reactive_statements({
	    $$inline: true
	  });
	  var spreadprops = new Spread_props({
	    $$inline: true
	  });
	  var awaitblocks = new Await_blocks({
	    $$inline: true
	  });
	  var eventforwarding = new Event_forwarding({
	    $$inline: true
	  });
	  var bindingcanvas = new Binding_canvas({
	    $$inline: true
	  });
	  var tick_1 = new Tick({
	    $$inline: true
	  });
	  var customstores = new Custom_stores({
	    $$inline: true
	  });
	  var spring = new Spring({
	    $$inline: true
	  });
	  var deferredtransitions = new Deferred_transitions({
	    $$inline: true
	  });
	  var animatedirective = new Animate_directive({
	    $$inline: true
	  });
	  var classdirective = new Class_directive({
	    $$inline: true
	  });
	  var modal = new Modal_1({
	    $$inline: true
	  });
	  var svelteself = new Svelte_self({
	    $$inline: true
	  });
	  var block = {
	    c: function create() {
	      main0 = element("main");
	      h10 = element("h1");
	      t0 = text("Hello ");
	      t1 = text(
	      /*name*/
	      ctx[0]);
	      t2 = text("!");
	      t3 = space();
	      p = element("p");
	      t4 = text("Visit the\n    ");
	      a = element("a");
	      a.textContent = "Svelte tutorial";
	      t6 = text("\n    to learn how to build Svelte apps.");
	      t7 = space();
	      main1 = element("main");
	      h11 = element("h1");
	      h11.textContent = "TEST";
	      t9 = space();
	      h40 = element("h4");
	      h40.textContent = "Dynamic attributes";
	      t11 = space();
	      create_component(dynamicattr.$$.fragment);
	      t12 = space();
	      h41 = element("h4");
	      h41.textContent = "HTML tags";
	      t14 = space();
	      create_component(htmltags.$$.fragment);
	      t15 = space();
	      h42 = element("h4");
	      h42.textContent = "Reactive Statements";
	      t17 = space();
	      create_component(reactivestatements.$$.fragment);
	      t18 = space();
	      h43 = element("h4");
	      h43.textContent = "Spread Props";
	      t20 = space();
	      create_component(spreadprops.$$.fragment);
	      t21 = space();
	      h44 = element("h4");
	      h44.textContent = "Await Blocks";
	      t23 = space();
	      create_component(awaitblocks.$$.fragment);
	      t24 = space();
	      h45 = element("h4");
	      h45.textContent = "Event Forwarding";
	      t26 = space();
	      create_component(eventforwarding.$$.fragment);
	      t27 = space();
	      h46 = element("h4");
	      h46.textContent = "Bindi:this Canvas";
	      t29 = space();
	      create_component(bindingcanvas.$$.fragment);
	      t30 = space();
	      h47 = element("h4");
	      h47.textContent = "Tick";
	      t32 = space();
	      create_component(tick_1.$$.fragment);
	      t33 = space();
	      h48 = element("h4");
	      h48.textContent = "Custom Stores";
	      t35 = space();
	      create_component(customstores.$$.fragment);
	      t36 = space();
	      h49 = element("h4");
	      h49.textContent = "Spring";
	      t38 = space();
	      create_component(spring.$$.fragment);
	      t39 = space();
	      h410 = element("h4");
	      h410.textContent = "Deferred Transitions";
	      t41 = space();
	      create_component(deferredtransitions.$$.fragment);
	      t42 = space();
	      h411 = element("h4");
	      h411.textContent = "Animate Directive";
	      t44 = space();
	      create_component(animatedirective.$$.fragment);
	      t45 = space();
	      h412 = element("h4");
	      h412.textContent = "Class Directive";
	      t47 = space();
	      create_component(classdirective.$$.fragment);
	      t48 = space();
	      h413 = element("h4");
	      h413.textContent = "Modal";
	      t50 = space();
	      create_component(modal.$$.fragment);
	      t51 = space();
	      h414 = element("h4");
	      h414.textContent = "Svelte Self";
	      t53 = space();
	      create_component(svelteself.$$.fragment);
	      attr_dev(h10, "class", "svelte-qz5rln");
	      add_location(h10, file$i, 47, 2, 1321);
	      attr_dev(a, "href", "https://svelte.dev/tutorial");
	      add_location(a, file$i, 50, 4, 1368);
	      add_location(p, file$i, 48, 2, 1346);
	      attr_dev(main0, "class", "svelte-qz5rln");
	      add_location(main0, file$i, 46, 0, 1312);
	      attr_dev(h11, "class", "svelte-qz5rln");
	      add_location(h11, file$i, 56, 2, 1490);
	      attr_dev(h40, "class", "svelte-qz5rln");
	      add_location(h40, file$i, 57, 2, 1506);
	      attr_dev(h41, "class", "svelte-qz5rln");
	      add_location(h41, file$i, 59, 2, 1554);
	      attr_dev(h42, "class", "svelte-qz5rln");
	      add_location(h42, file$i, 61, 2, 1590);
	      attr_dev(h43, "class", "svelte-qz5rln");
	      add_location(h43, file$i, 63, 2, 1646);
	      attr_dev(h44, "class", "svelte-qz5rln");
	      add_location(h44, file$i, 65, 2, 1688);
	      attr_dev(h45, "class", "svelte-qz5rln");
	      add_location(h45, file$i, 67, 2, 1730);
	      attr_dev(h46, "class", "svelte-qz5rln");
	      add_location(h46, file$i, 69, 2, 1780);
	      attr_dev(h47, "class", "svelte-qz5rln");
	      add_location(h47, file$i, 71, 2, 1829);
	      attr_dev(h48, "class", "svelte-qz5rln");
	      add_location(h48, file$i, 73, 2, 1856);
	      attr_dev(h49, "class", "svelte-qz5rln");
	      add_location(h49, file$i, 75, 2, 1900);
	      attr_dev(h410, "class", "svelte-qz5rln");
	      add_location(h410, file$i, 77, 2, 1931);
	      attr_dev(h411, "class", "svelte-qz5rln");
	      add_location(h411, file$i, 79, 2, 1989);
	      attr_dev(h412, "class", "svelte-qz5rln");
	      add_location(h412, file$i, 81, 2, 2041);
	      attr_dev(h413, "class", "svelte-qz5rln");
	      add_location(h413, file$i, 83, 2, 2089);
	      attr_dev(h414, "class", "svelte-qz5rln");
	      add_location(h414, file$i, 85, 2, 2118);
	      attr_dev(main1, "class", "svelte-qz5rln");
	      add_location(main1, file$i, 55, 0, 1481);
	    },
	    l: function claim(nodes) {
	      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
	    },
	    m: function mount(target, anchor) {
	      insert_dev(target, main0, anchor);
	      append_dev(main0, h10);
	      append_dev(h10, t0);
	      append_dev(h10, t1);
	      append_dev(h10, t2);
	      append_dev(main0, t3);
	      append_dev(main0, p);
	      append_dev(p, t4);
	      append_dev(p, a);
	      append_dev(p, t6);
	      insert_dev(target, t7, anchor);
	      insert_dev(target, main1, anchor);
	      append_dev(main1, h11);
	      append_dev(main1, t9);
	      append_dev(main1, h40);
	      append_dev(main1, t11);
	      mount_component(dynamicattr, main1, null);
	      append_dev(main1, t12);
	      append_dev(main1, h41);
	      append_dev(main1, t14);
	      mount_component(htmltags, main1, null);
	      append_dev(main1, t15);
	      append_dev(main1, h42);
	      append_dev(main1, t17);
	      mount_component(reactivestatements, main1, null);
	      append_dev(main1, t18);
	      append_dev(main1, h43);
	      append_dev(main1, t20);
	      mount_component(spreadprops, main1, null);
	      append_dev(main1, t21);
	      append_dev(main1, h44);
	      append_dev(main1, t23);
	      mount_component(awaitblocks, main1, null);
	      append_dev(main1, t24);
	      append_dev(main1, h45);
	      append_dev(main1, t26);
	      mount_component(eventforwarding, main1, null);
	      append_dev(main1, t27);
	      append_dev(main1, h46);
	      append_dev(main1, t29);
	      mount_component(bindingcanvas, main1, null);
	      append_dev(main1, t30);
	      append_dev(main1, h47);
	      append_dev(main1, t32);
	      mount_component(tick_1, main1, null);
	      append_dev(main1, t33);
	      append_dev(main1, h48);
	      append_dev(main1, t35);
	      mount_component(customstores, main1, null);
	      append_dev(main1, t36);
	      append_dev(main1, h49);
	      append_dev(main1, t38);
	      mount_component(spring, main1, null);
	      append_dev(main1, t39);
	      append_dev(main1, h410);
	      append_dev(main1, t41);
	      mount_component(deferredtransitions, main1, null);
	      append_dev(main1, t42);
	      append_dev(main1, h411);
	      append_dev(main1, t44);
	      mount_component(animatedirective, main1, null);
	      append_dev(main1, t45);
	      append_dev(main1, h412);
	      append_dev(main1, t47);
	      mount_component(classdirective, main1, null);
	      append_dev(main1, t48);
	      append_dev(main1, h413);
	      append_dev(main1, t50);
	      mount_component(modal, main1, null);
	      append_dev(main1, t51);
	      append_dev(main1, h414);
	      append_dev(main1, t53);
	      mount_component(svelteself, main1, null);
	      current = true;
	    },
	    p: function update(ctx, _ref) {
	      var _ref2 = slicedToArray(_ref, 1),
	          dirty = _ref2[0];

	      if (!current || dirty &
	      /*name*/
	      1) set_data_dev(t1,
	      /*name*/
	      ctx[0]);
	    },
	    i: function intro(local) {
	      if (current) return;
	      transition_in(dynamicattr.$$.fragment, local);
	      transition_in(htmltags.$$.fragment, local);
	      transition_in(reactivestatements.$$.fragment, local);
	      transition_in(spreadprops.$$.fragment, local);
	      transition_in(awaitblocks.$$.fragment, local);
	      transition_in(eventforwarding.$$.fragment, local);
	      transition_in(bindingcanvas.$$.fragment, local);
	      transition_in(tick_1.$$.fragment, local);
	      transition_in(customstores.$$.fragment, local);
	      transition_in(spring.$$.fragment, local);
	      transition_in(deferredtransitions.$$.fragment, local);
	      transition_in(animatedirective.$$.fragment, local);
	      transition_in(classdirective.$$.fragment, local);
	      transition_in(modal.$$.fragment, local);
	      transition_in(svelteself.$$.fragment, local);
	      current = true;
	    },
	    o: function outro(local) {
	      transition_out(dynamicattr.$$.fragment, local);
	      transition_out(htmltags.$$.fragment, local);
	      transition_out(reactivestatements.$$.fragment, local);
	      transition_out(spreadprops.$$.fragment, local);
	      transition_out(awaitblocks.$$.fragment, local);
	      transition_out(eventforwarding.$$.fragment, local);
	      transition_out(bindingcanvas.$$.fragment, local);
	      transition_out(tick_1.$$.fragment, local);
	      transition_out(customstores.$$.fragment, local);
	      transition_out(spring.$$.fragment, local);
	      transition_out(deferredtransitions.$$.fragment, local);
	      transition_out(animatedirective.$$.fragment, local);
	      transition_out(classdirective.$$.fragment, local);
	      transition_out(modal.$$.fragment, local);
	      transition_out(svelteself.$$.fragment, local);
	      current = false;
	    },
	    d: function destroy(detaching) {
	      if (detaching) detach_dev(main0);
	      if (detaching) detach_dev(t7);
	      if (detaching) detach_dev(main1);
	      destroy_component(dynamicattr);
	      destroy_component(htmltags);
	      destroy_component(reactivestatements);
	      destroy_component(spreadprops);
	      destroy_component(awaitblocks);
	      destroy_component(eventforwarding);
	      destroy_component(bindingcanvas);
	      destroy_component(tick_1);
	      destroy_component(customstores);
	      destroy_component(spring);
	      destroy_component(deferredtransitions);
	      destroy_component(animatedirective);
	      destroy_component(classdirective);
	      destroy_component(modal);
	      destroy_component(svelteself);
	    }
	  };
	  dispatch_dev("SvelteRegisterBlock", {
	    block: block,
	    id: create_fragment$l.name,
	    type: "component",
	    source: "",
	    ctx: ctx
	  });
	  return block;
	}

	function instance$l($$self, $$props, $$invalidate) {
	  var name = $$props.name;
	  var writable_props = ["name"];
	  Object.keys($$props).forEach(function (key) {
	    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
	  });
	  var _$$props$$$slots = $$props.$$slots,
	      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
	      $$scope = $$props.$$scope;
	  validate_slots("App", $$slots, []);

	  $$self.$set = function ($$props) {
	    if ("name" in $$props) $$invalidate(0, name = $$props.name);
	  };

	  $$self.$capture_state = function () {
	    return {
	      DynamicAttr: Dynamic_attr,
	      HtmlTags: Html_tags,
	      ReactiveStatements: Reactive_statements,
	      SpreadProps: Spread_props,
	      AwaitBlocks: Await_blocks,
	      EventForwarding: Event_forwarding,
	      BindingCanvas: Binding_canvas,
	      Tick: Tick,
	      CustomStores: Custom_stores,
	      Spring: Spring,
	      DeferredTransitions: Deferred_transitions,
	      AnimateDirective: Animate_directive,
	      ClassDirective: Class_directive,
	      Modal: Modal_1,
	      SvelteSelf: Svelte_self,
	      name: name
	    };
	  };

	  $$self.$inject_state = function ($$props) {
	    if ("name" in $$props) $$invalidate(0, name = $$props.name);
	  };

	  if ($$props && "$$inject" in $$props) {
	    $$self.$inject_state($$props.$$inject);
	  }

	  return [name];
	}

	var App = /*#__PURE__*/function (_SvelteComponentDev) {
	  inherits(App, _SvelteComponentDev);

	  var _super = _createSuper$m(App);

	  function App(options) {
	    var _this;

	    classCallCheck(this, App);

	    _this = _super.call(this, options);
	    init(assertThisInitialized(_this), options, instance$l, create_fragment$l, safe_not_equal, {
	      name: 0
	    });
	    dispatch_dev("SvelteRegisterComponent", {
	      component: assertThisInitialized(_this),
	      tagName: "App",
	      options: options,
	      id: create_fragment$l.name
	    });
	    var ctx = _this.$$.ctx;
	    var props = options.props || {};

	    if (
	    /*name*/
	    ctx[0] === undefined && !("name" in props)) {
	      console.warn("<App> was created without expected prop 'name'");
	    }

	    return _this;
	  }

	  createClass(App, [{
	    key: "name",
	    get: function get() {
	      throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    },
	    set: function set(value) {
	      throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	    }
	  }]);

	  return App;
	}(SvelteComponentDev);

	// 引入polyfill

	(function () {
	  var lastTime = 0;
	  var vendors = ['webkit', 'moz'];

	  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	  }

	  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	    var id = window.setTimeout(function () {
	      callback(currTime + timeToCall);
	    }, timeToCall);
	    lastTime = currTime + timeToCall;
	    return id;
	  };
	  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
	    clearTimeout(id);
	  };
	})();
	var app = new App({
	  target: document.body,
	  props: {
	    name: 'world'
	  }
	});

	return app;

})));
//# sourceMappingURL=bundle.js.map
