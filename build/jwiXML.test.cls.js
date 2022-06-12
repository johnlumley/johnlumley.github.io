// Input 0
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function $$jscomp$arrayIteratorImpl$($array$$) {
  var $index$$ = 0;
  return function() {
    return $index$$ < $array$$.length ? {done:!1, value:$array$$[$index$$++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function $$jscomp$arrayIterator$($array$$) {
  return {next:$jscomp.arrayIteratorImpl($array$$)};
};
$jscomp.makeIterator = function $$jscomp$makeIterator$($iterable$$) {
  var $iteratorFunction$$ = "undefined" != typeof Symbol && Symbol.iterator && $iterable$$[Symbol.iterator];
  return $iteratorFunction$$ ? $iteratorFunction$$.call($iterable$$) : $jscomp.arrayIterator($iterable$$);
};
$jscomp.arrayFromIterator = function $$jscomp$arrayFromIterator$($iterator$$) {
  for (var $i$$, $arr$$ = []; !($i$$ = $iterator$$.next()).done;) {
    $arr$$.push($i$$.value);
  }
  return $arr$$;
};
$jscomp.arrayFromIterable = function $$jscomp$arrayFromIterable$($iterable$$) {
  return $iterable$$ instanceof Array ? $iterable$$ : $jscomp.arrayFromIterator($jscomp.makeIterator($iterable$$));
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function($prototype$$) {
  var $ctor$$ = function $$ctor$$$() {
  };
  $ctor$$.prototype = $prototype$$;
  return new $ctor$$;
};
$jscomp.underscoreProtoCanBeSet = function $$jscomp$underscoreProtoCanBeSet$() {
  var $x$$ = {a:!0}, $y$$ = {};
  try {
    return $y$$.__proto__ = $x$$, $y$$.a;
  } catch ($e$$) {
  }
  return !1;
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function($target$$, $proto$$) {
  $target$$.__proto__ = $proto$$;
  if ($target$$.__proto__ !== $proto$$) {
    throw new TypeError($target$$ + " is not extensible");
  }
  return $target$$;
} : null;
$jscomp.inherits = function $$jscomp$inherits$($childCtor$$, $parentCtor$$) {
  $childCtor$$.prototype = $jscomp.objectCreate($parentCtor$$.prototype);
  $childCtor$$.prototype.constructor = $childCtor$$;
  if ($jscomp.setPrototypeOf) {
    var $p_setPrototypeOf$$ = $jscomp.setPrototypeOf;
    $p_setPrototypeOf$$($childCtor$$, $parentCtor$$);
  } else {
    for ($p_setPrototypeOf$$ in $parentCtor$$) {
      if ("prototype" != $p_setPrototypeOf$$) {
        if (Object.defineProperties) {
          var $descriptor$$ = Object.getOwnPropertyDescriptor($parentCtor$$, $p_setPrototypeOf$$);
          $descriptor$$ && Object.defineProperty($childCtor$$, $p_setPrototypeOf$$, $descriptor$$);
        } else {
          $childCtor$$[$p_setPrototypeOf$$] = $parentCtor$$[$p_setPrototypeOf$$];
        }
      }
    }
  }
  $childCtor$$.superClass_ = $parentCtor$$.prototype;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function($target$$, $property$$, $descriptor$$) {
  $target$$ != Array.prototype && $target$$ != Object.prototype && ($target$$[$property$$] = $descriptor$$.value);
};
$jscomp.getGlobal = function $$jscomp$getGlobal$($maybeGlobal$$) {
  return "undefined" != typeof window && window === $maybeGlobal$$ ? $maybeGlobal$$ : "undefined" != typeof global && null != global ? global : $maybeGlobal$$;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function $$jscomp$polyfill$($property$jscomp$5_split_target$$, $impl_polyfill$$, $fromLang_obj$$, $i$$) {
  if ($impl_polyfill$$) {
    $fromLang_obj$$ = $jscomp.global;
    $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$.split(".");
    for ($i$$ = 0; $i$$ < $property$jscomp$5_split_target$$.length - 1; $i$$++) {
      var $key$$ = $property$jscomp$5_split_target$$[$i$$];
      $key$$ in $fromLang_obj$$ || ($fromLang_obj$$[$key$$] = {});
      $fromLang_obj$$ = $fromLang_obj$$[$key$$];
    }
    $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$[$property$jscomp$5_split_target$$.length - 1];
    $i$$ = $fromLang_obj$$[$property$jscomp$5_split_target$$];
    $impl_polyfill$$ = $impl_polyfill$$($i$$);
    $impl_polyfill$$ != $i$$ && null != $impl_polyfill$$ && $jscomp.defineProperty($fromLang_obj$$, $property$jscomp$5_split_target$$, {configurable:!0, writable:!0, value:$impl_polyfill$$});
  }
};
$jscomp.polyfill("Object.is", function($orig$$) {
  return $orig$$ ? $orig$$ : function($left$$, $right$$) {
    return $left$$ === $right$$ ? 0 !== $left$$ || 1 / $left$$ === 1 / $right$$ : $left$$ !== $left$$ && $right$$ !== $right$$;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function($orig$$) {
  return $orig$$ ? $orig$$ : function($searchElement$$, $i$jscomp$5_opt_fromIndex$$) {
    var $array$$ = this;
    $array$$ instanceof String && ($array$$ = String($array$$));
    var $len$$ = $array$$.length;
    $i$jscomp$5_opt_fromIndex$$ = $i$jscomp$5_opt_fromIndex$$ || 0;
    for (0 > $i$jscomp$5_opt_fromIndex$$ && ($i$jscomp$5_opt_fromIndex$$ = Math.max($i$jscomp$5_opt_fromIndex$$ + $len$$, 0)); $i$jscomp$5_opt_fromIndex$$ < $len$$; $i$jscomp$5_opt_fromIndex$$++) {
      var $element$$ = $array$$[$i$jscomp$5_opt_fromIndex$$];
      if ($element$$ === $searchElement$$ || Object.is($element$$, $searchElement$$)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.checkStringArgs = function $$jscomp$checkStringArgs$($thisArg$$, $arg$$, $func$$) {
  if (null == $thisArg$$) {
    throw new TypeError("The 'this' value for String.prototype." + $func$$ + " must not be null or undefined");
  }
  if ($arg$$ instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + $func$$ + " must not be a regular expression");
  }
  return $thisArg$$ + "";
};
$jscomp.polyfill("String.prototype.includes", function($orig$$) {
  return $orig$$ ? $orig$$ : function($searchString$$, $opt_position$$) {
    return -1 !== $jscomp.checkStringArgs(this, $searchString$$, "includes").indexOf($searchString$$, $opt_position$$ || 0);
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.repeat", function($orig$$) {
  return $orig$$ ? $orig$$ : function($copies$$) {
    var $string$$ = $jscomp.checkStringArgs(this, null, "repeat");
    if (0 > $copies$$ || 1342177279 < $copies$$) {
      throw new RangeError("Invalid count value");
    }
    $copies$$ |= 0;
    for (var $result$$ = ""; $copies$$;) {
      if ($copies$$ & 1 && ($result$$ += $string$$), $copies$$ >>>= 1) {
        $string$$ += $string$$;
      }
    }
    return $result$$;
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.codePointAt", function($orig$$) {
  return $orig$$ ? $orig$$ : function($position_second$$) {
    var $string$$ = $jscomp.checkStringArgs(this, null, "codePointAt"), $size$$ = $string$$.length;
    $position_second$$ = Number($position_second$$) || 0;
    if (0 <= $position_second$$ && $position_second$$ < $size$$) {
      $position_second$$ |= 0;
      var $first$$ = $string$$.charCodeAt($position_second$$);
      if (55296 > $first$$ || 56319 < $first$$ || $position_second$$ + 1 === $size$$) {
        return $first$$;
      }
      $position_second$$ = $string$$.charCodeAt($position_second$$ + 1);
      return 56320 > $position_second$$ || 57343 < $position_second$$ ? $first$$ : 1024 * ($first$$ - 55296) + $position_second$$ + 9216;
    }
  };
}, "es6", "es3");
$jscomp.checkEs6ConformanceViaProxy = function $$jscomp$checkEs6ConformanceViaProxy$() {
  try {
    var $proxied$$ = {}, $proxy$$ = Object.create(new $jscomp.global.Proxy($proxied$$, {get:function($target$$, $key$$, $receiver$$) {
      return $target$$ == $proxied$$ && "q" == $key$$ && $receiver$$ == $proxy$$;
    }}));
    return !0 === $proxy$$.q;
  } catch ($err$$) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function $$jscomp$initSymbol$() {
  $jscomp.initSymbol = function $$jscomp$initSymbol$() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var $counter$$ = 0;
  return function Symbol($opt_description$$) {
    return $jscomp.SYMBOL_PREFIX + ($opt_description$$ || "") + $counter$$++;
  };
}();
$jscomp.initSymbolIterator = function $$jscomp$initSymbolIterator$() {
  $jscomp.initSymbol();
  var $symbolIterator$$ = $jscomp.global.Symbol.iterator;
  $symbolIterator$$ || ($symbolIterator$$ = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[$symbolIterator$$] && $jscomp.defineProperty(Array.prototype, $symbolIterator$$, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function $$jscomp$initSymbolIterator$() {
  };
};
$jscomp.initSymbolAsyncIterator = function $$jscomp$initSymbolAsyncIterator$() {
  $jscomp.initSymbol();
  var $symbolAsyncIterator$$ = $jscomp.global.Symbol.asyncIterator;
  $symbolAsyncIterator$$ || ($symbolAsyncIterator$$ = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function $$jscomp$initSymbolAsyncIterator$() {
  };
};
$jscomp.iteratorPrototype = function $$jscomp$iteratorPrototype$($iterator$$) {
  $jscomp.initSymbolIterator();
  $iterator$$ = {next:$iterator$$};
  $iterator$$[$jscomp.global.Symbol.iterator] = function $$iterator$$$$jscomp$global$Symbol$iterator$() {
    return this;
  };
  return $iterator$$;
};
$jscomp.owns = function $$jscomp$owns$($obj$$, $prop$$) {
  return Object.prototype.hasOwnProperty.call($obj$$, $prop$$);
};
$jscomp.polyfill("WeakMap", function($NativeWeakMap$$) {
  function $isConformant$$() {
    if (!$NativeWeakMap$$ || !Object.seal) {
      return !1;
    }
    try {
      var $x$$ = Object.seal({}), $y$$ = Object.seal({}), $map$$ = new $NativeWeakMap$$([[$x$$, 2], [$y$$, 3]]);
      if (2 != $map$$.get($x$$) || 3 != $map$$.get($y$$)) {
        return !1;
      }
      $map$$.delete($x$$);
      $map$$.set($y$$, 4);
      return !$map$$.has($x$$) && 4 == $map$$.get($y$$);
    } catch ($err$$) {
      return !1;
    }
  }
  function $WeakMapMembership$$() {
  }
  function $insert$$($target$$) {
    if (!$jscomp.owns($target$$, $prop$$)) {
      var $obj$$ = new $WeakMapMembership$$;
      $jscomp.defineProperty($target$$, $prop$$, {value:$obj$$});
    }
  }
  function $patch$$($name$$) {
    var $prev$$ = Object[$name$$];
    $prev$$ && (Object[$name$$] = function $Object$$name$$$($target$$) {
      if ($target$$ instanceof $WeakMapMembership$$) {
        return $target$$;
      }
      $insert$$($target$$);
      return $prev$$($target$$);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if ($NativeWeakMap$$ && $jscomp.ES6_CONFORMANCE) {
      return $NativeWeakMap$$;
    }
  } else {
    if ($isConformant$$()) {
      return $NativeWeakMap$$;
    }
  }
  var $prop$$ = "$jscomp_hidden_" + Math.random();
  $patch$$("freeze");
  $patch$$("preventExtensions");
  $patch$$("seal");
  var $index$$ = 0, $PolyfillWeakMap$$ = function $$PolyfillWeakMap$$$($iter_opt_iterable$$) {
    this.id_ = ($index$$ += Math.random() + 1).toString();
    if ($iter_opt_iterable$$) {
      $iter_opt_iterable$$ = $jscomp.makeIterator($iter_opt_iterable$$);
      for (var $entry_item$$; !($entry_item$$ = $iter_opt_iterable$$.next()).done;) {
        $entry_item$$ = $entry_item$$.value, this.set($entry_item$$[0], $entry_item$$[1]);
      }
    }
  };
  $PolyfillWeakMap$$.prototype.set = function $$PolyfillWeakMap$$$$set$($key$$, $value$$) {
    $insert$$($key$$);
    if (!$jscomp.owns($key$$, $prop$$)) {
      throw Error("WeakMap key fail: " + $key$$);
    }
    $key$$[$prop$$][this.id_] = $value$$;
    return this;
  };
  $PolyfillWeakMap$$.prototype.get = function $$PolyfillWeakMap$$$$get$($key$$) {
    return $jscomp.owns($key$$, $prop$$) ? $key$$[$prop$$][this.id_] : void 0;
  };
  $PolyfillWeakMap$$.prototype.has = function $$PolyfillWeakMap$$$$has$($key$$) {
    return $jscomp.owns($key$$, $prop$$) && $jscomp.owns($key$$[$prop$$], this.id_);
  };
  $PolyfillWeakMap$$.prototype.delete = function $$PolyfillWeakMap$$$$delete$($key$$) {
    return $jscomp.owns($key$$, $prop$$) && $jscomp.owns($key$$[$prop$$], this.id_) ? delete $key$$[$prop$$][this.id_] : !1;
  };
  return $PolyfillWeakMap$$;
}, "es6", "es3");
$jscomp.MapEntry = function $$jscomp$MapEntry$() {
};
$jscomp.polyfill("Map", function($NativeMap$$) {
  function $isConformant$$() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !$NativeMap$$ || "function" != typeof $NativeMap$$ || !$NativeMap$$.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var $key$$ = Object.seal({x:4}), $map$$ = new $NativeMap$$($jscomp.makeIterator([[$key$$, "s"]]));
      if ("s" != $map$$.get($key$$) || 1 != $map$$.size || $map$$.get({x:4}) || $map$$.set({x:4}, "t") != $map$$ || 2 != $map$$.size) {
        return !1;
      }
      var $iter$$ = $map$$.entries(), $item$$ = $iter$$.next();
      if ($item$$.done || $item$$.value[0] != $key$$ || "s" != $item$$.value[1]) {
        return !1;
      }
      $item$$ = $iter$$.next();
      return $item$$.done || 4 != $item$$.value[0].x || "t" != $item$$.value[1] || !$iter$$.next().done ? !1 : !0;
    } catch ($err$$) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if ($NativeMap$$ && $jscomp.ES6_CONFORMANCE) {
      return $NativeMap$$;
    }
  } else {
    if ($isConformant$$()) {
      return $NativeMap$$;
    }
  }
  $jscomp.initSymbolIterator();
  var $idMap$$ = new WeakMap, $PolyfillMap$$ = function $$PolyfillMap$$$($iter$jscomp$2_opt_iterable$$) {
    this.data_ = {};
    this.head_ = $createHead$$();
    this.size = 0;
    if ($iter$jscomp$2_opt_iterable$$) {
      $iter$jscomp$2_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$2_opt_iterable$$);
      for (var $entry$jscomp$1_item$$; !($entry$jscomp$1_item$$ = $iter$jscomp$2_opt_iterable$$.next()).done;) {
        $entry$jscomp$1_item$$ = $entry$jscomp$1_item$$.value, this.set($entry$jscomp$1_item$$[0], $entry$jscomp$1_item$$[1]);
      }
    }
  };
  $PolyfillMap$$.prototype.set = function $$PolyfillMap$$$$set$($key$$, $value$$) {
    $key$$ = 0 === $key$$ ? 0 : $key$$;
    var $r$$ = $maybeGetEntry$$(this, $key$$);
    $r$$.list || ($r$$.list = this.data_[$r$$.id] = []);
    $r$$.entry ? $r$$.entry.value = $value$$ : ($r$$.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:$key$$, value:$value$$}, $r$$.list.push($r$$.entry), this.head_.previous.next = $r$$.entry, this.head_.previous = $r$$.entry, this.size++);
    return this;
  };
  $PolyfillMap$$.prototype.delete = function $$PolyfillMap$$$$delete$($key$jscomp$45_r$$) {
    $key$jscomp$45_r$$ = $maybeGetEntry$$(this, $key$jscomp$45_r$$);
    return $key$jscomp$45_r$$.entry && $key$jscomp$45_r$$.list ? ($key$jscomp$45_r$$.list.splice($key$jscomp$45_r$$.index, 1), $key$jscomp$45_r$$.list.length || delete this.data_[$key$jscomp$45_r$$.id], $key$jscomp$45_r$$.entry.previous.next = $key$jscomp$45_r$$.entry.next, $key$jscomp$45_r$$.entry.next.previous = $key$jscomp$45_r$$.entry.previous, $key$jscomp$45_r$$.entry.head = null, this.size--, !0) : !1;
  };
  $PolyfillMap$$.prototype.clear = function $$PolyfillMap$$$$clear$() {
    this.data_ = {};
    this.head_ = this.head_.previous = $createHead$$();
    this.size = 0;
  };
  $PolyfillMap$$.prototype.has = function $$PolyfillMap$$$$has$($key$$) {
    return !!$maybeGetEntry$$(this, $key$$).entry;
  };
  $PolyfillMap$$.prototype.get = function $$PolyfillMap$$$$get$($entry$jscomp$2_key$$) {
    return ($entry$jscomp$2_key$$ = $maybeGetEntry$$(this, $entry$jscomp$2_key$$).entry) && $entry$jscomp$2_key$$.value;
  };
  $PolyfillMap$$.prototype.entries = function $$PolyfillMap$$$$entries$() {
    return $makeIterator$$(this, function($entry$$) {
      return [$entry$$.key, $entry$$.value];
    });
  };
  $PolyfillMap$$.prototype.keys = function $$PolyfillMap$$$$keys$() {
    return $makeIterator$$(this, function($entry$$) {
      return $entry$$.key;
    });
  };
  $PolyfillMap$$.prototype.values = function $$PolyfillMap$$$$values$() {
    return $makeIterator$$(this, function($entry$$) {
      return $entry$$.value;
    });
  };
  $PolyfillMap$$.prototype.forEach = function $$PolyfillMap$$$$forEach$($callback$$, $opt_thisArg$$) {
    for (var $iter$$ = this.entries(), $entry$jscomp$6_item$$; !($entry$jscomp$6_item$$ = $iter$$.next()).done;) {
      $entry$jscomp$6_item$$ = $entry$jscomp$6_item$$.value, $callback$$.call($opt_thisArg$$, $entry$jscomp$6_item$$[1], $entry$jscomp$6_item$$[0], this);
    }
  };
  $PolyfillMap$$.prototype[Symbol.iterator] = $PolyfillMap$$.prototype.entries;
  var $maybeGetEntry$$ = function $$maybeGetEntry$$$($index$jscomp$70_map$$, $key$$) {
    var $id$jscomp$5_id$jscomp$inline_44_type$$ = $key$$ && typeof $key$$;
    "object" == $id$jscomp$5_id$jscomp$inline_44_type$$ || "function" == $id$jscomp$5_id$jscomp$inline_44_type$$ ? $idMap$$.has($key$$) ? $id$jscomp$5_id$jscomp$inline_44_type$$ = $idMap$$.get($key$$) : ($id$jscomp$5_id$jscomp$inline_44_type$$ = "" + ++$mapIndex$$, $idMap$$.set($key$$, $id$jscomp$5_id$jscomp$inline_44_type$$)) : $id$jscomp$5_id$jscomp$inline_44_type$$ = "p_" + $key$$;
    var $list$$ = $index$jscomp$70_map$$.data_[$id$jscomp$5_id$jscomp$inline_44_type$$];
    if ($list$$ && $jscomp.owns($index$jscomp$70_map$$.data_, $id$jscomp$5_id$jscomp$inline_44_type$$)) {
      for ($index$jscomp$70_map$$ = 0; $index$jscomp$70_map$$ < $list$$.length; $index$jscomp$70_map$$++) {
        var $entry$$ = $list$$[$index$jscomp$70_map$$];
        if ($key$$ !== $key$$ && $entry$$.key !== $entry$$.key || $key$$ === $entry$$.key) {
          return {id:$id$jscomp$5_id$jscomp$inline_44_type$$, list:$list$$, index:$index$jscomp$70_map$$, entry:$entry$$};
        }
      }
    }
    return {id:$id$jscomp$5_id$jscomp$inline_44_type$$, list:$list$$, index:-1, entry:void 0};
  }, $makeIterator$$ = function $$makeIterator$$$($map$$, $func$$) {
    var $entry$$ = $map$$.head_;
    return $jscomp.iteratorPrototype(function() {
      if ($entry$$) {
        for (; $entry$$.head != $map$$.head_;) {
          $entry$$ = $entry$$.previous;
        }
        for (; $entry$$.next != $entry$$.head;) {
          return $entry$$ = $entry$$.next, {done:!1, value:$func$$($entry$$)};
        }
        $entry$$ = null;
      }
      return {done:!0, value:void 0};
    });
  }, $createHead$$ = function $$createHead$$$() {
    var $head$$ = {};
    return $head$$.previous = $head$$.next = $head$$.head = $head$$;
  }, $mapIndex$$ = 0;
  return $PolyfillMap$$;
}, "es6", "es3");
$jscomp.polyfill("Set", function($NativeSet$$) {
  function $isConformant$$() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !$NativeSet$$ || "function" != typeof $NativeSet$$ || !$NativeSet$$.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var $value$$ = Object.seal({x:4}), $set$$ = new $NativeSet$$($jscomp.makeIterator([$value$$]));
      if (!$set$$.has($value$$) || 1 != $set$$.size || $set$$.add($value$$) != $set$$ || 1 != $set$$.size || $set$$.add({x:4}) != $set$$ || 2 != $set$$.size) {
        return !1;
      }
      var $iter$$ = $set$$.entries(), $item$$ = $iter$$.next();
      if ($item$$.done || $item$$.value[0] != $value$$ || $item$$.value[1] != $value$$) {
        return !1;
      }
      $item$$ = $iter$$.next();
      return $item$$.done || $item$$.value[0] == $value$$ || 4 != $item$$.value[0].x || $item$$.value[1] != $item$$.value[0] ? !1 : $iter$$.next().done;
    } catch ($err$$) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if ($NativeSet$$ && $jscomp.ES6_CONFORMANCE) {
      return $NativeSet$$;
    }
  } else {
    if ($isConformant$$()) {
      return $NativeSet$$;
    }
  }
  $jscomp.initSymbolIterator();
  var $PolyfillSet$$ = function $$PolyfillSet$$$($iter$jscomp$5_opt_iterable$$) {
    this.map_ = new Map;
    if ($iter$jscomp$5_opt_iterable$$) {
      $iter$jscomp$5_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$5_opt_iterable$$);
      for (var $entry$$; !($entry$$ = $iter$jscomp$5_opt_iterable$$.next()).done;) {
        this.add($entry$$.value);
      }
    }
    this.size = this.map_.size;
  };
  $PolyfillSet$$.prototype.add = function $$PolyfillSet$$$$add$($value$$) {
    $value$$ = 0 === $value$$ ? 0 : $value$$;
    this.map_.set($value$$, $value$$);
    this.size = this.map_.size;
    return this;
  };
  $PolyfillSet$$.prototype.delete = function $$PolyfillSet$$$$delete$($result$jscomp$1_value$$) {
    $result$jscomp$1_value$$ = this.map_.delete($result$jscomp$1_value$$);
    this.size = this.map_.size;
    return $result$jscomp$1_value$$;
  };
  $PolyfillSet$$.prototype.clear = function $$PolyfillSet$$$$clear$() {
    this.map_.clear();
    this.size = 0;
  };
  $PolyfillSet$$.prototype.has = function $$PolyfillSet$$$$has$($value$$) {
    return this.map_.has($value$$);
  };
  $PolyfillSet$$.prototype.entries = function $$PolyfillSet$$$$entries$() {
    return this.map_.entries();
  };
  $PolyfillSet$$.prototype.values = function $$PolyfillSet$$$$values$() {
    return this.map_.values();
  };
  $PolyfillSet$$.prototype.keys = $PolyfillSet$$.prototype.values;
  $PolyfillSet$$.prototype[Symbol.iterator] = $PolyfillSet$$.prototype.values;
  $PolyfillSet$$.prototype.forEach = function $$PolyfillSet$$$$forEach$($callback$$, $opt_thisArg$$) {
    var $set$$ = this;
    this.map_.forEach(function($value$$) {
      return $callback$$.call($opt_thisArg$$, $value$$, $value$$, $set$$);
    });
  };
  return $PolyfillSet$$;
}, "es6", "es3");
$jscomp.polyfill("String.fromCodePoint", function($orig$$) {
  return $orig$$ ? $orig$$ : function($var_args$$) {
    for (var $result$$ = "", $i$$ = 0; $i$$ < arguments.length; $i$$++) {
      var $code$$ = Number(arguments[$i$$]);
      if (0 > $code$$ || 1114111 < $code$$ || $code$$ !== Math.floor($code$$)) {
        throw new RangeError("invalid_code_point " + $code$$);
      }
      65535 >= $code$$ ? $result$$ += String.fromCharCode($code$$) : ($code$$ -= 65536, $result$$ += String.fromCharCode($code$$ >>> 10 & 1023 | 55296), $result$$ += String.fromCharCode($code$$ & 1023 | 56320));
    }
    return $result$$;
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.startsWith", function($orig$$) {
  return $orig$$ ? $orig$$ : function($searchString$$, $i$jscomp$7_opt_position$$) {
    var $string$$ = $jscomp.checkStringArgs(this, $searchString$$, "startsWith");
    $searchString$$ += "";
    var $strLen$$ = $string$$.length, $searchLen$$ = $searchString$$.length;
    $i$jscomp$7_opt_position$$ = Math.max(0, Math.min($i$jscomp$7_opt_position$$ | 0, $string$$.length));
    for (var $j$$ = 0; $j$$ < $searchLen$$ && $i$jscomp$7_opt_position$$ < $strLen$$;) {
      if ($string$$[$i$jscomp$7_opt_position$$++] != $searchString$$[$j$$++]) {
        return !1;
      }
    }
    return $j$$ >= $searchLen$$;
  };
}, "es6", "es3");
var ixmlNS$$module$src$ixmlGrammar = "http://invisiblexml.org/NS", State$$module$src$ixmlGrammar = function $State$$module$src$ixmlGrammar$($name$$, $origin$$, $position$$, $parts$$, $alternate$$, $remarks$$) {
  this.name = $name$$;
  this.ended = $position$$ >= $parts$$.length;
  this.origin = $origin$$;
  this.position = $position$$;
  this.charPos = 0;
  this.parts = $parts$$;
  this.index = 0;
  this.alternate = $alternate$$;
  this.remarks = $remarks$$;
  this.source = this.right = this.left = null;
  this.used = !1;
};
State$$module$src$ixmlGrammar.prototype.cloneNext = function $State$$module$src$ixmlGrammar$$cloneNext$() {
  var $n$$ = new State$$module$src$ixmlGrammar(this.name, this.origin, this.position + 1, this.parts, this.alternate, this.remarks);
  $n$$.charPos = this.charPos;
  return $n$$;
};
State$$module$src$ixmlGrammar.prototype.equals = function $State$$module$src$ixmlGrammar$$equals$($state$$, $position$$) {
  null == $position$$ && ($position$$ = $state$$.position);
  return this.name == $state$$.name && this.alternate == $state$$.alternate && this.position == $position$$ && this.origin == $state$$.origin;
};
State$$module$src$ixmlGrammar.prototype.thisPart = function $State$$module$src$ixmlGrammar$$thisPart$() {
  return this.parts[this.position - 1];
};
State$$module$src$ixmlGrammar.prototype.nextPart = function $State$$module$src$ixmlGrammar$$nextPart$() {
  return this.parts[this.position];
};
State$$module$src$ixmlGrammar.prototype.lastTerminal = function $State$$module$src$ixmlGrammar$$lastTerminal$() {
  var $p$$ = this.thisPart();
  return $p$$ ? $p$$ instanceof Terminal$$module$src$ixmlClasses : !1;
};
State$$module$src$ixmlGrammar.prototype.needsTerminal = function $State$$module$src$ixmlGrammar$$needsTerminal$() {
  return this.parts[this.position] instanceof Terminal$$module$src$ixmlClasses || this.parts[this.position] instanceof Insertion$$module$src$ixmlClasses;
};
State$$module$src$ixmlGrammar.prototype.needsNonTerminal = function $State$$module$src$ixmlGrammar$$needsNonTerminal$() {
  return this.parts[this.position] instanceof NonTerminal$$module$src$ixmlClasses || this.parts[this.position] instanceof Empty$$module$src$ixmlClasses || this.parts[this.position] instanceof Insertion$$module$src$ixmlClasses || "+" == this.parts[this.position].mark;
};
State$$module$src$ixmlGrammar.prototype.matches = function $State$$module$src$ixmlGrammar$$matches$($c$$) {
  var $nextPart$$ = this.parts[this.position];
  return $nextPart$$ instanceof Terminal$$module$src$ixmlClasses && $nextPart$$.matches($c$$);
};
State$$module$src$ixmlGrammar.prototype.requires = function $State$$module$src$ixmlGrammar$$requires$($terms$$) {
  var $nextPart$$ = this.parts[this.position];
  return $nextPart$$ instanceof NonTerminal$$module$src$ixmlClasses && $terms$$.includes($nextPart$$.ref);
};
State$$module$src$ixmlGrammar.prototype.finished = function $State$$module$src$ixmlGrammar$$finished$() {
  return this.position >= this.parts.length;
};
State$$module$src$ixmlGrammar.prototype.setSource = function $State$$module$src$ixmlGrammar$$setSource$($type$$, $local$$, $stateSet$$, $state$$) {
  this.source = new Source$$module$src$ixmlGrammar($type$$, $local$$, $stateSet$$, $state$$);
};
State$$module$src$ixmlGrammar.prototype.display = function $State$$module$src$ixmlGrammar$$display$($indent$$) {
  var $$jscomp$this$$ = this, $s$$ = "(" + this.index + ")" + " ".repeat(void 0 === $indent$$ ? 0 : $indent$$);
  $s$$ += this.name + "\u2192";
  this.parts.forEach(function($p$$, $i$$) {
    $s$$ += ($i$$ == $$jscomp$this$$.position ? "\u2022" : "") + $p$$.display() + ($i$$ < $$jscomp$this$$.parts.length - 1 ? "," : "");
  });
  this.position >= this.parts.length && ($s$$ += "\u2022");
  return $s$$;
};
State$$module$src$ixmlGrammar.prototype.toXML = function $State$$module$src$ixmlGrammar$$toXML$($parent$$, $stateNo_tr$$) {
  $stateNo_tr$$ = $parent$$.ownerDocument.createElement("tr");
  this.used && $stateNo_tr$$.setAttribute("class", "used");
  0 == this.origin && this.finished() && $stateNo_tr$$.setAttribute("class", this.used ? "finished used" : "finished");
  $parent$$.append($stateNo_tr$$);
  var $td$$ = $parent$$.ownerDocument.createElement("td");
  $td$$.append(new Text("" + this.index));
  $stateNo_tr$$.append($td$$);
  $td$$ = $parent$$.ownerDocument.createElement("td");
  $td$$.append(new Text(this.alternate));
  $stateNo_tr$$.append($td$$);
  $td$$ = $parent$$.ownerDocument.createElement("td");
  $td$$.append(new Text("" + this.charPos));
  $stateNo_tr$$.append($td$$);
  $td$$ = $parent$$.ownerDocument.createElement("td");
  $td$$.append(new Text(this.display()));
  $stateNo_tr$$.append($td$$);
  $td$$ = $parent$$.ownerDocument.createElement("td");
  $td$$.append(new Text(this.origin));
  $stateNo_tr$$.append($td$$);
  $td$$ = $parent$$.ownerDocument.createElement("td");
  $td$$.setAttribute("class", "description");
  this.source ? $td$$.append(new Text(this.source.display())) : $td$$.append(new Text(this.remarks));
  $stateNo_tr$$.append($td$$);
  $td$$ = $parent$$.ownerDocument.createElement("td");
  var $pre$$ = $parent$$.ownerDocument.createElement("pre");
  $pre$$.setAttribute("class", "description sppf");
  this.left && $pre$$.append(new Text(this.left.display()));
  $td$$.append($pre$$);
  $stateNo_tr$$.append($td$$);
  $td$$ = $parent$$.ownerDocument.createElement("td");
  $pre$$ = $parent$$.ownerDocument.createElement("pre");
  $pre$$.setAttribute("class", "description sppf");
  this.right && $pre$$.append(new Text(this.right.display()));
  $td$$.append($pre$$);
  $stateNo_tr$$.append($td$$);
  return $stateNo_tr$$;
};
State$$module$src$ixmlGrammar.prototype.textValueOf = function $State$$module$src$ixmlGrammar$$textValueOf$($input$$) {
  if (this.needsTerminal()) {
    return $input$$[this.charPos];
  }
  var $result$$ = "";
  this.left && ($result$$ += this.left.textValueOf($input$$));
  this.right && ($result$$ += this.right.textValueOf($input$$));
  return $result$$;
};
State$$module$src$ixmlGrammar.prototype.bottomUp = function $State$$module$src$ixmlGrammar$$bottomUp$($doc$$, $productions$$, $input$$, $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$, $justOne$$, $suppressMarks$$) {
  function $thread$$($branch$$, $mark$$) {
    return $branch$$ ? $branch$$.bottomUp($doc$$, $productions$$, $input$$, $mark$$, $justOne$$, $suppressMarks$$) : [];
  }
  function $validXMLText$$($s$$) {
    for (var $$jscomp$iter$0$$ = $jscomp.makeIterator([].concat($jscomp.arrayFromIterable($s$$))), $$jscomp$key$c_i$$ = $$jscomp$iter$0$$.next(); !$$jscomp$key$c_i$$.done; $$jscomp$key$c_i$$ = $$jscomp$iter$0$$.next()) {
      $$jscomp$key$c_i$$ = $$jscomp$key$c_i$$.value.codePointAt(0), (32 > $$jscomp$key$c_i$$ && ![9, 10, 13].includes($$jscomp$key$c_i$$) || 55295 < $$jscomp$key$c_i$$ && 57344 > $$jscomp$key$c_i$$ || 65533 < $$jscomp$key$c_i$$ && 65536 > $$jscomp$key$c_i$$ || 1114111 < $$jscomp$key$c_i$$) && grumble$$module$src$ixmlParse("Character codepoint " + $$jscomp$key$c_i$$ + " in '" + $s$$ + "' is not a valid XML character", "D04");
    }
  }
  var $$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ = this.charPos, $$jscomp$iter$1_originalMark_refMark$$ = this.thisPart() ? this.thisPart().mark : null, $left$$ = $thread$$(this.left, $$jscomp$iter$1_originalMark_refMark$$), $right$$ = $thread$$(this.right, $$jscomp$iter$1_originalMark_refMark$$);
  if (this.finished()) {
    $$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ = this.name;
    $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ || ($$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ = $productions$$.get($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$).mark);
    $$jscomp$iter$1_originalMark_refMark$$ = null;
    $suppressMarks$$ && !$productions$$.get($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$).artifact && ($$jscomp$iter$1_originalMark_refMark$$ = $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$, $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ = "^");
    $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ || ($$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ = "^");
    switch($$jscomp$iter$2_innerMark_mark_newLeft_value$25$$) {
      case "^":
        (new RegExp(/\w(\w|-)*/, "u")).test($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$) || grumble$$module$src$ixmlParse("'" + $$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ + "' is not a valid name for an XML element", "D03");
        var $newNode$$ = $doc$$.createElement($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$);
        $$jscomp$iter$1_originalMark_refMark$$ && $newNode$$.setAttributeNS(ixmlNS$$module$src$ixmlGrammar, "ixml:mark", $$jscomp$iter$1_originalMark_refMark$$);
        break;
      case "@":
        "xmlns" == $$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ && grumble$$module$src$ixmlParse("'xmlns' is not a valid name for an attribute", "D07");
        $newNode$$ = $doc$$.createAttribute($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$);
        var $s$jscomp$0$$ = "";
        $left$$.forEach(function($t$$) {
          return $s$jscomp$0$$ += $t$$.textContent;
        });
        $right$$.forEach(function($t$$) {
          return $s$jscomp$0$$ += $t$$.textContent;
        });
        $newNode$$.value = $s$jscomp$0$$;
        break;
      case "+":
        $$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ = this.thisPart().value, $validXMLText$$($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$), $newNode$$ = new Text($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$);
    }
    if ($left$$ instanceof Ambiguity$$module$src$ixmlGrammar) {
      var $ambig$$ = new Ambiguity$$module$src$ixmlGrammar;
      if ("-" == $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$) {
        $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ = $jscomp.makeIterator($left$$.parts);
        for ($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ = $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$.next(); !$$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$.done; $$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ = $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$.next()) {
          if ($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ = $$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$.value, $right$$ instanceof Ambiguity$$module$src$ixmlGrammar) {
            $$jscomp$iter$1_originalMark_refMark$$ = $jscomp.makeIterator($right$$.parts);
            for (var $$jscomp$key$r$$ = $$jscomp$iter$1_originalMark_refMark$$.next(); !$$jscomp$key$r$$.done; $$jscomp$key$r$$ = $$jscomp$iter$1_originalMark_refMark$$.next()) {
              $ambig$$.add($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$.concat($$jscomp$key$r$$.value));
            }
          } else {
            $ambig$$.add($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$.concat(partsOf$$module$src$ixmlGrammar($right$$)));
          }
        }
        return $ambig$$;
      }
      $left$$.parts.forEach(function($p$$) {
        var $$jscomp$key$r$jscomp$1_n$$ = $newNode$$.cloneNode();
        if ($$jscomp$key$r$jscomp$1_n$$ instanceof Element) {
          if ($right$$ instanceof Ambiguity$$module$src$ixmlGrammar) {
            var $$jscomp$iter$3$$ = $jscomp.makeIterator($right$$.parts);
            for ($$jscomp$key$r$jscomp$1_n$$ = $$jscomp$iter$3$$.next(); !$$jscomp$key$r$jscomp$1_n$$.done; $$jscomp$key$r$jscomp$1_n$$ = $$jscomp$iter$3$$.next()) {
              var $r$24$$ = $$jscomp$key$r$jscomp$1_n$$.value;
              $$jscomp$key$r$jscomp$1_n$$ = $newNode$$.cloneNode();
              addNodes$$module$src$ixmlGrammar($p$$, $$jscomp$key$r$jscomp$1_n$$, !0);
              addNodes$$module$src$ixmlGrammar($r$24$$, $$jscomp$key$r$jscomp$1_n$$, !0);
              $ambig$$.add([$$jscomp$key$r$jscomp$1_n$$]);
            }
          } else {
            addNodes$$module$src$ixmlGrammar($p$$, $$jscomp$key$r$jscomp$1_n$$, !0), addNodes$$module$src$ixmlGrammar($right$$, $$jscomp$key$r$jscomp$1_n$$, !0), $ambig$$.add([$$jscomp$key$r$jscomp$1_n$$]);
          }
        } else {
          $ambig$$.add($p$$.concat([$$jscomp$key$r$jscomp$1_n$$], partsOf$$module$src$ixmlGrammar($right$$)));
        }
      });
      return $ambig$$;
    }
    if ($right$$ instanceof Ambiguity$$module$src$ixmlGrammar) {
      $ambig$$ = new Ambiguity$$module$src$ixmlGrammar;
      if ("-" == $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$) {
        return $right$$.parts.forEach(function($p$$) {
          return $ambig$$.add(partsOf$$module$src$ixmlGrammar($left$$).concat($p$$));
        }), $ambig$$;
      }
      $right$$.parts.forEach(function($p$$) {
        var $n$$ = $newNode$$.cloneNode();
        if ($n$$ instanceof Element) {
          var $posA$$ = [];
          $p$$.forEach(function($x$$, $index$$) {
            Array.isArray($x$$) && $posA$$.push($index$$);
          });
          var $nA$$ = $posA$$.length;
          if (0 < $nA$$) {
            for (var $$jscomp$loop$31$$ = {$jscomp$loop$prop$i$32:0}; $$jscomp$loop$31$$.$jscomp$loop$prop$i$32 < $nA$$; $$jscomp$loop$31$$ = {$jscomp$loop$prop$i$32:$$jscomp$loop$31$$.$jscomp$loop$prop$i$32}, $$jscomp$loop$31$$.$jscomp$loop$prop$i$32++) {
              $n$$ = $newNode$$.cloneNode(), addNodes$$module$src$ixmlGrammar($left$$, $n$$, !0), $p$$.forEach(function($$jscomp$loop$31$$) {
                return function($x$$, $index$$) {
                  Array.isArray($x$$) && $posA$$[$$jscomp$loop$31$$.$jscomp$loop$prop$i$32] != $index$$ || addNodes$$module$src$ixmlGrammar($x$$, $n$$, !0);
                };
              }($$jscomp$loop$31$$)), $ambig$$.add([$n$$]);
            }
          } else {
            addNodes$$module$src$ixmlGrammar($left$$, $n$$, !0), addNodes$$module$src$ixmlGrammar($p$$, $n$$, !0), $ambig$$.add([$n$$]);
          }
        } else {
          $ambig$$.add(partsOf$$module$src$ixmlGrammar($left$$).concat([$n$$], $p$$));
        }
      });
      return $ambig$$;
    }
    switch($$jscomp$iter$2_innerMark_mark_newLeft_value$25$$) {
      case "^":
        return addNodes$$module$src$ixmlGrammar($left$$, $newNode$$), addNodes$$module$src$ixmlGrammar($right$$, $newNode$$), [$newNode$$];
      case "-":
        return $left$$.concat($right$$);
      default:
        return [$newNode$$];
    }
  } else {
    var $term$$ = [];
    this.needsTerminal() && ($$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ = this.nextPart() ? this.nextPart().mark ? this.nextPart().mark : "^" : "-", this.nextPart() instanceof Insertion$$module$src$ixmlClasses ? ($$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ = this.nextPart().value, $validXMLText$$($$jscomp$iter$2_innerMark_mark_newLeft_value$25$$), $suppressMarks$$ ? ($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$ = $doc$$.createElementNS(ixmlNS$$module$src$ixmlGrammar, 
    "ixml:insertion"), $$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$.setAttribute("string", $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$), $term$$.push($$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$)) : $term$$.push(new Text($$jscomp$iter$2_innerMark_mark_newLeft_value$25$$))) : "^" == $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ && $term$$.push(new Text($input$$[$$jscomp$key$p_characterPos_name$jscomp$71_p$26_p$jscomp$3_value$$])));
    if ($right$$ instanceof Ambiguity$$module$src$ixmlGrammar) {
      return $ambig$$ = new Ambiguity$$module$src$ixmlGrammar, $right$$.parts.forEach(function($p$$) {
        return $ambig$$.add(partsOf$$module$src$ixmlGrammar($left$$).concat($term$$, $p$$));
      }), $ambig$$;
    }
    if ($left$$ instanceof Ambiguity$$module$src$ixmlGrammar) {
      return $ambig$$ = new Ambiguity$$module$src$ixmlGrammar, $left$$.parts.forEach(function($p$$) {
        return $ambig$$.add($p$$.concat(partsOf$$module$src$ixmlGrammar($right$$), $term$$));
      }), $ambig$$;
    }
    $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$ = $left$$.concat($right$$);
    if ($term$$[0] instanceof Text && $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$.at(-1) instanceof Text) {
      $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$.at(-1).textContent += $term$$[0].textContent;
    } else {
      return $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$.concat($term$$);
    }
    return $$jscomp$iter$2_innerMark_mark_newLeft_value$25$$;
  }
};
var Derivation$$module$src$ixmlGrammar = function $Derivation$$module$src$ixmlGrammar$($left$$, $right$$, $next$$) {
  this.left = $left$$;
  this.right = $right$$;
  this.next = $next$$;
};
Derivation$$module$src$ixmlGrammar.prototype.display = function $Derivation$$module$src$ixmlGrammar$$display$($indent$$) {
  $indent$$ = void 0 === $indent$$ ? 0 : $indent$$;
  var $s$$ = " ".repeat($indent$$);
  $s$$ += "DER:";
  this.left && ($s$$ += this.left.display(), $s$$ += "\n");
  this.right && ($s$$ += this.right.display($indent$$ + 4), $s$$ += "\n");
  this.next && ($s$$ += " ".repeat($indent$$) + "|OR|" + this.next.display($indent$$ + 4));
  return $s$$;
};
Derivation$$module$src$ixmlGrammar.prototype.bottomUp = function $Derivation$$module$src$ixmlGrammar$$bottomUp$($doc$$, $productions$$, $input$$, $left$jscomp$5_mark$$, $justOne$$, $suppressMarks$$) {
  $left$jscomp$5_mark$$ = this.left.bottomUp($doc$$, $productions$$, $input$$, null, $justOne$$, $suppressMarks$$);
  var $right$$ = this.right.bottomUp($doc$$, $productions$$, $input$$, null, $justOne$$, $suppressMarks$$);
  if (this.next) {
    var $ambig$$ = new Ambiguity$$module$src$ixmlGrammar;
    $ambig$$.add(partsOf$$module$src$ixmlGrammar($left$jscomp$5_mark$$).concat(partsOf$$module$src$ixmlGrammar($right$$)));
    if ($justOne$$) {
      return $ambig$$;
    }
    $doc$$ = this.next.bottomUp($doc$$, $productions$$, $input$$, null, !1, $suppressMarks$$);
    $doc$$ instanceof Ambiguity$$module$src$ixmlGrammar ? $doc$$.parts.forEach(function($p$$) {
      return $ambig$$.add($p$$);
    }) : $ambig$$.add($doc$$);
    return $ambig$$;
  }
  return $right$$ instanceof Ambiguity$$module$src$ixmlGrammar ? $right$$ : $left$jscomp$5_mark$$ instanceof Ambiguity$$module$src$ixmlGrammar ? $left$jscomp$5_mark$$ : $left$jscomp$5_mark$$.concat($right$$);
};
function partsOf$$module$src$ixmlGrammar($input$$) {
  return $input$$ instanceof Ambiguity$$module$src$ixmlGrammar ? $input$$.parts : $input$$;
}
var Ambiguity$$module$src$ixmlGrammar = function $Ambiguity$$module$src$ixmlGrammar$() {
  this.parts = [];
};
Ambiguity$$module$src$ixmlGrammar.prototype.add = function $Ambiguity$$module$src$ixmlGrammar$$add$($part$$) {
  this.parts.push($part$$);
};
function addNodes$$module$src$ixmlGrammar($nodes$$, $parent$$, $clone$$) {
  $clone$$ = void 0 === $clone$$ ? !1 : $clone$$;
  if (!Array.isArray($nodes$$)) {
    return addNode$$module$src$ixmlGrammar($nodes$$, $parent$$, $clone$$);
  }
  $nodes$$.forEach(function($n$$) {
    return addNode$$module$src$ixmlGrammar($n$$, $parent$$, $clone$$);
  });
}
function addNode$$module$src$ixmlGrammar($last_node$$, $parent$$, $clone$jscomp$1_n$$) {
  $clone$jscomp$1_n$$ = (void 0 === $clone$jscomp$1_n$$ ? 0 : $clone$jscomp$1_n$$) ? $last_node$$.cloneNode(!0) : $last_node$$;
  $clone$jscomp$1_n$$ instanceof Attr ? ($parent$$.hasAttribute($last_node$$.name) && grumble$$module$src$ixmlParse("Attempt to overwrite an existing attribute @" + $clone$jscomp$1_n$$.name + " on element " + $parent$$.localName, "D02"), $parent$$.setAttributeNode($clone$jscomp$1_n$$)) : $clone$jscomp$1_n$$ instanceof Text ? ($last_node$$ = $parent$$.lastChild, $last_node$$ instanceof Text ? $last_node$$.textContent += $clone$jscomp$1_n$$.textContent : 0 < $clone$jscomp$1_n$$.textContent.length && 
  $parent$$.append($clone$jscomp$1_n$$)) : $parent$$.append($clone$jscomp$1_n$$);
}
function addDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$) {
  if ($left$$ || $right$$) {
    $item$$.left || $item$$.right ? $item$$.right ? addSecondDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$) : addAnotherDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$) : setDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$);
  }
}
function setDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$) {
  $item$$.left = $left$$;
  $item$$.right = $right$$;
}
function sameDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$) {
  return $item$$.left.equals($left$$) && $item$$.right.equals($right$$);
}
function addSecondDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$) {
  if (!sameDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$)) {
    var $old$$ = new Derivation$$module$src$ixmlGrammar($item$$.left, $item$$.right, null);
    $item$$.left = new Derivation$$module$src$ixmlGrammar($left$$, $right$$, $old$$);
    $item$$.right = null;
  }
}
function addAnotherDerivation$$module$src$ixmlGrammar($item$$, $left$$, $right$$) {
  for (var $d$$ = $item$$.left; $d$$;) {
    if (sameDerivation$$module$src$ixmlGrammar($d$$, $left$$, $right$$)) {
      return;
    }
    $d$$ = $d$$.next;
  }
  $item$$.left = new Derivation$$module$src$ixmlGrammar($left$$, $right$$, $item$$.left);
}
var Source$$module$src$ixmlGrammar = function $Source$$module$src$ixmlGrammar$($type$$, $local$$, $stateSet$$, $state$$) {
  this.type = $type$$;
  this.local = $local$$;
  this.stateSet = $stateSet$$;
  this.state = $state$$;
};
Source$$module$src$ixmlGrammar.prototype.display = function $Source$$module$src$ixmlGrammar$$display$() {
  var $s$$ = this.type + " from ";
  null != this.local && ($s$$ += "(" + this.local + ")");
  null != this.stateSet && (null != this.local && ($s$$ += " and "), $s$$ += "S(" + this.stateSet + ")(" + this.state + ") ");
  return $s$$;
};
var StateSet$$module$src$ixmlGrammar = function $StateSet$$module$src$ixmlGrammar$($input$$, $stateNo$$, $grammar$$) {
  this.states = [];
  this.input = $input$$;
  this.stateNo = $stateNo$$;
  this.grammar = $grammar$$;
  this.productions = $grammar$$.productions;
  this.reasons = [];
  this.known = new Map;
  this.queue = [];
};
StateSet$$module$src$ixmlGrammar.prototype.add = function $StateSet$$module$src$ixmlGrammar$$add$($state$$) {
  this.states.push($state$$);
  $state$$.index = this.states.length;
};
StateSet$$module$src$ixmlGrammar.prototype.hasStateNext = function $StateSet$$module$src$ixmlGrammar$$hasStateNext$($state$$) {
  return this.states.some(function($s$$) {
    return $s$$.equals($state$$, $s$$.position + 1);
  });
};
StateSet$$module$src$ixmlGrammar.prototype.hasState = function $StateSet$$module$src$ixmlGrammar$$hasState$($state$$) {
  return this.states.some(function($s$$) {
    return $s$$.equals($state$$);
  });
};
StateSet$$module$src$ixmlGrammar.prototype.foundState = function $StateSet$$module$src$ixmlGrammar$$foundState$($state$$) {
  return this.states.filter(function($s$$) {
    return $s$$.equals($state$$);
  })[0];
};
StateSet$$module$src$ixmlGrammar.prototype.findCompletedStates = function $StateSet$$module$src$ixmlGrammar$$findCompletedStates$($name$$, $origin$$) {
  return this.states.filter(function($s$$) {
    return $s$$.name == $name$$ && $s$$.ended && $s$$.origin == $origin$$;
  });
};
StateSet$$module$src$ixmlGrammar.prototype.cloneNext = function $StateSet$$module$src$ixmlGrammar$$cloneNext$() {
  return new StateSet$$module$src$ixmlGrammar(this.input, this.stateNo + 1, this.grammar);
};
StateSet$$module$src$ixmlGrammar.prototype.initialise = function $StateSet$$module$src$ixmlGrammar$$initialise$($start$$) {
  var $$jscomp$this$$ = this, $starts$$ = this.productions.get($start$$).definition.parts.map(function($p$$, $index$$) {
    return new State$$module$src$ixmlGrammar($start$$, 0, 0, $p$$.parts, $index$$, "start rule");
  });
  $starts$$.forEach(function($s$$) {
    return $$jscomp$this$$.add($s$$);
  });
  this.knowState($start$$, 0);
  $starts$$.forEach(function($s$$) {
    return $$jscomp$this$$.queue.push($s$$);
  });
};
StateSet$$module$src$ixmlGrammar.prototype.knowState = function $StateSet$$module$src$ixmlGrammar$$knowState$($name$$, $origin$$) {
  if (this.known.has($name$$)) {
    this.known.get($name$$).add($origin$$);
  } else {
    var $origins$$ = new Set;
    $origins$$.add($origin$$);
    this.known.set($name$$, $origins$$);
  }
};
StateSet$$module$src$ixmlGrammar.prototype.stateKnown = function $StateSet$$module$src$ixmlGrammar$$stateKnown$($name$$, $origin$$) {
  return this.known.has($name$$) ? this.known.get($name$$).has($origin$$) : !1;
};
StateSet$$module$src$ixmlGrammar.prototype.process = function $StateSet$$module$src$ixmlGrammar$$process$() {
  if (0 == this.queue.length) {
    return !1;
  }
  var $n$$ = this.queue.shift();
  $n$$.finished() ? this.completeOne($n$$, this.stateNo, 0) : $n$$.needsNonTerminal() && this.predictOne($n$$, this.stateNo, 0, 0);
  return !0;
};
StateSet$$module$src$ixmlGrammar.prototype.completes = function $StateSet$$module$src$ixmlGrammar$$completes$($start$$) {
  for (var $completions$$ = [], $$jscomp$iter$4$$ = $jscomp.makeIterator(this.states), $$jscomp$key$s_s$$ = $$jscomp$iter$4$$.next(); !$$jscomp$key$s_s$$.done; $$jscomp$key$s_s$$ = $$jscomp$iter$4$$.next()) {
    $$jscomp$key$s_s$$ = $$jscomp$key$s_s$$.value, $$jscomp$key$s_s$$.name == $start$$ && $$jscomp$key$s_s$$.finished() && 0 == $$jscomp$key$s_s$$.origin && $completions$$.push($$jscomp$key$s_s$$);
  }
  return $completions$$;
};
StateSet$$module$src$ixmlGrammar.prototype.needsTerminals = function $StateSet$$module$src$ixmlGrammar$$needsTerminals$() {
  return this.states.filter(function($s$$) {
    return $s$$.needsTerminal();
  });
};
StateSet$$module$src$ixmlGrammar.prototype.predictOne = function $StateSet$$module$src$ixmlGrammar$$predictOne$($state$$, $origin$$, $completedStates_nP_pos$$, $offset$$) {
  var $$jscomp$this$$ = this;
  $completedStates_nP_pos$$ = $state$$.nextPart();
  if ($completedStates_nP_pos$$ instanceof Empty$$module$src$ixmlClasses || $completedStates_nP_pos$$ instanceof Insertion$$module$src$ixmlClasses || "+" == $completedStates_nP_pos$$.mark) {
    var $z$$ = $state$$.cloneNext();
    $z$$.charPos = $state$$.charPos;
    $z$$.setSource("predict", $state$$.index, null, null);
    if ($z$$.finished() || "+" == $completedStates_nP_pos$$.mark || $completedStates_nP_pos$$ instanceof Insertion$$module$src$ixmlClasses) {
      $z$$.setSource("predict/complete", $state$$.index, null, null), addDerivation$$module$src$ixmlGrammar($z$$, $state$$, null);
    }
    this.hasState($z$$) || (this.add($z$$), this.queue.push($z$$));
  } else {
    if ($completedStates_nP_pos$$ instanceof NonTerminal$$module$src$ixmlClasses) {
      var $n$$ = $completedStates_nP_pos$$.ref;
      this.stateKnown($n$$, $state$$.origin) ? $n$$ == $state$$.name && $origin$$ == $state$$.origin ? grumble$$module$src$ixmlParse("Infinite ambiguity with production: " + $state$$.name) : ($completedStates_nP_pos$$ = this.findCompletedStates($n$$, $state$$.origin), 0 == $completedStates_nP_pos$$.length && ($completedStates_nP_pos$$ = this.findCompletedStates($n$$, $origin$$).filter(function($s$$) {
        return $s$$.thisPart() instanceof Insertion$$module$src$ixmlClasses;
      })), $completedStates_nP_pos$$.forEach(function($s$$) {
        $z$$ = $state$$.cloneNext();
        $z$$.charPos = $state$$.charPos;
        $z$$.setSource("predict/complete", $state$$.index, $s$$.origin, $s$$.index);
        addDerivation$$module$src$ixmlGrammar($z$$, $state$$, $s$$);
        $$jscomp$this$$.add($z$$);
        $$jscomp$this$$.queue.push($z$$);
      })) : (this.knowState($n$$, $state$$.origin), this.productions.get($n$$).definition.parts.forEach(function($p$$, $index$$) {
        $z$$ = new State$$module$src$ixmlGrammar($n$$, $origin$$, 0, $p$$.parts, $index$$, "predict from (" + $state$$.index + ")");
        $z$$.charPos = $state$$.charPos;
        $z$$.setSource("predict", $state$$.index, null, null);
        $index$$ = $z$$.nextPart();
        if ($z$$.finished() || $index$$ instanceof Alts$$module$src$ixmlClasses) {
          $z$$ = $z$$.cloneNext(), $z$$.charPos = $state$$.charPos, $z$$.setSource("predict/complete", $state$$.index, null, null), $index$$ instanceof Alts$$module$src$ixmlClasses || $p$$ instanceof Alt$$module$src$ixmlClasses || $p$$ instanceof NonTerminal$$module$src$ixmlClasses || addDerivation$$module$src$ixmlGrammar($z$$, $state$$, null);
        }
        $$jscomp$this$$.hasState($z$$) ? ($z$$.index = -$$jscomp$this$$.foundState($state$$).index, $z$$.setSource("Known state predict", -$state$$.index, null, null)) : $$jscomp$this$$.add($z$$);
        $$jscomp$this$$.queue.push($z$$);
      }));
    }
  }
};
StateSet$$module$src$ixmlGrammar.prototype.completeOne = function $StateSet$$module$src$ixmlGrammar$$completeOne$($state$$, $position$$, $loops$$) {
  var $$jscomp$this$$ = this, $available$$ = $state$$.name;
  this.grammar.stateSets[$state$$.origin].states.forEach(function($s$$) {
    if ($s$$.requires([$available$$], $position$$) && !$$jscomp$this$$.hasStateNext($s$$)) {
      var $n$$ = $s$$.cloneNext();
      $n$$.charPos = $state$$.charPos;
      $n$$.setSource("complete", $state$$.index, $state$$.origin, $s$$.index);
      $$jscomp$this$$.hasState($n$$) ? addDerivation$$module$src$ixmlGrammar($$jscomp$this$$.foundState($n$$), $s$$, $state$$) : ($$jscomp$this$$.add($n$$), addDerivation$$module$src$ixmlGrammar($n$$, $s$$, $state$$));
      $$jscomp$this$$.queue.push($n$$);
    }
  });
};
StateSet$$module$src$ixmlGrammar.prototype.scanOne = function $StateSet$$module$src$ixmlGrammar$$scanOne$($position$$, $character$$, $previous$$) {
  var $$jscomp$this$$ = this, $scanned$$ = !1;
  $previous$$.states.forEach(function($s$$, $index$$) {
    if ($s$$.matches($character$$)) {
      $scanned$$ = !0;
      var $n$$ = $s$$.cloneNext();
      $s$$.charPos = $position$$;
      $n$$.charPos = $position$$;
      $n$$.setSource("scanned", null, $previous$$.stateNo, $index$$ + 1);
      addDerivation$$module$src$ixmlGrammar($n$$, $s$$, null);
      $$jscomp$this$$.add($n$$);
      $$jscomp$this$$.queue.push($n$$);
    }
  });
  return $scanned$$;
};
StateSet$$module$src$ixmlGrammar.prototype.display = function $StateSet$$module$src$ixmlGrammar$$display$() {
  var $output$$ = document.implementation.createDocument("", "", null);
  this.toXML($output$$);
  return $output$$;
};
StateSet$$module$src$ixmlGrammar.prototype.showDot = function $StateSet$$module$src$ixmlGrammar$$showDot$() {
  return 40 < this.input.length ? "" : this.input.slice(0, this.stateNo).join("") + "\u2022" + this.input.slice(this.stateNo).join("");
};
StateSet$$module$src$ixmlGrammar.prototype.toXML = function $StateSet$$module$src$ixmlGrammar$$toXML$($output$$) {
  var $$jscomp$this$$ = this, $table$$ = $output$$.createElement("table");
  $output$$.append($table$$);
  var $td$$ = $output$$.createElement("thead");
  $table$$.append($td$$);
  var $st_tr$$ = $output$$.createElement("tr");
  $td$$.append($st_tr$$);
  var $th$$ = $output$$.createElement("th");
  $th$$.setAttribute("colspan", "5");
  $th$$.setAttribute("class", "stateSpace");
  $st_tr$$.append($th$$);
  $st_tr$$ = "S(" + this.stateNo + "): " + this.showDot();
  if (0 < this.stateNo) {
    var $cP$$ = this.input[this.stateNo - 1].codePointAt(0);
    $st_tr$$ += " char '" + this.input[this.stateNo - 1] + "' (codepoint " + $cP$$ + ",#" + (new Number($cP$$)).toString(16) + ")";
  }
  $th$$.append(new Text($st_tr$$));
  $st_tr$$ = $output$$.createElement("tr");
  $td$$.append($st_tr$$);
  $td$$ = $output$$.createElement("td");
  $td$$.setAttribute("colspan", "3");
  $st_tr$$.append($td$$);
  var $tbody$$ = $output$$.createElement("tbody");
  $table$$.append($tbody$$);
  this.states.forEach(function($s$$) {
    return $s$$.toXML($tbody$$, $$jscomp$this$$.stateNo);
  });
};
var Grammar$$module$src$ixmlGrammar = function $Grammar$$module$src$ixmlGrammar$($parts$$) {
  var $$jscomp$this$$ = this;
  this.version = 1.0;
  this.parts = [];
  this.rules = [];
  this.start = null;
  this.productions = new Map;
  $parts$$.forEach(function($p$$) {
    $p$$ instanceof Rule$$module$src$ixmlClasses ? $$jscomp$this$$.addRule($p$$) : ($$jscomp$this$$.parts.push($p$$), $p$$ instanceof Prolog$$module$src$ixmlClasses && $p$$.version && ($$jscomp$this$$.version = $p$$.version.version));
  });
  this.stateSets = [];
  this.input = null;
  this.lines = [];
  this.options = {};
  this.compiled = !1;
  this.parseTime = this.compileTime = null;
};
Grammar$$module$src$ixmlGrammar.prototype.addRule = function $Grammar$$module$src$ixmlGrammar$$addRule$($rule$$) {
  this.productions.has($rule$$.name) && grumble$$module$src$ixmlParse("Adding productions for an already-defined non-terminal: " + $rule$$.name, "S03");
  this.rules.push($rule$$);
  this.parts.push($rule$$);
  this.productions.set($rule$$.name, $rule$$);
};
Grammar$$module$src$ixmlGrammar.prototype.setOption = function $Grammar$$module$src$ixmlGrammar$$setOption$($opt$$, $value$$) {
  this.options[$opt$$] = $value$$;
};
Grammar$$module$src$ixmlGrammar.prototype.requires = function $Grammar$$module$src$ixmlGrammar$$requires$($rule$$, $known$$) {
  var $refs$$ = [];
  $rule$$.visit(function($x$$) {
    $x$$.ref && !$known$$.has($x$$.ref) && ($known$$.add($x$$.ref), $refs$$.push($x$$.ref));
  });
  return $refs$$;
};
Grammar$$module$src$ixmlGrammar.prototype.check = function $Grammar$$module$src$ixmlGrammar$$check$() {
  this.start = this.rules[0].name;
  var $defined$$ = new Set;
  this.rules.forEach(function($r$$) {
    return $defined$$.add($r$$.name);
  });
  for (var $notDefined_refs$$ = new Set, $$jscomp$iter$5$$ = $jscomp.makeIterator(this.rules), $$jscomp$key$r$$ = $$jscomp$iter$5$$.next(); !$$jscomp$key$r$$.done; $$jscomp$key$r$$ = $$jscomp$iter$5$$.next()) {
    this.requires($$jscomp$key$r$$.value, $notDefined_refs$$);
  }
  $notDefined_refs$$ = new Set([].concat($jscomp.arrayFromIterable($notDefined_refs$$)).filter(function($x$$) {
    return !$defined$$.has($x$$);
  }));
  0 < $notDefined_refs$$.size && grumble$$module$src$ixmlParse("No production rules for non-terminals: " + [].concat($jscomp.arrayFromIterable($notDefined_refs$$)).join(","), "S02");
  if (this.options.unreachable) {
    var $reachable$$ = this.reachable();
    $notDefined_refs$$ = new Set([].concat($jscomp.arrayFromIterable($defined$$)).filter(function($x$$) {
      return !$reachable$$.has($x$$);
    }));
    0 < $notDefined_refs$$.size && grumble$$module$src$ixmlParse("Unreachable production rules for non-terminals: " + [].concat($jscomp.arrayFromIterable($notDefined_refs$$)).join(","), "S002");
  }
};
Grammar$$module$src$ixmlGrammar.prototype.reachable = function $Grammar$$module$src$ixmlGrammar$$reachable$() {
  var $$jscomp$this$$ = this, $known$$ = new Set, $refs$jscomp$2_start$$ = this.rules[0];
  $known$$.add($refs$jscomp$2_start$$.name);
  $refs$jscomp$2_start$$ = [$refs$jscomp$2_start$$.name];
  for (var $$jscomp$loop$33$$ = {}; 0 < $refs$jscomp$2_start$$.length;) {
    $$jscomp$loop$33$$.$jscomp$loop$prop$newRefs$34 = [], $refs$jscomp$2_start$$.forEach(function($$jscomp$loop$33$$) {
      return function($prod_r$$) {
        $prod_r$$ = $$jscomp$this$$.productions.get($prod_r$$);
        $$jscomp$loop$33$$.$jscomp$loop$prop$newRefs$34 = $$jscomp$loop$33$$.$jscomp$loop$prop$newRefs$34.concat($$jscomp$this$$.requires($prod_r$$, $known$$));
      };
    }($$jscomp$loop$33$$)), $refs$jscomp$2_start$$ = $$jscomp$loop$33$$.$jscomp$loop$prop$newRefs$34, $$jscomp$loop$33$$ = {$jscomp$loop$prop$newRefs$34:$$jscomp$loop$33$$.$jscomp$loop$prop$newRefs$34};
  }
  return $known$$;
};
Grammar$$module$src$ixmlGrammar.prototype.compile = function $Grammar$$module$src$ixmlGrammar$$compile$() {
  var $startTime$$ = performance.now();
  this.check();
  this.makeAlts();
  this.makeMultiQuoted();
  this.makeRepeats();
  this.compileTime = performance.now() - $startTime$$;
  this.compiled = !0;
};
Grammar$$module$src$ixmlGrammar.prototype.makeAlts = function $Grammar$$module$src$ixmlGrammar$$makeAlts$() {
  for (var $$jscomp$this$$ = this, $alts$$ = [], $$jscomp$iter$6$$ = $jscomp.makeIterator(this.rules), $$jscomp$key$r$$ = $$jscomp$iter$6$$.next(); !$$jscomp$key$r$$.done; $$jscomp$key$r$$ = $$jscomp$iter$6$$.next()) {
    $$jscomp$key$r$$.value.visit(function($x$$, $parent$$) {
      $parent$$ && $x$$ instanceof Alts$$module$src$ixmlClasses && ($parent$$.replace($x$$, new NonTerminal$$module$src$ixmlClasses("Alt" + $alts$$.length, null)), $alts$$.push($x$$));
    });
  }
  $alts$$.forEach(function($a_newRule$$, $index$$) {
    $a_newRule$$ = new Rule$$module$src$ixmlClasses("Alt" + $index$$, $a_newRule$$, "-");
    $a_newRule$$.artifact = !0;
    $$jscomp$this$$.addRule($a_newRule$$);
  });
};
Grammar$$module$src$ixmlGrammar.prototype.makeMultiQuoted = function $Grammar$$module$src$ixmlGrammar$$makeMultiQuoted$() {
  for (var $$jscomp$this$$ = this, $quoted$$ = [], $$jscomp$iter$7$$ = $jscomp.makeIterator(this.rules), $$jscomp$key$r$$ = $$jscomp$iter$7$$.next(); !$$jscomp$key$r$$.done; $$jscomp$key$r$$ = $$jscomp$iter$7$$.next()) {
    $$jscomp$key$r$$.value.visit(function($x$$, $parent$$) {
      $parent$$ && $x$$ instanceof Quoted$$module$src$ixmlClasses && "+" != $x$$.mark && 1 < $x$$.value.length && ($parent$$.replace($x$$, new NonTerminal$$module$src$ixmlClasses("Quo" + $quoted$$.length, null)), $quoted$$.push($x$$));
    });
  }
  $quoted$$.forEach(function($lit$$, $index$$) {
    var $alts2$$ = new Alts$$module$src$ixmlClasses, $a$$ = new Alt$$module$src$ixmlClasses;
    $alts2$$.add($a$$);
    for (var $$jscomp$iter$8$$ = $jscomp.makeIterator($lit$$.value), $$jscomp$key$c$$ = $$jscomp$iter$8$$.next(); !$$jscomp$key$c$$.done; $$jscomp$key$c$$ = $$jscomp$iter$8$$.next()) {
      $a$$.add(new Quoted$$module$src$ixmlClasses($$jscomp$key$c$$.value, $lit$$.mark));
    }
    $$jscomp$this$$.addRule(new Rule$$module$src$ixmlClasses("Quo" + $index$$, $alts2$$, "-"));
  });
};
Grammar$$module$src$ixmlGrammar.prototype.makeRepeats = function $Grammar$$module$src$ixmlGrammar$$makeRepeats$() {
  for (var $$jscomp$this$$ = this, $multiples$$ = [], $$jscomp$iter$9$$ = $jscomp.makeIterator(this.rules), $$jscomp$key$r$$ = $$jscomp$iter$9$$.next(); !$$jscomp$key$r$$.done; $$jscomp$key$r$$ = $$jscomp$iter$9$$.next()) {
    $$jscomp$key$r$$.value.visit(function($x$$, $parent$$) {
      $x$$ instanceof Multiple$$module$src$ixmlClasses && ($parent$$.replace($x$$, $x$$.makeReference($multiples$$.length)), $multiples$$.push($x$$));
    });
  }
  0 < $multiples$$.length && $multiples$$.forEach(function($m$$, $index$$) {
    $m$$.makeRules($index$$).forEach(function($r$$) {
      return $$jscomp$this$$.addRule($r$$);
    });
  });
};
Grammar$$module$src$ixmlGrammar.prototype.setInput = function $Grammar$$module$src$ixmlGrammar$$setInput$($input$$) {
  this.input = $input$$;
  this.lines = $input$$.split(/\n/);
};
Grammar$$module$src$ixmlGrammar.prototype.locate = function $Grammar$$module$src$ixmlGrammar$$locate$($position$$) {
  for (var $line$$ = 1, $col$$ = 1, $i$$ = 0; $i$$ < $position$$; $i$$++) {
    $col$$++, /\n/.test(this.input[$i$$]) && ($line$$++, $col$$ = 1);
  }
  return {line:$line$$, col:$col$$};
};
Grammar$$module$src$ixmlGrammar.prototype.getLine = function $Grammar$$module$src$ixmlGrammar$$getLine$($line$$) {
  return this.lines[$line$$ - 1];
};
Grammar$$module$src$ixmlGrammar.prototype.parse = function $Grammar$$module$src$ixmlGrammar$$parse$($input$$, $options$$) {
  function $getOptionBoolean$$($key$$) {
    return $options$$ instanceof SaxonJS.XdmMap ? ($key$$ = SaxonJS.atom($key$$), $options$$.containsKey($key$$) ? $options$$.get($key$$)[0].value : !1) : $options$$.hasOwn($key$$) ? $options$$[$key$$] : !1;
  }
  function $recordAmbiguity$$($element$$) {
    $element$$.setAttributeNS("http://invisiblexml.org/NS", "ixml:state", "ambiguous");
  }
  function $checkTopNode$$($nodes$$) {
    var $node$$ = $nodes$$[0];
    $node$$ instanceof Attr && grumble$$module$src$ixmlParse("An attribute node may not be the final parse result @" + $node$$.name, "D05");
    $node$$ instanceof Text && grumble$$module$src$ixmlParse("A text node may not be the final parse result: '" + $node$$.textContent + "'", "D06");
    1 < $nodes$$.length && grumble$$module$src$ixmlParse("Multiple nodes may not be the final parse result:" + $nodes$$.map(function($JSCompiler_inline_result$jscomp$37_n$$) {
      a: {
        switch($JSCompiler_inline_result$jscomp$37_n$$.nodeType) {
          case Node.ELEMENT_NODE:
            $JSCompiler_inline_result$jscomp$37_n$$ = "<" + $JSCompiler_inline_result$jscomp$37_n$$.tagName + "/>";
            break a;
          case Node.ATTRIBUTE_NODE:
            $JSCompiler_inline_result$jscomp$37_n$$ = "@" + $JSCompiler_inline_result$jscomp$37_n$$.name;
            break a;
          case Node.TEXT_NODE:
            $JSCompiler_inline_result$jscomp$37_n$$ = "'" + $JSCompiler_inline_result$jscomp$37_n$$.textContent + "'";
            break a;
        }
        $JSCompiler_inline_result$jscomp$37_n$$ = void 0;
      }
      return $JSCompiler_inline_result$jscomp$37_n$$;
    }), "D06");
  }
  $options$$ = void 0 === $options$$ ? {} : $options$$;
  this.compiled || grumble$$module$src$ixmlParse("An IXML grammar must be compiled before being used to parse");
  $options$$.value && ($options$$ = $options$$.value);
  var $result$$ = "1.0" != this.version, $doc$jscomp$2_startTime$$ = performance.now(), $characters$$ = [].concat($jscomp.arrayFromIterable($input$$));
  this.characters = $characters$$;
  this.setInput($input$$);
  this.stateSets = [];
  var $origin$jscomp$5_position$jscomp$6_suppressMarks$$ = 0, $parsed_s$$ = new StateSet$$module$src$ixmlGrammar($characters$$, $origin$jscomp$5_position$jscomp$6_suppressMarks$$++, this);
  this.stateSets.push($parsed_s$$);
  var $failure$$ = null;
  $parsed_s$$.initialise(this.start);
  var $cont$$ = !0;
  try {
    for (; $cont$$;) {
      $cont$$ = $parsed_s$$.process();
    }
  } catch ($e$$) {
    $failure$$ = $e$$.message;
  }
  var $isAmbiguous_last$$ = $parsed_s$$;
  if (!$failure$$) {
    for (var $$jscomp$loop$35_ambigTrees$$ = {}, $i$jscomp$11_justOne$$ = 0; $i$jscomp$11_justOne$$ < $characters$$.length; $$jscomp$loop$35_ambigTrees$$ = {$jscomp$loop$prop$expectations$36:$$jscomp$loop$35_ambigTrees$$.$jscomp$loop$prop$expectations$36}, $i$jscomp$11_justOne$$++) {
      $parsed_s$$ = new StateSet$$module$src$ixmlGrammar($characters$$, $origin$jscomp$5_position$jscomp$6_suppressMarks$$++, this);
      this.stateSets.push($parsed_s$$);
      if (!$parsed_s$$.scanOne($i$jscomp$11_justOne$$, $characters$$[$i$jscomp$11_justOne$$], $isAmbiguous_last$$)) {
        $origin$jscomp$5_position$jscomp$6_suppressMarks$$ = this.locate($i$jscomp$11_justOne$$);
        $failure$$ = "Failure at line " + $origin$jscomp$5_position$jscomp$6_suppressMarks$$.line + " column " + $origin$jscomp$5_position$jscomp$6_suppressMarks$$.col + "\nGiven '" + $input$$[$i$jscomp$11_justOne$$] + "' (codepoint " + $input$$[$i$jscomp$11_justOne$$].codePointAt(0) + ")\nExpecting one of: ";
        $$jscomp$loop$35_ambigTrees$$.$jscomp$loop$prop$expectations$36 = new Set;
        $isAmbiguous_last$$.needsTerminals().forEach(function($$jscomp$loop$35$$) {
          return function($n$jscomp$13_nP$$) {
            $n$jscomp$13_nP$$ = $n$jscomp$13_nP$$.nextPart();
            $n$jscomp$13_nP$$ instanceof Insertion$$module$src$ixmlClasses || $$jscomp$loop$35$$.$jscomp$loop$prop$expectations$36.add($n$jscomp$13_nP$$.display());
          };
        }($$jscomp$loop$35_ambigTrees$$));
        $failure$$ += [].concat($jscomp.arrayFromIterable($$jscomp$loop$35_ambigTrees$$.$jscomp$loop$prop$expectations$36)).join(", ");
        $failure$$ += "\n" + this.getLine($origin$jscomp$5_position$jscomp$6_suppressMarks$$.line) + "\n";
        $failure$$ += " ".repeat($origin$jscomp$5_position$jscomp$6_suppressMarks$$.col - 1) + "^\n";
        break;
      }
      $cont$$ = !0;
      try {
        for (; $cont$$;) {
          $cont$$ = $parsed_s$$.process();
        }
      } catch ($e$27$$) {
        $failure$$ = $e$27$$.message;
        break;
      }
      $isAmbiguous_last$$ = $parsed_s$$;
    }
  }
  $input$$ = performance.now() - $doc$jscomp$2_startTime$$;
  $parsed_s$$ = $parsed_s$$.completes(this.start);
  $i$jscomp$11_justOne$$ = $getOptionBoolean$$("justOne");
  $origin$jscomp$5_position$jscomp$6_suppressMarks$$ = $getOptionBoolean$$("suppressMarks");
  $$jscomp$loop$35_ambigTrees$$ = [];
  if (0 < $parsed_s$$.length) {
    $isAmbiguous_last$$ = 1 < $parsed_s$$.length;
    var $bottomUpTree_parseTree_top$$ = document.implementation.createDocument("", "", null);
    $bottomUpTree_parseTree_top$$ = document.implementation.createDocument("", "", null);
    try {
      for (var $$jscomp$iter$11$$ = $jscomp.makeIterator($parsed_s$$), $$jscomp$key$oneSolution$$ = $$jscomp$iter$11$$.next(); !$$jscomp$key$oneSolution$$.done; $$jscomp$key$oneSolution$$ = $$jscomp$iter$11$$.next()) {
        var $b$$ = $$jscomp$key$oneSolution$$.value.bottomUp($bottomUpTree_parseTree_top$$, this.productions, $characters$$, null, $i$jscomp$11_justOne$$, $origin$jscomp$5_position$jscomp$6_suppressMarks$$);
        if ($b$$ instanceof Ambiguity$$module$src$ixmlGrammar) {
          for (var $$jscomp$iter$10$$ = $jscomp.makeIterator($b$$.parts), $$jscomp$key$p$$ = $$jscomp$iter$10$$.next(); !$$jscomp$key$p$$.done; $$jscomp$key$p$$ = $$jscomp$iter$10$$.next()) {
            var $p$$ = $$jscomp$key$p$$.value;
            $recordAmbiguity$$($p$$[0]);
            var $parent$$ = document.implementation.createDocument("", "", null);
            $$jscomp$loop$35_ambigTrees$$.push($parent$$);
            $checkTopNode$$($p$$);
            $parent$$.append($p$$[0].cloneNode(!0));
            if ($i$jscomp$11_justOne$$) {
              break;
            }
          }
        } else {
          $isAmbiguous_last$$ && $recordAmbiguity$$($b$$[0]);
          $result$$ && $b$$[0].setAttributeNS("http://invisiblexml.org/NS", "ixml:state", "version-mismatch");
          var $parent$28$$ = document.implementation.createDocument("", "", null);
          $$jscomp$loop$35_ambigTrees$$.push($parent$28$$);
          $checkTopNode$$($b$$);
          $parent$28$$.append($b$$[0].cloneNode(!0));
        }
        if ($i$jscomp$11_justOne$$) {
          break;
        }
      }
    } catch ($e$29$$) {
      $failure$$ = $e$29$$.code ? {code:"string" == typeof $e$29$$.code ? $e$29$$.code.substring($e$29$$.code.indexOf("}") + 1) : $e$29$$.code, message:$e$29$$.message} : "Encounterd uncoded error:" + $e$29$$.constructor.name + ":" + $e$29$$.message, $parsed_s$$ = [];
    }
    $bottomUpTree_parseTree_top$$ = $$jscomp$loop$35_ambigTrees$$[0];
  } else {
    if (!$failure$$) {
      $failure$$ = "\nEnd of input reached before parse completed.\nExpecting one of:\n    ";
      var $expectations$30$$ = new Set;
      $isAmbiguous_last$$.needsTerminals().forEach(function($n$jscomp$14_nP$$) {
        $n$jscomp$14_nP$$ = $n$jscomp$14_nP$$.nextPart();
        $n$jscomp$14_nP$$ instanceof Insertion$$module$src$ixmlClasses || $expectations$30$$.add($n$jscomp$14_nP$$.display());
      });
      $failure$$ += [].concat($jscomp.arrayFromIterable($expectations$30$$)).join(", ") + "\n";
    }
  }
  $result$$ = performance.now() - $doc$jscomp$2_startTime$$ - $input$$;
  $result$$ = {parsed:0 < $parsed_s$$.length, tree:$bottomUpTree_parseTree_top$$, allTrees:$$jscomp$loop$35_ambigTrees$$, states:this.stateSets, parseTime:$input$$, treeTime:$result$$, compileTime:this.compileTime};
  $failure$$ && ($result$$.failed = $failure$$, $doc$jscomp$2_startTime$$ = $bottomUpTree_parseTree_top$$ = document.implementation.createDocument("", "", null), $result$$.tree = $doc$jscomp$2_startTime$$, $bottomUpTree_parseTree_top$$ = $doc$jscomp$2_startTime$$.createElement("ixml"), $doc$jscomp$2_startTime$$.append($bottomUpTree_parseTree_top$$), $bottomUpTree_parseTree_top$$.setAttributeNS("http://invisiblexml.org/NS", "ixml:state", "failed"), $failure$$.code ? ($result$$.failed = $failure$$.message, 
  $result$$["error-code"] = $failure$$.code, $bottomUpTree_parseTree_top$$.setAttributeNS("http://invisiblexml.org/NS", "ixml:error-code", $failure$$.code), $bottomUpTree_parseTree_top$$.append(new Text("\n" + $failure$$.message))) : $bottomUpTree_parseTree_top$$.append(new Text("\n" + $failure$$)));
  return $result$$;
};
Grammar$$module$src$ixmlGrammar.prototype.flat = function $Grammar$$module$src$ixmlGrammar$$flat$() {
  for (var $s$$ = "", $col0width$$ = this.parts.reduce(function($prev$$, $curr$$) {
    return $curr$$ instanceof Rule$$module$src$ixmlClasses && $curr$$.name.length > $prev$$ ? $curr$$.name.length : $prev$$;
  }, 0), $$jscomp$iter$12$$ = $jscomp.makeIterator(this.parts), $$jscomp$key$r$$ = $$jscomp$iter$12$$.next(); !$$jscomp$key$r$$.done; $$jscomp$key$r$$ = $$jscomp$iter$12$$.next()) {
    $s$$ += $$jscomp$key$r$$.value.flat($col0width$$);
  }
  return $s$$;
};
Grammar$$module$src$ixmlGrammar.prototype.display = function $Grammar$$module$src$ixmlGrammar$$display$($notXML_output$$) {
  if ($notXML_output$$) {
    return this.flat();
  }
  $notXML_output$$ = document.implementation.createDocument("", "", null);
  this.toXML($notXML_output$$);
  return $notXML_output$$;
};
Grammar$$module$src$ixmlGrammar.prototype.toXML = function $Grammar$$module$src$ixmlGrammar$$toXML$($$jscomp$iter$13_output$$) {
  var $e$$ = $$jscomp$iter$13_output$$.createElement("ixml");
  this.start && $e$$.setAttribute("startTerm", this.start);
  $$jscomp$iter$13_output$$.append($e$$);
  $$jscomp$iter$13_output$$ = $jscomp.makeIterator(this.parts);
  for (var $$jscomp$key$r$$ = $$jscomp$iter$13_output$$.next(); !$$jscomp$key$r$$.done; $$jscomp$key$r$$ = $$jscomp$iter$13_output$$.next()) {
    $$jscomp$key$r$$.value.toXML($e$$);
  }
};
var jwiXML$$module$src$ixmlGrammar = function() {
  return {compile:function($input$$) {
    return $input$$ instanceof Document ? compileFromXML$$module$src$ixmlParse($input$$) : compile$$module$src$ixmlParse($input$$);
  }, parse:function($input$$) {
    return $input$$ instanceof Document ? parseFromXML$$module$src$ixmlParse($input$$) : parse$$module$src$ixmlParse($input$$);
  }};
}();
window.jwiXML = function $window$jwiXML$() {
  return jwiXML$$module$src$ixmlGrammar;
};
var module$src$ixmlGrammar = {ixmlNS:ixmlNS$$module$src$ixmlGrammar};
module$src$ixmlGrammar.Grammar = Grammar$$module$src$ixmlGrammar;
module$src$ixmlGrammar.jwiXML = jwiXML$$module$src$ixmlGrammar;
// Input 1
var IXMLPart$$module$src$ixmlClasses = function $IXMLPart$$module$src$ixmlClasses$() {
};
IXMLPart$$module$src$ixmlClasses.fromXML = function $IXMLPart$$module$src$ixmlClasses$fromXML$($element$$) {
  var $mark$$;
  $element$$.hasAttribute("mark") && ($mark$$ = $element$$.getAttribute("mark"));
  $element$$.hasAttribute("tmark") && ($mark$$ = $element$$.getAttribute("tmark"));
  switch($element$$.nodeName) {
    case "prolog":
      return Prolog$$module$src$ixmlClasses.fromXML($element$$);
    case "version":
      return Version$$module$src$ixmlClasses.fromXML($element$$);
    case "rule":
      return Rule$$module$src$ixmlClasses.fromXML($element$$, $mark$$);
    case "alts":
      return Alts$$module$src$ixmlClasses.fromXML($element$$.children);
    case "alt":
      return Alt$$module$src$ixmlClasses.fromXML($element$$.children);
    case "comment":
      return CommentX$$module$src$ixmlClasses.fromXML($element$$);
    case "literal":
      return Literal$$module$src$ixmlClasses.fromXML($element$$, $mark$$);
    case "insertion":
      return Insertion$$module$src$ixmlClasses.fromXML($element$$);
    case "inclusion":
      return Charset$$module$src$ixmlClasses.fromXML($element$$, !1, $mark$$);
    case "exclusion":
      return Charset$$module$src$ixmlClasses.fromXML($element$$, !0, $mark$$);
    case "member":
      return Member$$module$src$ixmlClasses.fromXML($element$$);
    case "nonterminal":
      return NonTerminal$$module$src$ixmlClasses.fromXML($element$$, $mark$$);
    case "option":
      return OptionX$$module$src$ixmlClasses.fromXML($element$$, $mark$$);
    case "repeat0":
      return Repeat0$$module$src$ixmlClasses.fromXML($element$$, $mark$$);
    case "repeat1":
      return Repeat1$$module$src$ixmlClasses.fromXML($element$$, $mark$$);
    case "sep":
      return Separator$$module$src$ixmlClasses.fromXML($element$$, $mark$$);
    default:
      grumble$$module$src$ixmlParse("Unknown element in ixml tree:" + $element$$.nodeName);
  }
};
var Prolog$$module$src$ixmlClasses = function $Prolog$$module$src$ixmlClasses$($version$$) {
  this.version = $version$$;
};
Prolog$$module$src$ixmlClasses.fromXML = function $Prolog$$module$src$ixmlClasses$fromXML$($element$$) {
  return new Prolog$$module$src$ixmlClasses(Version$$module$src$ixmlClasses.fromXML($element$$.firstElementChild));
};
Prolog$$module$src$ixmlClasses.prototype.toXML = function $Prolog$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("prolog");
  this.version && this.version.toXML($e$$);
  $parent$$.append($e$$);
};
Prolog$$module$src$ixmlClasses.prototype.flat = function $Prolog$$module$src$ixmlClasses$$flat$() {
  var $s$$ = "";
  this.version && ($s$$ += this.version.flat());
  return $s$$;
};
var Version$$module$src$ixmlClasses = function $Version$$module$src$ixmlClasses$($version$$) {
  this.version = $version$$;
  this.comments = [];
};
Version$$module$src$ixmlClasses.fromXML = function $Version$$module$src$ixmlClasses$fromXML$($element$$) {
  return new Version$$module$src$ixmlClasses($element$$.textContent);
};
Version$$module$src$ixmlClasses.prototype.toXML = function $Version$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("version");
  $e$$.setAttribute("string", this.version);
  $parent$$.append($e$$);
  this.comments.forEach(function($c$$) {
    return $c$$.toXML($e$$);
  });
};
Version$$module$src$ixmlClasses.prototype.flat = function $Version$$module$src$ixmlClasses$$flat$() {
  return 'ixml version "' + this.version + '".';
};
var Markable$$module$src$ixmlClasses = function $Markable$$module$src$ixmlClasses$($mark$$) {
  this.mark = $mark$$;
  this.comments = [];
  this.artifact = !1;
};
Markable$$module$src$ixmlClasses.prototype.setMark = function $Markable$$module$src$ixmlClasses$$setMark$($mark$$) {
  this.mark = $mark$$;
};
Markable$$module$src$ixmlClasses.prototype.flat = function $Markable$$module$src$ixmlClasses$$flat$($defaultMark$$) {
  return this.mark ? this.mark : void 0 === $defaultMark$$ ? "" : $defaultMark$$;
};
Markable$$module$src$ixmlClasses.prototype.toXML = function $Markable$$module$src$ixmlClasses$$toXML$($parent$$) {
  this.mark && $parent$$.setAttribute("mark", this.mark);
};
Markable$$module$src$ixmlClasses.prototype.flatComments = function $Markable$$module$src$ixmlClasses$$flatComments$() {
  var $s$$ = "";
  this.comments.forEach(function($c$$) {
    return $s$$ += $c$$.flat();
  });
  return $s$$;
};
var Rule$$module$src$ixmlClasses = function $Rule$$module$src$ixmlClasses$($name$$, $definition$$, $mark$$) {
  Markable$$module$src$ixmlClasses.call(this, $mark$$);
  this.name = $name$$;
  this.definition = $definition$$;
  this.definition.sep = "| ";
  this.definition.withBrackets = !1;
  this.comments = [];
};
$jscomp.inherits(Rule$$module$src$ixmlClasses, Markable$$module$src$ixmlClasses);
Rule$$module$src$ixmlClasses.fromXML = function $Rule$$module$src$ixmlClasses$fromXML$($element$$, $mark$$) {
  return new Rule$$module$src$ixmlClasses($element$$.getAttribute("name"), Alts$$module$src$ixmlClasses.fromXML($element$$.children), $mark$$);
};
Rule$$module$src$ixmlClasses.prototype.addComment = function $Rule$$module$src$ixmlClasses$$addComment$($comment$$) {
  this.comments.push($comment$$);
};
Rule$$module$src$ixmlClasses.prototype.toXML = function $Rule$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("rule");
  Markable$$module$src$ixmlClasses.prototype.toXML.call(this, $e$$);
  $e$$.setAttribute("name", this.name);
  this.artifact && $e$$.setAttributeNS(ixmlNS$$module$src$ixmlGrammar, "ixml:artifact", "true");
  this.comments.forEach(function($c$$) {
    return $c$$.toXML($e$$);
  });
  $parent$$.append($e$$);
  this.definition.toXML($e$$, !0);
};
Rule$$module$src$ixmlClasses.prototype.visit = function $Rule$$module$src$ixmlClasses$$visit$($visitor$$) {
  this.definition.visit($visitor$$);
};
Rule$$module$src$ixmlClasses.prototype.flat = function $Rule$$module$src$ixmlClasses$$flat$($colWidth$$) {
  var $s$$ = "\n" + " ".repeat($colWidth$$ - this.name.length) + Markable$$module$src$ixmlClasses.prototype.flat.call(this, " ") + this.name + ": ";
  this.comments.forEach(function($c$$) {
    return $s$$ += $c$$.flat();
  });
  return $s$$ + this.definition.flat() + ". ";
};
var CommentX$$module$src$ixmlClasses = function $CommentX$$module$src$ixmlClasses$($parts$$) {
  this.parts = $parts$$;
};
CommentX$$module$src$ixmlClasses.fromXML = function $CommentX$$module$src$ixmlClasses$fromXML$($$jscomp$iter$14_element$$) {
  var $parts$$ = [];
  $$jscomp$iter$14_element$$ = $jscomp.makeIterator($$jscomp$iter$14_element$$.childNodes);
  for (var $$jscomp$key$node_node$$ = $$jscomp$iter$14_element$$.next(); !$$jscomp$key$node_node$$.done; $$jscomp$key$node_node$$ = $$jscomp$iter$14_element$$.next()) {
    $$jscomp$key$node_node$$ = $$jscomp$key$node_node$$.value, $$jscomp$key$node_node$$ instanceof Element ? $parts$$.push(CommentX$$module$src$ixmlClasses.fromXML($$jscomp$key$node_node$$)) : $parts$$.push($$jscomp$key$node_node$$.textContent);
  }
  return new CommentX$$module$src$ixmlClasses($parts$$);
};
CommentX$$module$src$ixmlClasses.prototype.toXML = function $CommentX$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("comment");
  this.parts.forEach(function($p$$) {
    $p$$ instanceof CommentX$$module$src$ixmlClasses ? $p$$.toXML($e$$) : $e$$.append(new Text($p$$));
  });
  $parent$$.append($e$$);
};
CommentX$$module$src$ixmlClasses.prototype.flat = function $CommentX$$module$src$ixmlClasses$$flat$() {
  var $s$$ = "{";
  this.parts.forEach(function($p$$) {
    $s$$ = $p$$ instanceof CommentX$$module$src$ixmlClasses ? $s$$ + $p$$.flat() : $s$$ + $p$$;
  });
  return $s$$ + "}";
};
var Container$$module$src$ixmlClasses = function $Container$$module$src$ixmlClasses$($mark$$) {
  Markable$$module$src$ixmlClasses.call(this, $mark$$);
  this.sep = this.tag = null;
  this.parts = [];
  this.allParts = [];
  this.withBrackets = !1;
};
$jscomp.inherits(Container$$module$src$ixmlClasses, Markable$$module$src$ixmlClasses);
Container$$module$src$ixmlClasses.prototype.add = function $Container$$module$src$ixmlClasses$$add$($a$$) {
  this.parts.push($a$$);
  this.allParts.push($a$$);
};
Container$$module$src$ixmlClasses.prototype.addComment = function $Container$$module$src$ixmlClasses$$addComment$($comment$$) {
  this.allParts.push($comment$$);
};
Container$$module$src$ixmlClasses.prototype.isEmpty = function $Container$$module$src$ixmlClasses$$isEmpty$() {
  return this instanceof Empty$$module$src$ixmlClasses || this.parts.every(function($p$$) {
    return $p$$ instanceof Empty$$module$src$ixmlClasses;
  });
};
Container$$module$src$ixmlClasses.prototype.replace = function $Container$$module$src$ixmlClasses$$replace$($oldPart$$, $newPart$$) {
  var $index$$ = this.parts.indexOf($oldPart$$);
  this.parts[$index$$] = $newPart$$;
  $index$$ = this.allParts.indexOf($oldPart$$);
  this.allParts[$index$$] = $newPart$$;
};
Container$$module$src$ixmlClasses.prototype.visit = function $Container$$module$src$ixmlClasses$$visit$($visitor$$, $parent$$) {
  var $$jscomp$this$$ = this;
  $visitor$$(this, $parent$$);
  this.parts.forEach(function($p$$) {
    return $p$$.visit($visitor$$, $$jscomp$this$$);
  });
};
Container$$module$src$ixmlClasses.prototype.display = function $Container$$module$src$ixmlClasses$$display$() {
  return "container";
};
Container$$module$src$ixmlClasses.prototype.toXML = function $Container$$module$src$ixmlClasses$$toXML$($$jscomp$iter$15_parent$$, $$jscomp$key$a_suppress$$) {
  var $p$$ = $$jscomp$iter$15_parent$$;
  $$jscomp$key$a_suppress$$ || ($p$$ = $$jscomp$iter$15_parent$$.ownerDocument.createElement(this.tag), $$jscomp$iter$15_parent$$.append($p$$));
  $$jscomp$iter$15_parent$$ = $jscomp.makeIterator(this.allParts);
  for ($$jscomp$key$a_suppress$$ = $$jscomp$iter$15_parent$$.next(); !$$jscomp$key$a_suppress$$.done; $$jscomp$key$a_suppress$$ = $$jscomp$iter$15_parent$$.next()) {
    $$jscomp$key$a_suppress$$.value.toXML($p$$, !1);
  }
};
Container$$module$src$ixmlClasses.prototype.flat = function $Container$$module$src$ixmlClasses$$flat$() {
  var $$jscomp$this$$ = this;
  if (1 == this.parts.length) {
    return this.parts[0].flat();
  }
  var $s$$ = "";
  this.allParts.forEach(function($p$$, $index$$) {
    $s$$ += $p$$.flat();
    !($p$$ instanceof CommentX$$module$src$ixmlClasses) && $index$$ < $$jscomp$this$$.allParts.length - 1 && ($s$$ += $$jscomp$this$$.sep);
  });
  return this.withBrackets ? "(" + $s$$ + ")" : $s$$;
};
var Alts$$module$src$ixmlClasses = function $Alts$$module$src$ixmlClasses$() {
  Container$$module$src$ixmlClasses.call(this, null);
  this.tag = "alts";
  this.sep = "|";
  this.withBrackets = !0;
};
$jscomp.inherits(Alts$$module$src$ixmlClasses, Container$$module$src$ixmlClasses);
Alts$$module$src$ixmlClasses.fromXML = function $Alts$$module$src$ixmlClasses$fromXML$($$jscomp$iter$17_parts$$) {
  var $alts$$ = new Alts$$module$src$ixmlClasses;
  $$jscomp$iter$17_parts$$ = $jscomp.makeIterator($$jscomp$iter$17_parts$$);
  for (var $$jscomp$key$p$jscomp$2_a$$ = $$jscomp$iter$17_parts$$.next(); !$$jscomp$key$p$jscomp$2_a$$.done; $$jscomp$key$p$jscomp$2_a$$ = $$jscomp$iter$17_parts$$.next()) {
    var $$jscomp$iter$16_p$$ = $$jscomp$key$p$jscomp$2_a$$.value;
    $$jscomp$key$p$jscomp$2_a$$ = new Alt$$module$src$ixmlClasses;
    $alts$$.add($$jscomp$key$p$jscomp$2_a$$);
    $$jscomp$iter$16_p$$ = $jscomp.makeIterator($$jscomp$iter$16_p$$.children);
    for (var $$jscomp$key$c$$ = $$jscomp$iter$16_p$$.next(); !$$jscomp$key$c$$.done; $$jscomp$key$c$$ = $$jscomp$iter$16_p$$.next()) {
      $$jscomp$key$p$jscomp$2_a$$.add(IXMLPart$$module$src$ixmlClasses.fromXML($$jscomp$key$c$$.value));
    }
  }
  return $alts$$;
};
Alts$$module$src$ixmlClasses.prototype.display = function $Alts$$module$src$ixmlClasses$$display$() {
  return "()";
};
var Alt$$module$src$ixmlClasses = function $Alt$$module$src$ixmlClasses$() {
  Container$$module$src$ixmlClasses.call(this, null);
  this.tag = "alt";
  this.sep = ",";
  this.noBrackets = !0;
};
$jscomp.inherits(Alt$$module$src$ixmlClasses, Container$$module$src$ixmlClasses);
Alt$$module$src$ixmlClasses.fromXML = function $Alt$$module$src$ixmlClasses$fromXML$($$jscomp$iter$18_parts$$) {
  var $alt$$ = new Alt$$module$src$ixmlClasses;
  $$jscomp$iter$18_parts$$ = $jscomp.makeIterator($$jscomp$iter$18_parts$$);
  for (var $$jscomp$key$p$$ = $$jscomp$iter$18_parts$$.next(); !$$jscomp$key$p$$.done; $$jscomp$key$p$$ = $$jscomp$iter$18_parts$$.next()) {
    $alt$$.add(IXMLPart$$module$src$ixmlClasses.fromXML($$jscomp$key$p$$.value));
  }
  return $alt$$;
};
var Empty$$module$src$ixmlClasses = function $Empty$$module$src$ixmlClasses$() {
  Alts$$module$src$ixmlClasses.call(this);
  this.add(new Alt$$module$src$ixmlClasses);
};
$jscomp.inherits(Empty$$module$src$ixmlClasses, Alts$$module$src$ixmlClasses);
Empty$$module$src$ixmlClasses.fromXML = Alts$$module$src$ixmlClasses.fromXML;
Empty$$module$src$ixmlClasses.prototype.toXML = function $Empty$$module$src$ixmlClasses$$toXML$($parent$$, $suppress$$) {
  Alts$$module$src$ixmlClasses.prototype.toXML.call(this, $parent$$, !0);
};
var Term$$module$src$ixmlClasses = function $Term$$module$src$ixmlClasses$() {
  Container$$module$src$ixmlClasses.call(this, null);
  this.parts = [];
};
$jscomp.inherits(Term$$module$src$ixmlClasses, Container$$module$src$ixmlClasses);
Term$$module$src$ixmlClasses.prototype.toXML = function $Term$$module$src$ixmlClasses$$toXML$($$jscomp$iter$19_parent$$) {
  var $p$$ = $$jscomp$iter$19_parent$$.ownerDocument.createElement("alt");
  $$jscomp$iter$19_parent$$.append($p$$);
  $$jscomp$iter$19_parent$$ = $jscomp.makeIterator(this.parts);
  for (var $$jscomp$key$a$$ = $$jscomp$iter$19_parent$$.next(); !$$jscomp$key$a$$.done; $$jscomp$key$a$$ = $$jscomp$iter$19_parent$$.next()) {
    $$jscomp$key$a$$.value.toXML($p$$);
  }
};
var Multiple$$module$src$ixmlClasses = function $Multiple$$module$src$ixmlClasses$($term$$, $mark$$) {
  Markable$$module$src$ixmlClasses.call(this, $mark$$);
  this.term = $term$$;
  this.sep = null;
  this.suffix = "";
  this.comments = [];
  this.tag = this.rootName = null;
};
$jscomp.inherits(Multiple$$module$src$ixmlClasses, Markable$$module$src$ixmlClasses);
Multiple$$module$src$ixmlClasses.prototype.setSeparator = function $Multiple$$module$src$ixmlClasses$$setSeparator$($sep$$) {
  this.sep = $sep$$;
  this.suffix += "-sep";
};
Multiple$$module$src$ixmlClasses.prototype.replace = function $Multiple$$module$src$ixmlClasses$$replace$($oldPart$$, $newPart$$) {
  this.term === $oldPart$$ && (this.term = $newPart$$);
};
Multiple$$module$src$ixmlClasses.prototype.makeRules = function $Multiple$$module$src$ixmlClasses$$makeRules$($index$$, $name$$) {
  return [];
};
Multiple$$module$src$ixmlClasses.prototype.addComment = function $Multiple$$module$src$ixmlClasses$$addComment$($comment$$) {
  this.comments.push($comment$$);
};
Multiple$$module$src$ixmlClasses.prototype.referenceName = function $Multiple$$module$src$ixmlClasses$$referenceName$($index$$) {
  if (this.rootName) {
    return this.rootName + $index$$;
  }
  this.rootName = this.term instanceof NonTerminal$$module$src$ixmlClasses ? this.term.ref : "Mult";
  return this.rootName + $index$$;
};
Multiple$$module$src$ixmlClasses.prototype.makeReference = function $Multiple$$module$src$ixmlClasses$$makeReference$($index$$) {
  return new NonTerminal$$module$src$ixmlClasses(this.referenceName($index$$) + this.suffix, null);
};
Multiple$$module$src$ixmlClasses.prototype.visit = function $Multiple$$module$src$ixmlClasses$$visit$($visitor$$, $parent$$) {
  $visitor$$(this, $parent$$);
  this.term.visit($visitor$$, this);
  this.sep && this.sep.visit($visitor$$, this);
};
Multiple$$module$src$ixmlClasses.prototype.toXML = function $Multiple$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $p$$ = $parent$$;
  $p$$ = $parent$$.ownerDocument.createElement(this.tag);
  $parent$$.append($p$$);
  this.term.toXML($p$$);
  this.comments.forEach(function($c$$) {
    return $c$$.toXML($p$$);
  });
  this.sep && this.sep.toXML($p$$);
};
Multiple$$module$src$ixmlClasses.prototype.flat = function $Multiple$$module$src$ixmlClasses$$flat$($symbol$$) {
  var $s$$ = this.term.flat() + $symbol$$;
  this.sep ? ($s$$ += $symbol$$, this.comments.forEach(function($c$$) {
    return $s$$ += $c$$.flat();
  }), $s$$ += this.sep.flat()) : this.comments.forEach(function($c$$) {
    return $s$$ += $c$$.flat();
  });
  return $s$$;
};
Multiple$$module$src$ixmlClasses.prototype.transferChildren = function $Multiple$$module$src$ixmlClasses$$transferChildren$($name$$) {
  var $alts$$ = new Alts$$module$src$ixmlClasses;
  if (this.term instanceof Alts$$module$src$ixmlClasses) {
    this.term.parts.forEach(function($p$$) {
      $a$$ = new Alt$$module$src$ixmlClasses;
      $p$$.parts.forEach(function($x$$) {
        return $a$$.add($x$$);
      });
      $a$$.add(new NonTerminal$$module$src$ixmlClasses($name$$, null));
      $alts$$.add($a$$);
    });
  } else {
    var $a$$ = new Alt$$module$src$ixmlClasses;
    $a$$.add(this.term);
    $a$$.add(new NonTerminal$$module$src$ixmlClasses($name$$, null));
    $alts$$.add($a$$);
  }
  return $alts$$;
};
var OptionX$$module$src$ixmlClasses = function $OptionX$$module$src$ixmlClasses$($term$$, $mark$$) {
  Multiple$$module$src$ixmlClasses.call(this, $term$$, $mark$$);
  this.tag = "option";
  this.suffix = "-option";
};
$jscomp.inherits(OptionX$$module$src$ixmlClasses, Multiple$$module$src$ixmlClasses);
OptionX$$module$src$ixmlClasses.fromXML = function $OptionX$$module$src$ixmlClasses$fromXML$($element$$, $mark$$) {
  return new OptionX$$module$src$ixmlClasses(IXMLPart$$module$src$ixmlClasses.fromXML($element$$.firstElementChild), $mark$$);
};
OptionX$$module$src$ixmlClasses.prototype.makeRules = function $OptionX$$module$src$ixmlClasses$$makeRules$($index$jscomp$84_newRule$$, $a$jscomp$7_name$$) {
  $index$jscomp$84_newRule$$ = ($a$jscomp$7_name$$ ? $a$jscomp$7_name$$ : this.referenceName($index$jscomp$84_newRule$$)) + this.suffix;
  var $alts$$ = new Alts$$module$src$ixmlClasses;
  this.term instanceof Alts$$module$src$ixmlClasses ? this.term.parts.forEach(function($p$$) {
    return $alts$$.add($p$$);
  }) : ($a$jscomp$7_name$$ = new Alt$$module$src$ixmlClasses, $a$jscomp$7_name$$.add(this.term), $alts$$.add($a$jscomp$7_name$$));
  $a$jscomp$7_name$$ = new Alt$$module$src$ixmlClasses;
  $a$jscomp$7_name$$.add(new Empty$$module$src$ixmlClasses);
  $alts$$.add($a$jscomp$7_name$$);
  $index$jscomp$84_newRule$$ = new Rule$$module$src$ixmlClasses($index$jscomp$84_newRule$$, $alts$$, "-");
  $index$jscomp$84_newRule$$.artifact = !0;
  return [$index$jscomp$84_newRule$$];
};
OptionX$$module$src$ixmlClasses.prototype.flat = function $OptionX$$module$src$ixmlClasses$$flat$() {
  return Multiple$$module$src$ixmlClasses.prototype.flat.call(this, "?");
};
var Repeat0$$module$src$ixmlClasses = function $Repeat0$$module$src$ixmlClasses$($term$$, $mark$$) {
  Multiple$$module$src$ixmlClasses.call(this, $term$$, $mark$$);
  this.tag = "repeat0";
  this.suffix = "-star";
};
$jscomp.inherits(Repeat0$$module$src$ixmlClasses, Multiple$$module$src$ixmlClasses);
Repeat0$$module$src$ixmlClasses.fromXML = function $Repeat0$$module$src$ixmlClasses$fromXML$($element$$, $mark$jscomp$13_r$$) {
  $mark$jscomp$13_r$$ = new Repeat0$$module$src$ixmlClasses(IXMLPart$$module$src$ixmlClasses.fromXML($element$$.firstElementChild), $mark$jscomp$13_r$$);
  2 == $element$$.children.length && $mark$jscomp$13_r$$.setSeparator(IXMLPart$$module$src$ixmlClasses.fromXML($element$$.children[1]));
  return $mark$jscomp$13_r$$;
};
Repeat0$$module$src$ixmlClasses.prototype.makeRules = function $Repeat0$$module$src$ixmlClasses$$makeRules$($index$jscomp$85_newRule$jscomp$2_oname$$) {
  if (this.sep) {
    return this.makeRulesSep($index$jscomp$85_newRule$jscomp$2_oname$$);
  }
  $index$jscomp$85_newRule$jscomp$2_oname$$ = this.referenceName($index$jscomp$85_newRule$jscomp$2_oname$$) + this.suffix;
  var $alts$$ = this.transferChildren($index$jscomp$85_newRule$jscomp$2_oname$$), $a$$ = new Alt$$module$src$ixmlClasses;
  $a$$.add(new Empty$$module$src$ixmlClasses);
  $alts$$.add($a$$);
  $index$jscomp$85_newRule$jscomp$2_oname$$ = new Rule$$module$src$ixmlClasses($index$jscomp$85_newRule$jscomp$2_oname$$, $alts$$, "-");
  $index$jscomp$85_newRule$jscomp$2_oname$$.artifact = !0;
  return [$index$jscomp$85_newRule$jscomp$2_oname$$];
};
Repeat0$$module$src$ixmlClasses.prototype.makeRulesSep = function $Repeat0$$module$src$ixmlClasses$$makeRulesSep$($index$$) {
  this.referenceName($index$$);
  var $option_pname$jscomp$21_ref$$ = this.referenceName($index$$) + "-plus";
  this.referenceName($index$$);
  var $plus$$ = new Repeat1$$module$src$ixmlClasses(this.term, null);
  $plus$$.sep = this.sep;
  $option_pname$jscomp$21_ref$$ = new NonTerminal$$module$src$ixmlClasses($option_pname$jscomp$21_ref$$, null);
  $option_pname$jscomp$21_ref$$ = new OptionX$$module$src$ixmlClasses($option_pname$jscomp$21_ref$$, null);
  $option_pname$jscomp$21_ref$$.suffix = "-star-sep";
  var $r$$ = $option_pname$jscomp$21_ref$$.makeRules($index$$, this.referenceName($index$$));
  $plus$$.makeRules($index$$).forEach(function($p$$) {
    return $r$$.push($p$$);
  });
  return $r$$;
};
Repeat0$$module$src$ixmlClasses.prototype.flat = function $Repeat0$$module$src$ixmlClasses$$flat$() {
  return Multiple$$module$src$ixmlClasses.prototype.flat.call(this, "*");
};
var Repeat1$$module$src$ixmlClasses = function $Repeat1$$module$src$ixmlClasses$($term$$, $mark$$) {
  Multiple$$module$src$ixmlClasses.call(this, $term$$, $mark$$);
  this.tag = "repeat1";
  this.suffix = "-plus";
};
$jscomp.inherits(Repeat1$$module$src$ixmlClasses, Multiple$$module$src$ixmlClasses);
Repeat1$$module$src$ixmlClasses.fromXML = function $Repeat1$$module$src$ixmlClasses$fromXML$($element$$, $mark$jscomp$15_r$$) {
  $mark$jscomp$15_r$$ = new Repeat1$$module$src$ixmlClasses(IXMLPart$$module$src$ixmlClasses.fromXML($element$$.firstElementChild), $mark$jscomp$15_r$$);
  2 == $element$$.children.length && $mark$jscomp$15_r$$.setSeparator(IXMLPart$$module$src$ixmlClasses.fromXML($element$$.children[1]));
  return $mark$jscomp$15_r$$;
};
Repeat1$$module$src$ixmlClasses.prototype.makeRules = function $Repeat1$$module$src$ixmlClasses$$makeRules$($index$jscomp$87_r$$) {
  if (this.sep) {
    return this.makeRulesSep($index$jscomp$87_r$$);
  }
  var $newRule$jscomp$3_oname$$ = this.referenceName($index$jscomp$87_r$$) + this.suffix, $alts$jscomp$5_starName$$ = this.referenceName($index$jscomp$87_r$$) + "-star";
  $alts$jscomp$5_starName$$ = this.transferChildren($alts$jscomp$5_starName$$);
  $index$jscomp$87_r$$ = (new Repeat0$$module$src$ixmlClasses(this.term, null)).makeRules($index$jscomp$87_r$$);
  $newRule$jscomp$3_oname$$ = new Rule$$module$src$ixmlClasses($newRule$jscomp$3_oname$$, $alts$jscomp$5_starName$$, "-");
  $newRule$jscomp$3_oname$$.artifact = !0;
  $index$jscomp$87_r$$.unshift($newRule$jscomp$3_oname$$);
  return $index$jscomp$87_r$$;
};
Repeat1$$module$src$ixmlClasses.prototype.makeRulesSep = function $Repeat1$$module$src$ixmlClasses$$makeRulesSep$($index$jscomp$88_r$$) {
  var $newRule$jscomp$4_oname$$ = this.referenceName($index$jscomp$88_r$$) + this.suffix, $alts$jscomp$6_starName$$ = this.referenceName($index$jscomp$88_r$$) + "-star";
  $alts$jscomp$6_starName$$ = this.transferChildren($alts$jscomp$6_starName$$);
  var $alts2$jscomp$1_star$$ = new Alts$$module$src$ixmlClasses, $a$$ = new Alt$$module$src$ixmlClasses;
  $a$$.add(this.sep.term);
  $a$$.add(this.term);
  $alts2$jscomp$1_star$$.add($a$$);
  $alts2$jscomp$1_star$$ = new Repeat0$$module$src$ixmlClasses($alts2$jscomp$1_star$$, null);
  $alts2$jscomp$1_star$$.rootName = this.rootName;
  $index$jscomp$88_r$$ = $alts2$jscomp$1_star$$.makeRules($index$jscomp$88_r$$);
  $newRule$jscomp$4_oname$$ = new Rule$$module$src$ixmlClasses($newRule$jscomp$4_oname$$, $alts$jscomp$6_starName$$, "-");
  $newRule$jscomp$4_oname$$.artifact = !0;
  $index$jscomp$88_r$$.unshift($newRule$jscomp$4_oname$$);
  return $index$jscomp$88_r$$;
};
Repeat1$$module$src$ixmlClasses.prototype.flat = function $Repeat1$$module$src$ixmlClasses$$flat$() {
  return Multiple$$module$src$ixmlClasses.prototype.flat.call(this, "+");
};
var Separator$$module$src$ixmlClasses = function $Separator$$module$src$ixmlClasses$($term$$, $mark$$) {
  Multiple$$module$src$ixmlClasses.call(this, $term$$, $mark$$);
  this.tag = "sep";
  this.suffix = "-sep";
};
$jscomp.inherits(Separator$$module$src$ixmlClasses, Multiple$$module$src$ixmlClasses);
Separator$$module$src$ixmlClasses.fromXML = function $Separator$$module$src$ixmlClasses$fromXML$($element$$, $mark$$) {
  return new Separator$$module$src$ixmlClasses(IXMLPart$$module$src$ixmlClasses.fromXML($element$$.firstElementChild), $mark$$);
};
Separator$$module$src$ixmlClasses.prototype.flat = function $Separator$$module$src$ixmlClasses$$flat$() {
  return this.term.flat();
};
var Terminal$$module$src$ixmlClasses = function $Terminal$$module$src$ixmlClasses$($mark$$) {
  Markable$$module$src$ixmlClasses.call(this, $mark$$);
  this.comments = [];
};
$jscomp.inherits(Terminal$$module$src$ixmlClasses, Markable$$module$src$ixmlClasses);
Terminal$$module$src$ixmlClasses.prototype.toXML = function $Terminal$$module$src$ixmlClasses$$toXML$($element$$) {
  this.mark && $element$$.setAttribute("tmark", this.mark);
  this.comments.forEach(function($c$$) {
    return $c$$.toXML($element$$);
  });
};
Terminal$$module$src$ixmlClasses.prototype.addComment = function $Terminal$$module$src$ixmlClasses$$addComment$($comment$$) {
  this.comments.push($comment$$);
};
Terminal$$module$src$ixmlClasses.prototype.visit = function $Terminal$$module$src$ixmlClasses$$visit$($visitor$$, $parent$$) {
  $visitor$$(this, $parent$$);
};
Terminal$$module$src$ixmlClasses.prototype.matches = function $Terminal$$module$src$ixmlClasses$$matches$($c$$) {
  return !1;
};
var NonTerminal$$module$src$ixmlClasses = function $NonTerminal$$module$src$ixmlClasses$($link$$, $mark$$) {
  Markable$$module$src$ixmlClasses.call(this, $mark$$);
  this.ref = $link$$;
  this.parts = [];
  this.comments = [];
};
$jscomp.inherits(NonTerminal$$module$src$ixmlClasses, Markable$$module$src$ixmlClasses);
NonTerminal$$module$src$ixmlClasses.fromXML = function $NonTerminal$$module$src$ixmlClasses$fromXML$($element$$, $mark$$) {
  return new NonTerminal$$module$src$ixmlClasses($element$$.getAttribute("name"), $mark$$);
};
NonTerminal$$module$src$ixmlClasses.prototype.visit = function $NonTerminal$$module$src$ixmlClasses$$visit$($visitor$$, $parent$$) {
  $visitor$$(this, $parent$$);
};
NonTerminal$$module$src$ixmlClasses.prototype.display = function $NonTerminal$$module$src$ixmlClasses$$display$() {
  return Markable$$module$src$ixmlClasses.prototype.flat.call(this) + this.ref;
};
NonTerminal$$module$src$ixmlClasses.prototype.toXML = function $NonTerminal$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("nonterminal");
  Markable$$module$src$ixmlClasses.prototype.toXML.call(this, $e$$);
  $e$$.setAttribute("name", this.ref);
  $parent$$.append($e$$);
  this.comments.forEach(function($c$$) {
    return $c$$.toXML($e$$);
  });
};
NonTerminal$$module$src$ixmlClasses.prototype.flat = function $NonTerminal$$module$src$ixmlClasses$$flat$() {
  return Markable$$module$src$ixmlClasses.prototype.flat.call(this) + this.ref + this.flatComments();
};
NonTerminal$$module$src$ixmlClasses.prototype.addComment = function $NonTerminal$$module$src$ixmlClasses$$addComment$($comment$$) {
  this.comments.push($comment$$);
};
var Insertion$$module$src$ixmlClasses = function $Insertion$$module$src$ixmlClasses$($text$$, $isHex$$) {
  this.isHex = $isHex$$;
  this.text = $text$$;
  this.value = $isHex$$ ? String.fromCodePoint(parseInt($text$$, 16)) : $text$$;
};
Insertion$$module$src$ixmlClasses.fromXML = function $Insertion$$module$src$ixmlClasses$fromXML$($element$$) {
  if ($element$$.hasAttribute("string")) {
    return new Insertion$$module$src$ixmlClasses($element$$.getAttribute("string"), !1);
  }
  if ($element$$.hasAttribute("hex")) {
    return new Insertion$$module$src$ixmlClasses($element$$.getAttribute("hex"), !0);
  }
  grumble$$module$src$ixmlParse("<insertion/> in the XML syntax must have one of @string|@hex");
};
Insertion$$module$src$ixmlClasses.prototype.visit = function $Insertion$$module$src$ixmlClasses$$visit$($visitor$$, $parent$$) {
  $visitor$$(this, $parent$$);
};
Insertion$$module$src$ixmlClasses.prototype.display = function $Insertion$$module$src$ixmlClasses$$display$() {
  return "+" + (this.isHex ? "#" + this.text : '"' + this.value.replaceAll('"', '""') + '"');
};
Insertion$$module$src$ixmlClasses.prototype.toXML = function $Insertion$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("insertion");
  $e$$.setAttribute(this.isHex ? "hex" : "string", this.text);
  $parent$$.append($e$$);
};
Insertion$$module$src$ixmlClasses.prototype.flat = function $Insertion$$module$src$ixmlClasses$$flat$() {
  return this.display();
};
var Literal$$module$src$ixmlClasses = function $Literal$$module$src$ixmlClasses$() {
};
Literal$$module$src$ixmlClasses.fromXML = function $Literal$$module$src$ixmlClasses$fromXML$($element$$, $mark$$) {
  if ($element$$.hasAttribute("string")) {
    return new Quoted$$module$src$ixmlClasses($element$$.getAttribute("string"), $mark$$);
  }
  if ($element$$.hasAttribute("hex")) {
    return $element$$ = $element$$.getAttribute("hex"), /^[A-Fa-f0-9]+$/.test($element$$) || grumble$$module$src$ixmlParse("literal/@hex in the XML syntax must be a valid hexadecimal number. Provided:'" + $element$$ + "'", "S06"), new Encoded$$module$src$ixmlClasses($element$$, $mark$$);
  }
  grumble$$module$src$ixmlParse("<literal/> in the XML syntax must have one of @string|@hex");
};
var Quoted$$module$src$ixmlClasses = function $Quoted$$module$src$ixmlClasses$($s$$, $mark$$) {
  Terminal$$module$src$ixmlClasses.call(this, $mark$$);
  this.value = $s$$;
};
$jscomp.inherits(Quoted$$module$src$ixmlClasses, Terminal$$module$src$ixmlClasses);
Quoted$$module$src$ixmlClasses.prototype.matches = function $Quoted$$module$src$ixmlClasses$$matches$($c$$) {
  return this.value == $c$$;
};
Quoted$$module$src$ixmlClasses.prototype.display = function $Quoted$$module$src$ixmlClasses$$display$() {
  return Terminal$$module$src$ixmlClasses.prototype.flat.call(this) + '"' + this.value.replaceAll('"', '""') + '"';
};
Quoted$$module$src$ixmlClasses.prototype.toXML = function $Quoted$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("literal");
  Terminal$$module$src$ixmlClasses.prototype.toXML.call(this, $e$$);
  $e$$.setAttribute("string", this.value);
  $parent$$.append($e$$);
};
Quoted$$module$src$ixmlClasses.prototype.flat = function $Quoted$$module$src$ixmlClasses$$flat$() {
  return Terminal$$module$src$ixmlClasses.prototype.flat.call(this) + '"' + this.value.replaceAll('"', '""') + '"' + this.flatComments();
};
var Encoded$$module$src$ixmlClasses = function $Encoded$$module$src$ixmlClasses$($s$$, $mark$$) {
  Terminal$$module$src$ixmlClasses.call(this, $mark$$);
  this.text = $s$$;
  this.codePoint = parseInt($s$$, 16);
  try {
    this.value = String.fromCodePoint(this.codePoint);
  } catch ($e$$) {
    grumble$$module$src$ixmlParse("encoded character is not a valid Unicode point. Provided:'" + $s$$ + "'", "S06");
  }
};
$jscomp.inherits(Encoded$$module$src$ixmlClasses, Terminal$$module$src$ixmlClasses);
Encoded$$module$src$ixmlClasses.prototype.matches = function $Encoded$$module$src$ixmlClasses$$matches$($c$$) {
  return this.codePoint == $c$$.codePointAt(0);
};
Encoded$$module$src$ixmlClasses.prototype.toXML = function $Encoded$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("literal");
  Terminal$$module$src$ixmlClasses.prototype.toXML.call(this, $e$$);
  $e$$.setAttribute("hex", this.text);
  $parent$$.append($e$$);
};
Encoded$$module$src$ixmlClasses.prototype.display = function $Encoded$$module$src$ixmlClasses$$display$() {
  return Terminal$$module$src$ixmlClasses.prototype.flat.call(this) + "#" + this.text;
};
Encoded$$module$src$ixmlClasses.prototype.flat = function $Encoded$$module$src$ixmlClasses$$flat$() {
  return Terminal$$module$src$ixmlClasses.prototype.flat.call(this) + "#" + this.text + this.flatComments();
};
var Charset$$module$src$ixmlClasses = function $Charset$$module$src$ixmlClasses$($mark$$) {
  Terminal$$module$src$ixmlClasses.call(this, $mark$$);
  this.parts = [];
  this.allParts = [];
  this.tag = "charset";
};
$jscomp.inherits(Charset$$module$src$ixmlClasses, Terminal$$module$src$ixmlClasses);
Charset$$module$src$ixmlClasses.fromXML = function $Charset$$module$src$ixmlClasses$fromXML$($$jscomp$iter$20_element$$, $charSet_exclude$$, $$jscomp$key$c$jscomp$3_mark$$) {
  $charSet_exclude$$ = $charSet_exclude$$ ? new Exclusion$$module$src$ixmlClasses($$jscomp$key$c$jscomp$3_mark$$) : new Inclusion$$module$src$ixmlClasses($$jscomp$key$c$jscomp$3_mark$$);
  $$jscomp$iter$20_element$$ = $jscomp.makeIterator($$jscomp$iter$20_element$$.children);
  for ($$jscomp$key$c$jscomp$3_mark$$ = $$jscomp$iter$20_element$$.next(); !$$jscomp$key$c$jscomp$3_mark$$.done; $$jscomp$key$c$jscomp$3_mark$$ = $$jscomp$iter$20_element$$.next()) {
    $charSet_exclude$$.add(IXMLPart$$module$src$ixmlClasses.fromXML($$jscomp$key$c$jscomp$3_mark$$.value));
  }
  return $charSet_exclude$$;
};
Charset$$module$src$ixmlClasses.prototype.add = function $Charset$$module$src$ixmlClasses$$add$($a$$) {
  this.parts.push($a$$);
  this.allParts.push($a$$);
};
Charset$$module$src$ixmlClasses.prototype.addComment = function $Charset$$module$src$ixmlClasses$$addComment$($comment$$) {
  this.allParts.push($comment$$);
};
Charset$$module$src$ixmlClasses.prototype.visit = function $Charset$$module$src$ixmlClasses$$visit$($visitor$$) {
  this.parts.forEach(function($p$$) {
    return $p$$.visit($visitor$$);
  });
};
Charset$$module$src$ixmlClasses.prototype.toXML = function $Charset$$module$src$ixmlClasses$$toXML$($$jscomp$iter$21_parent$$) {
  var $e$$ = $$jscomp$iter$21_parent$$.ownerDocument.createElement(this.tag);
  Terminal$$module$src$ixmlClasses.prototype.toXML.call(this, $e$$);
  $$jscomp$iter$21_parent$$.append($e$$);
  $$jscomp$iter$21_parent$$ = $jscomp.makeIterator(this.allParts);
  for (var $$jscomp$key$p$$ = $$jscomp$iter$21_parent$$.next(); !$$jscomp$key$p$$.done; $$jscomp$key$p$$ = $$jscomp$iter$21_parent$$.next()) {
    $$jscomp$key$p$$.value.toXML($e$$, !1);
  }
};
Charset$$module$src$ixmlClasses.prototype.matches = function $Charset$$module$src$ixmlClasses$$matches$($c$$) {
  for (var $$jscomp$iter$22$$ = $jscomp.makeIterator(this.parts), $$jscomp$key$v$$ = $$jscomp$iter$22$$.next(); !$$jscomp$key$v$$.done; $$jscomp$key$v$$ = $$jscomp$iter$22$$.next()) {
    if ($$jscomp$key$v$$.value.matches($c$$)) {
      return !0;
    }
  }
  return !1;
};
Charset$$module$src$ixmlClasses.prototype.display = function $Charset$$module$src$ixmlClasses$$display$() {
  return "[" + this.parts.map(function($p$$) {
    return $p$$.display();
  }).join(";") + "]";
};
Charset$$module$src$ixmlClasses.prototype.flat = function $Charset$$module$src$ixmlClasses$$flat$() {
  var $$jscomp$this$$ = this, $s$$ = Terminal$$module$src$ixmlClasses.prototype.flat.call(this) + ("exclusion" == this.tag ? "~" : "") + "[";
  this.allParts.forEach(function($p$$, $index$$) {
    $s$$ += $p$$.flat();
    !($p$$ instanceof CommentX$$module$src$ixmlClasses) && $index$$ < $$jscomp$this$$.allParts.length - 1 && ($s$$ += ";");
  });
  return $s$$ += "]" + this.flatComments();
};
var Inclusion$$module$src$ixmlClasses = function $Inclusion$$module$src$ixmlClasses$($mark$$) {
  Charset$$module$src$ixmlClasses.call(this, $mark$$);
  this.tag = "inclusion";
};
$jscomp.inherits(Inclusion$$module$src$ixmlClasses, Charset$$module$src$ixmlClasses);
Inclusion$$module$src$ixmlClasses.fromXML = Charset$$module$src$ixmlClasses.fromXML;
var Exclusion$$module$src$ixmlClasses = function $Exclusion$$module$src$ixmlClasses$($mark$$) {
  Charset$$module$src$ixmlClasses.call(this, $mark$$);
  this.tag = "exclusion";
};
$jscomp.inherits(Exclusion$$module$src$ixmlClasses, Charset$$module$src$ixmlClasses);
Exclusion$$module$src$ixmlClasses.fromXML = Charset$$module$src$ixmlClasses.fromXML;
Exclusion$$module$src$ixmlClasses.prototype.matches = function $Exclusion$$module$src$ixmlClasses$$matches$($c$$) {
  return !Charset$$module$src$ixmlClasses.prototype.matches.call(this, $c$$);
};
Exclusion$$module$src$ixmlClasses.prototype.display = function $Exclusion$$module$src$ixmlClasses$$display$() {
  return "~" + Charset$$module$src$ixmlClasses.prototype.display.call(this);
};
var Member$$module$src$ixmlClasses = function $Member$$module$src$ixmlClasses$() {
  this.comments = [];
  this.attributeName = this.value = null;
};
Member$$module$src$ixmlClasses.fromXML = function $Member$$module$src$ixmlClasses$fromXML$($element$$) {
  if ($element$$.hasAttribute("string")) {
    return new MemberString$$module$src$ixmlClasses($element$$.getAttribute("string"));
  }
  if ($element$$.hasAttribute("hex")) {
    return new MemberHex$$module$src$ixmlClasses($element$$.getAttribute("hex"));
  }
  if ($element$$.hasAttribute("code")) {
    return new Code$$module$src$ixmlClasses($element$$.getAttribute("code"));
  }
  if ($element$$.hasAttribute("from")) {
    var $fromC$$ = $element$$.getAttribute("from");
    $element$$ = $element$$.getAttribute("to");
    return new RangeX$$module$src$ixmlClasses("#" == $fromC$$[0] ? new MemberHex$$module$src$ixmlClasses($fromC$$.substring(1)) : new MemberString$$module$src$ixmlClasses($fromC$$), "#" == $element$$[0] ? new MemberHex$$module$src$ixmlClasses($element$$.substring(1)) : new MemberString$$module$src$ixmlClasses($element$$));
  }
  grumble$$module$src$ixmlParse("<member/> in XML syntax must have one of @string|@hex|@code|(@from,@to)");
};
Member$$module$src$ixmlClasses.prototype.visit = function $Member$$module$src$ixmlClasses$$visit$($visitor$$, $parent$$) {
  $visitor$$(this, $parent$$);
};
Member$$module$src$ixmlClasses.prototype.display = function $Member$$module$src$ixmlClasses$$display$() {
  return this.value;
};
Member$$module$src$ixmlClasses.prototype.addComment = function $Member$$module$src$ixmlClasses$$addComment$($comment$$) {
  this.comments.push($comment$$);
};
Member$$module$src$ixmlClasses.prototype.toXML = function $Member$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("member");
  $e$$.setAttribute(this.attributeName, this.value);
  $parent$$.append($e$$);
  this.comments.forEach(function($c$$) {
    return $c$$.toXML($e$$);
  });
};
Member$$module$src$ixmlClasses.prototype.flat = function $Member$$module$src$ixmlClasses$$flat$() {
  return this.comments.map(function($c$$) {
    return $c$$.flat();
  }).join("");
};
var MemberString$$module$src$ixmlClasses = function $MemberString$$module$src$ixmlClasses$($s$$) {
  Member$$module$src$ixmlClasses.call(this);
  this.value = $s$$;
  this.attributeName = "string";
};
$jscomp.inherits(MemberString$$module$src$ixmlClasses, Member$$module$src$ixmlClasses);
MemberString$$module$src$ixmlClasses.fromXML = Member$$module$src$ixmlClasses.fromXML;
MemberString$$module$src$ixmlClasses.prototype.getCodePoint = function $MemberString$$module$src$ixmlClasses$$getCodePoint$() {
  return this.value.codePointAt(0);
};
MemberString$$module$src$ixmlClasses.prototype.matches = function $MemberString$$module$src$ixmlClasses$$matches$($c$$) {
  return this.value.includes($c$$);
};
MemberString$$module$src$ixmlClasses.prototype.flat = function $MemberString$$module$src$ixmlClasses$$flat$() {
  return '"' + this.value + '"' + Member$$module$src$ixmlClasses.prototype.flat.call(this);
};
MemberString$$module$src$ixmlClasses.prototype.rangeValue = function $MemberString$$module$src$ixmlClasses$$rangeValue$() {
  return this.value;
};
var MemberHex$$module$src$ixmlClasses = function $MemberHex$$module$src$ixmlClasses$($s$$) {
  Member$$module$src$ixmlClasses.call(this);
  this.value = $s$$;
  this.codePoint = parseInt($s$$, 16);
  this.attributeName = "hex";
};
$jscomp.inherits(MemberHex$$module$src$ixmlClasses, Member$$module$src$ixmlClasses);
MemberHex$$module$src$ixmlClasses.fromXML = Member$$module$src$ixmlClasses.fromXML;
MemberHex$$module$src$ixmlClasses.prototype.getCodePoint = function $MemberHex$$module$src$ixmlClasses$$getCodePoint$() {
  return this.codePoint;
};
MemberHex$$module$src$ixmlClasses.prototype.matches = function $MemberHex$$module$src$ixmlClasses$$matches$($c$$) {
  return this.codePoint == $c$$.codePointAt(0);
};
MemberHex$$module$src$ixmlClasses.prototype.display = function $MemberHex$$module$src$ixmlClasses$$display$() {
  return this.flat();
};
MemberHex$$module$src$ixmlClasses.prototype.flat = function $MemberHex$$module$src$ixmlClasses$$flat$() {
  return "#" + this.value + "|" + String.fromCodePoint(this.codePoint) + "|" + Member$$module$src$ixmlClasses.prototype.flat.call(this);
};
MemberHex$$module$src$ixmlClasses.prototype.rangeValue = function $MemberHex$$module$src$ixmlClasses$$rangeValue$() {
  return "#" + this.value;
};
var RangeX$$module$src$ixmlClasses = function $RangeX$$module$src$ixmlClasses$($fromChar$$, $toChar$$) {
  Member$$module$src$ixmlClasses.call(this);
  ($fromChar$$ instanceof MemberString$$module$src$ixmlClasses && 1 != $fromChar$$.value.length || $toChar$$ instanceof MemberString$$module$src$ixmlClasses && 1 != $toChar$$.value.length) && grumble$$module$src$ixmlParse("The start and end of a charset range must each be exactly one character", "S09");
  this.fromChar = $fromChar$$;
  this.toChar = $toChar$$;
  this.fromCP = $fromChar$$.getCodePoint();
  this.toCP = $toChar$$.getCodePoint();
  this.toCP <= this.fromCP && grumble$$module$src$ixmlParse("The start character of a charset range must have a code point value less than that of the end", "S09");
};
$jscomp.inherits(RangeX$$module$src$ixmlClasses, Member$$module$src$ixmlClasses);
RangeX$$module$src$ixmlClasses.fromXML = Member$$module$src$ixmlClasses.fromXML;
RangeX$$module$src$ixmlClasses.prototype.matches = function $RangeX$$module$src$ixmlClasses$$matches$($c$$) {
  $c$$ = $c$$.codePointAt(0);
  return this.fromCP <= $c$$ && $c$$ <= this.toCP;
};
RangeX$$module$src$ixmlClasses.prototype.display = function $RangeX$$module$src$ixmlClasses$$display$() {
  return this.flat();
};
RangeX$$module$src$ixmlClasses.prototype.toXML = function $RangeX$$module$src$ixmlClasses$$toXML$($parent$$) {
  var $e$$ = $parent$$.ownerDocument.createElement("member");
  $e$$.setAttribute("from", this.fromChar.rangeValue());
  $e$$.setAttribute("to", this.toChar.rangeValue());
  this.comments.forEach(function($c$$) {
    return $c$$.toXML($e$$);
  });
  $parent$$.append($e$$);
};
RangeX$$module$src$ixmlClasses.prototype.flat = function $RangeX$$module$src$ixmlClasses$$flat$() {
  return this.fromChar.flat() + "-" + this.toChar.flat() + Member$$module$src$ixmlClasses.prototype.flat.call(this);
};
var Code$$module$src$ixmlClasses = function $Code$$module$src$ixmlClasses$($code$$) {
  Member$$module$src$ixmlClasses.call(this);
  this.value = $code$$;
  try {
    this.regex = new RegExp("\\p{" + $code$$ + "}", "u");
  } catch ($e$$) {
    grumble$$module$src$ixmlParse("'" + $code$$ + "' is not a valid Unicode character class", "S10");
  }
  this.attributeName = "code";
};
$jscomp.inherits(Code$$module$src$ixmlClasses, Member$$module$src$ixmlClasses);
Code$$module$src$ixmlClasses.fromXML = Member$$module$src$ixmlClasses.fromXML;
Code$$module$src$ixmlClasses.prototype.matches = function $Code$$module$src$ixmlClasses$$matches$($c$$) {
  return this.regex.test($c$$);
};
Code$$module$src$ixmlClasses.prototype.flat = function $Code$$module$src$ixmlClasses$$flat$() {
  return this.value + Member$$module$src$ixmlClasses.prototype.flat.call(this);
};
var module$src$ixmlClasses = {};
module$src$ixmlClasses.IXMLPart = IXMLPart$$module$src$ixmlClasses;
module$src$ixmlClasses.Prolog = Prolog$$module$src$ixmlClasses;
module$src$ixmlClasses.Version = Version$$module$src$ixmlClasses;
module$src$ixmlClasses.Rule = Rule$$module$src$ixmlClasses;
module$src$ixmlClasses.CommentX = CommentX$$module$src$ixmlClasses;
module$src$ixmlClasses.Alts = Alts$$module$src$ixmlClasses;
module$src$ixmlClasses.Alt = Alt$$module$src$ixmlClasses;
module$src$ixmlClasses.Empty = Empty$$module$src$ixmlClasses;
module$src$ixmlClasses.Multiple = Multiple$$module$src$ixmlClasses;
module$src$ixmlClasses.OptionX = OptionX$$module$src$ixmlClasses;
module$src$ixmlClasses.Repeat0 = Repeat0$$module$src$ixmlClasses;
module$src$ixmlClasses.Repeat1 = Repeat1$$module$src$ixmlClasses;
module$src$ixmlClasses.Separator = Separator$$module$src$ixmlClasses;
module$src$ixmlClasses.Terminal = Terminal$$module$src$ixmlClasses;
module$src$ixmlClasses.NonTerminal = NonTerminal$$module$src$ixmlClasses;
module$src$ixmlClasses.Insertion = Insertion$$module$src$ixmlClasses;
module$src$ixmlClasses.Quoted = Quoted$$module$src$ixmlClasses;
module$src$ixmlClasses.Encoded = Encoded$$module$src$ixmlClasses;
module$src$ixmlClasses.Charset = Charset$$module$src$ixmlClasses;
module$src$ixmlClasses.Inclusion = Inclusion$$module$src$ixmlClasses;
module$src$ixmlClasses.Exclusion = Exclusion$$module$src$ixmlClasses;
module$src$ixmlClasses.MemberString = MemberString$$module$src$ixmlClasses;
module$src$ixmlClasses.MemberHex = MemberHex$$module$src$ixmlClasses;
module$src$ixmlClasses.RangeX = RangeX$$module$src$ixmlClasses;
module$src$ixmlClasses.Code = Code$$module$src$ixmlClasses;
// Input 2
var Tracker$$module$src$ixmlParse = function $Tracker$$module$src$ixmlParse$() {
  this.input = "";
  this.inputLength = this.inputOffset = 0;
  this.colNumber = this.lineNumber = 1;
  this.c = null;
  this.line = "";
  this.lines = null;
  this.savedPositions = [];
};
Tracker$$module$src$ixmlParse.prototype.track = function $Tracker$$module$src$ixmlParse$$track$($source$$) {
  this.input = $source$$;
  this.inputLength = $source$$.length;
  this.lines = $source$$.split(/\n/);
  $source$$.startsWith("\n") && this.lineNumber++;
};
Tracker$$module$src$ixmlParse.prototype.getPoint = function $Tracker$$module$src$ixmlParse$$getPoint$() {
  return this.inputOffset;
};
Tracker$$module$src$ixmlParse.prototype.setPoint = function $Tracker$$module$src$ixmlParse$$setPoint$($point$$) {
  this.inputOffset = $point$$;
};
Tracker$$module$src$ixmlParse.prototype.savePlace = function $Tracker$$module$src$ixmlParse$$savePlace$() {
  this.savedPositions.push({offset:this.inputOffset, line:this.lineNumber, col:this.colNumber});
};
Tracker$$module$src$ixmlParse.prototype.restorePlace = function $Tracker$$module$src$ixmlParse$$restorePlace$() {
  var $p$$ = this.savedPositions.pop();
  this.inputOffset = $p$$.offset;
  this.lineNumber = $p$$.line;
  this.colNumber = $p$$.col;
};
Tracker$$module$src$ixmlParse.prototype.discardPlace = function $Tracker$$module$src$ixmlParse$$discardPlace$() {
  this.savedPositions.pop();
};
Tracker$$module$src$ixmlParse.prototype.advancePlace = function $Tracker$$module$src$ixmlParse$$advancePlace$($nChars$$) {
  for (; $nChars$$--;) {
    this.next();
  }
};
Tracker$$module$src$ixmlParse.prototype.getChar = function $Tracker$$module$src$ixmlParse$$getChar$() {
  return this.input.charAt(this.inputOffset);
};
Tracker$$module$src$ixmlParse.prototype.getLine = function $Tracker$$module$src$ixmlParse$$getLine$($lineNo$$) {
  return this.lines[$lineNo$$ - 1];
};
Tracker$$module$src$ixmlParse.prototype.hasInput = function $Tracker$$module$src$ixmlParse$$hasInput$() {
  return this.inputOffset < this.inputLength;
};
Tracker$$module$src$ixmlParse.prototype.next = function $Tracker$$module$src$ixmlParse$$next$() {
  this.inputOffset == this.inputLength && grumble$$module$src$ixmlParse("End of input");
  this.inputOffset += 1;
  this.c = this.input.charAt(this.inputOffset);
  this.line += this.c;
  /\n/.test(this.c) && (this.lineNumber++, this.colNumber = 0, this.line = "");
  this.colNumber++;
  return this.c;
};
Tracker$$module$src$ixmlParse.prototype.matches = function $Tracker$$module$src$ixmlParse$$matches$($pattern$$) {
  return this.input.substring(this.inputOffset).match($pattern$$);
};
Tracker$$module$src$ixmlParse.prototype.locationString = function $Tracker$$module$src$ixmlParse$$locationString$() {
  return "line " + this.lineNumber + ", column " + this.colNumber;
};
Tracker$$module$src$ixmlParse.prototype.location = function $Tracker$$module$src$ixmlParse$$location$() {
  return {line:this.lineNumber, col:this.colNumber};
};
Tracker$$module$src$ixmlParse.prototype.sample = function $Tracker$$module$src$ixmlParse$$sample$() {
  return this.line;
};
Tracker$$module$src$ixmlParse.prototype.expect = function $Tracker$$module$src$ixmlParse$$expect$($c$$, $message$$) {
  $message$$ = void 0 === $message$$ ? "" : $message$$;
  $c$$ != this.getChar() && this.grumbleNear($message$$ + "Expecting character:'" + $c$$ + "', given:'" + this.getChar() + "' (codepoint " + this.getChar().codePointAt(0) + ")", "G000");
  this.next();
};
Tracker$$module$src$ixmlParse.prototype.expectOneOf = function $Tracker$$module$src$ixmlParse$$expectOneOf$($pattern$jscomp$5_s$$, $message$$) {
  $message$$ = void 0 === $message$$ ? "" : $message$$;
  $pattern$jscomp$5_s$$.includes(this.getChar()) || ($pattern$jscomp$5_s$$ = $pattern$jscomp$5_s$$.split("").map(function($c$$) {
    return "'" + $c$$ + "'";
  }).join(","), this.grumbleNear($message$$ + "Expecting one of " + $pattern$jscomp$5_s$$ + " - given:'" + this.getChar() + "' (codepoint " + this.getChar().codePointAt(0) + ")", "G000"));
  this.next();
};
Tracker$$module$src$ixmlParse.prototype.grumbleNear = function $Tracker$$module$src$ixmlParse$$grumbleNear$($message$$, $code$$) {
  $code$$ = void 0 === $code$$ ? "ABCD" : $code$$;
  var $pos$$ = this.location();
  $message$$ += ".\nNear " + this.locationString() + ".\n";
  $message$$ += this.getLine($pos$$.line) + "\n";
  $message$$ += " ".repeat($pos$$.col - 1) + "^\n";
  grumble$$module$src$ixmlParse($message$$, $code$$);
};
function grumble$$module$src$ixmlParse($e$jscomp$23_message$$, $code$$, $location$$) {
  $location$$ = void 0 === $location$$ ? null : $location$$;
  $e$jscomp$23_message$$ = new SaxonJS.XError($e$jscomp$23_message$$, "Q{http://invisiblexml.org/NS}" + (void 0 === $code$$ ? "ABCD" : $code$$));
  $location$$ && ($e$jscomp$23_message$$.xsltLineNr = $location$$.line);
  throw $e$jscomp$23_message$$;
}
function parse$$module$src$ixmlParse($grammarString$$) {
  return (new ixmlParser$$module$src$ixmlParse).parse($grammarString$$);
}
function parseFromXML$$module$src$ixmlParse($xml$$) {
  return (new ixmlParser$$module$src$ixmlParse).parseXML($xml$$);
}
function compile$$module$src$ixmlParse($grammar$jscomp$1_grammarString$$) {
  $grammar$jscomp$1_grammarString$$ = parse$$module$src$ixmlParse($grammar$jscomp$1_grammarString$$);
  $grammar$jscomp$1_grammarString$$.compile();
  return $grammar$jscomp$1_grammarString$$;
}
function compileFromXML$$module$src$ixmlParse($grammar$$) {
  $grammar$$ = parseFromXML$$module$src$ixmlParse($grammar$$);
  $grammar$$.compile();
  return $grammar$$;
}
var ixmlParser$$module$src$ixmlParse = function $ixmlParser$$module$src$ixmlParse$() {
  this.grammarString = this.tracker = null;
};
ixmlParser$$module$src$ixmlParse.prototype.grumbleNear = function $ixmlParser$$module$src$ixmlParse$$grumbleNear$($message$$, $code$$) {
  this.tracker.grumbleNear($message$$, void 0 === $code$$ ? "G000" : $code$$);
};
ixmlParser$$module$src$ixmlParse.prototype.hasInput = function $ixmlParser$$module$src$ixmlParse$$hasInput$() {
  return this.tracker.hasInput();
};
ixmlParser$$module$src$ixmlParse.prototype.getChar = function $ixmlParser$$module$src$ixmlParse$$getChar$() {
  return this.tracker.getChar();
};
ixmlParser$$module$src$ixmlParse.prototype.next = function $ixmlParser$$module$src$ixmlParse$$next$() {
  return this.tracker.next();
};
ixmlParser$$module$src$ixmlParse.prototype.expect = function $ixmlParser$$module$src$ixmlParse$$expect$($c$$, $message$$) {
  return this.tracker.expect($c$$, $message$$);
};
ixmlParser$$module$src$ixmlParse.prototype.expectOneOf = function $ixmlParser$$module$src$ixmlParse$$expectOneOf$($c$$, $message$$) {
  return this.tracker.expectOneOf($c$$, $message$$);
};
ixmlParser$$module$src$ixmlParse.prototype.matches = function $ixmlParser$$module$src$ixmlParse$$matches$($pattern$$) {
  return this.tracker.matches($pattern$$);
};
ixmlParser$$module$src$ixmlParse.prototype.savePlace = function $ixmlParser$$module$src$ixmlParse$$savePlace$() {
  this.tracker.savePlace();
};
ixmlParser$$module$src$ixmlParse.prototype.restorePlace = function $ixmlParser$$module$src$ixmlParse$$restorePlace$() {
  this.tracker.restorePlace();
};
ixmlParser$$module$src$ixmlParse.prototype.advancePlace = function $ixmlParser$$module$src$ixmlParse$$advancePlace$($nChars$$) {
  this.tracker.advancePlace($nChars$$);
};
ixmlParser$$module$src$ixmlParse.prototype.untilChar = function $ixmlParser$$module$src$ixmlParse$$untilChar$($quoteChar$$) {
  for (var $value$$ = "", $c$$ = this.getChar(); $c$$ != $quoteChar$$;) {
    $value$$ += $c$$, this.hasInput() || this.grumbleNear("Unterminated string " + $quoteChar$$ + "..."), $c$$ = this.next();
  }
  return $value$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parse = function $ixmlParser$$module$src$ixmlParse$$parse$($grammarString$$) {
  var $startTime$$ = performance.now();
  this.grammarString = $grammarString$$;
  var $tracker$$ = new Tracker$$module$src$ixmlParse;
  this.tracker = $tracker$$;
  $tracker$$.track($grammarString$$);
  try {
    var $parts$$ = this.parseIXML(), $grammar$$ = new Grammar$$module$src$ixmlGrammar($parts$$);
    $grammar$$.parseTime = performance.now() - $startTime$$;
    return $grammar$$;
  } catch ($e$$) {
    if ($e$$ instanceof SaxonJS.XError) {
      throw $e$$;
    }
    this.grumbleNear($e$$.message, $e$$.code);
  }
};
ixmlParser$$module$src$ixmlParse.prototype.parseXML = function $ixmlParser$$module$src$ixmlParse$$parseXML$($$jscomp$iter$23_grammarXML$$) {
  var $startTime$$ = performance.now();
  $$jscomp$iter$23_grammarXML$$ instanceof Document && "ixml" == $$jscomp$iter$23_grammarXML$$.firstChild.nodeName || grumble$$module$src$ixmlParse("An ixml grammar in XML format must be supplied as a document-node(element(ixml))");
  var $grammar$jscomp$4_parts$$ = [];
  $$jscomp$iter$23_grammarXML$$ = $jscomp.makeIterator($$jscomp$iter$23_grammarXML$$.firstChild.children);
  for (var $$jscomp$key$c$$ = $$jscomp$iter$23_grammarXML$$.next(); !$$jscomp$key$c$$.done; $$jscomp$key$c$$ = $$jscomp$iter$23_grammarXML$$.next()) {
    $grammar$jscomp$4_parts$$.push(IXMLPart$$module$src$ixmlClasses.fromXML($$jscomp$key$c$$.value));
  }
  $grammar$jscomp$4_parts$$ = new Grammar$$module$src$ixmlGrammar($grammar$jscomp$4_parts$$);
  $grammar$jscomp$4_parts$$.parseTime = performance.now() - $startTime$$;
  return $grammar$jscomp$4_parts$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseIXML = function $ixmlParser$$module$src$ixmlParse$$parseIXML$() {
  var $parts$$ = this.parseOptWhitespace(), $prolog_rules$$ = this.parseProlog();
  $prolog_rules$$ && $parts$$.push($prolog_rules$$);
  $prolog_rules$$ = this.parseRules();
  $parts$$ = $parts$$.concat($prolog_rules$$);
  return $parts$$ = $parts$$.concat(this.parseOptWhitespace());
};
ixmlParser$$module$src$ixmlParse.prototype.parseOptWhitespace = function $ixmlParser$$module$src$ixmlParse$$parseOptWhitespace$($target$$) {
  $target$$ = void 0 === $target$$ ? null : $target$$;
  for (var $comments$$ = [], $c$$ = this.getChar(); /\s/.test($c$$);) {
    $c$$ = this.next();
  }
  "{" == $c$$ && ($comments$$.push(this.parseComment()), this.parseOptWhitespace().forEach(function($p$$) {
    return $comments$$.push($p$$);
  }));
  $target$$ && $comments$$.forEach(function($co$$) {
    return $target$$.addComment($co$$);
  });
  return $comments$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseRequiredWhitespace = function $ixmlParser$$module$src$ixmlParse$$parseRequiredWhitespace$($target$$) {
  $target$$ = void 0 === $target$$ ? null : $target$$;
  var $c$$ = this.getChar();
  if (/\s|\{/.test($c$$)) {
    return this.parseOptWhitespace($target$$);
  }
  this.grumbleNear("Must have whitespace, given: '" + $c$$ + "' codepoint(" + $c$$.codePointAt(0) + ")", "S01");
};
ixmlParser$$module$src$ixmlParse.prototype.parseComment = function $ixmlParser$$module$src$ixmlParse$$parseComment$() {
  var $parts$$ = [], $comment$$ = "";
  this.expect("{");
  for (var $c$$ = this.getChar(); "}" != $c$$;) {
    "{" == $c$$ ? ("" != $comment$$ && $parts$$.push($comment$$), $parts$$.push(this.parseComment()), $comment$$ = "", $c$$ = this.getChar()) : ($comment$$ += $c$$, this.hasInput() || this.grumbleNear("Unterminated comment"), $c$$ = this.next());
  }
  "" != $comment$$ && $parts$$.push($comment$$);
  this.expect("}");
  return new CommentX$$module$src$ixmlClasses($parts$$);
};
ixmlParser$$module$src$ixmlParse.prototype.parseProlog = function $ixmlParser$$module$src$ixmlParse$$parseProlog$() {
  switch(this.getChar()) {
    case "i":
      var $version$$ = this.parseVersion();
  }
  return $version$$ ? (this.parseOptWhitespace(), new Prolog$$module$src$ixmlClasses($version$$)) : null;
};
ixmlParser$$module$src$ixmlParse.prototype.parseVersion = function $ixmlParser$$module$src$ixmlParse$$parseVersion$() {
  this.savePlace();
  var $found_version$$ = this.matches(/ixml/);
  if ($found_version$$ && (this.advancePlace($found_version$$[0].length), /\s|\{/.test(this.getChar()))) {
    var $comments$$ = this.parseRequiredWhitespace();
    if ($found_version$$ = this.matches(/version/)) {
      this.advancePlace($found_version$$[0].length);
      $comments$$ = $comments$$.concat(this.parseRequiredWhitespace());
      /'|"/.test(this.getChar()) || this.grumbleNear("Invalid version declaration", "G000");
      $found_version$$ = this.parseQuoted(this.getChar());
      $comments$$ = $comments$$.concat(this.parseOptWhitespace());
      this.expect(".", "Invalid version declaration. ", "G000");
      var $v$$ = new Version$$module$src$ixmlClasses($found_version$$.value);
      $comments$$.forEach(function($c$$) {
        return $v$$.comments.push($c$$);
      });
      return $v$$;
    }
  }
  this.restorePlace();
  return null;
};
ixmlParser$$module$src$ixmlParse.prototype.parseRules = function $ixmlParser$$module$src$ixmlParse$$parseRules$() {
  for (var $parts$$ = []; this.hasInput();) {
    $parts$$.push(this.parseRule()), this.hasInput() && ($parts$$ = $parts$$.concat(this.parseRequiredWhitespace()));
  }
  return $parts$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseRule = function $ixmlParser$$module$src$ixmlParse$$parseRule$() {
  var $mark$$ = null, $comments$$ = [], $c$jscomp$38_name$$ = this.getChar();
  /@|-|\^/.test($c$jscomp$38_name$$) && ($mark$$ = $c$jscomp$38_name$$, $c$jscomp$38_name$$ = this.next(), this.parseOptWhitespace().forEach(function($c$$) {
    return $comments$$.push($c$$);
  }));
  $c$jscomp$38_name$$ = this.parseName();
  this.parseOptWhitespace().forEach(function($c$$) {
    return $comments$$.push($c$$);
  });
  this.expectOneOf(":=", "Invalid rule syntax. ");
  this.parseOptWhitespace().forEach(function($c$$) {
    return $comments$$.push($c$$);
  });
  var $definition$$ = this.parseAlts();
  this.expect(".", "Invalid rule syntax. ");
  var $rule$$ = new Rule$$module$src$ixmlClasses($c$jscomp$38_name$$, $definition$$, $mark$$);
  $comments$$.forEach(function($c$$) {
    return $rule$$.addComment($c$$);
  });
  return $rule$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseName = function $ixmlParser$$module$src$ixmlParse$$parseName$() {
  var $name$$ = new RegExp(/\p{L}|_/, "u");
  var $c$$ = this.getChar();
  $name$$.test($c$$) || this.grumbleNear("'" + $c$$ + "' (codepoint " + $c$$.codePointAt(0) + ") is not a valid name character");
  $name$$ = $c$$;
  for ($c$$ = this.next(); /\w|\-/.test($c$$);) {
    $name$$ += $c$$, $c$$ = this.next();
  }
  return $name$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseAlts = function $ixmlParser$$module$src$ixmlParse$$parseAlts$() {
  var $a$$ = new Alts$$module$src$ixmlClasses, $alt$jscomp$1_c$$ = this.getChar();
  ($alt$jscomp$1_c$$ = /;|\|/.test($alt$jscomp$1_c$$) ? new Empty$$module$src$ixmlClasses : this.parseAlt()) && $a$$.add($alt$jscomp$1_c$$);
  for ($alt$jscomp$1_c$$ = this.getChar(); /;|\|/.test($alt$jscomp$1_c$$);) {
    this.next(), this.parseOptWhitespace($a$$), $alt$jscomp$1_c$$ = this.getChar(), /;|\|/.test($alt$jscomp$1_c$$) ? $a$$.add(new Empty$$module$src$ixmlClasses) : ($a$$.add(this.parseAlt()), this.parseOptWhitespace($a$$), $alt$jscomp$1_c$$ = this.getChar());
  }
  return $a$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseAlt = function $ixmlParser$$module$src$ixmlParse$$parseAlt$() {
  var $a$$ = new Alt$$module$src$ixmlClasses, $c$jscomp$45_term$$ = this.parseTerm();
  $c$jscomp$45_term$$ && $a$$.add($c$jscomp$45_term$$);
  for ($c$jscomp$45_term$$ = this.getChar(); /,/.test($c$jscomp$45_term$$);) {
    this.next(), this.parseOptWhitespace($a$$), ($c$jscomp$45_term$$ = this.parseTerm()) || this.grumbleNear("Invalid start of term"), $a$$.add($c$jscomp$45_term$$), $c$jscomp$45_term$$ = this.getChar();
  }
  return $a$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseTerm = function $ixmlParser$$module$src$ixmlParse$$parseTerm$() {
  var $c$jscomp$46_sep$$ = this.getChar(), $mark$jscomp$29_n$$ = null;
  /@|-|\^|\+/.test($c$jscomp$46_sep$$) && ($mark$jscomp$29_n$$ = $c$jscomp$46_sep$$, this.next(), this.parseOptWhitespace(), $c$jscomp$46_sep$$ = this.getChar());
  if ("+" == $mark$jscomp$29_n$$) {
    return this.parseInsertion();
  }
  switch($c$jscomp$46_sep$$) {
    case "(":
      $mark$jscomp$29_n$$ && this.grumbleNear("No marker permitted on bracketed constructs (factor), given '" + $mark$jscomp$29_n$$ + "'", "S006");
      var $term$$ = this.parseBracketed();
      break;
    case ")":
      return null;
    case '"':
      $term$$ = this.parseQuoted($c$jscomp$46_sep$$);
      break;
    case "'":
      $term$$ = this.parseQuoted($c$jscomp$46_sep$$);
      break;
    case "#":
      $term$$ = this.parseEncoded();
      break;
    case "[":
      $term$$ = this.parseSet(!1);
      break;
    case "~":
      this.next();
      this.parseOptWhitespace();
      $term$$ = this.parseSet(!0);
      break;
    case ".":
      break;
    default:
      $term$$ = this.parseNonTerminal();
  }
  $mark$jscomp$29_n$$ && ($term$$ instanceof Terminal$$module$src$ixmlClasses && "@" == $mark$jscomp$29_n$$ && this.grumbleNear("The only permitted mark for a terminal is '-', '+' or '^', given '" + $mark$jscomp$29_n$$ + "'", "S04"), "+" != $mark$jscomp$29_n$$ || $term$$ instanceof Terminal$$module$src$ixmlClasses && !($term$$ instanceof Charset$$module$src$ixmlClasses) || this.grumbleNear("The insertion mark '+' is only permitted on quoted or encoded literals", "S05"), $term$$.mark = $mark$jscomp$29_n$$);
  $c$jscomp$46_sep$$ = this.getChar();
  var $possibleSeparator$$ = !1;
  switch($c$jscomp$46_sep$$) {
    case "*":
      $term$$ = new Repeat0$$module$src$ixmlClasses($term$$, $mark$jscomp$29_n$$);
      $possibleSeparator$$ = !0;
      this.next();
      break;
    case "+":
      $term$$ = new Repeat1$$module$src$ixmlClasses($term$$, $mark$jscomp$29_n$$);
      $possibleSeparator$$ = !0;
      this.next();
      break;
    case "?":
      $term$$ = new OptionX$$module$src$ixmlClasses($term$$, $mark$jscomp$29_n$$), this.next(), this.parseOptWhitespace($term$$);
  }
  $possibleSeparator$$ && ($mark$jscomp$29_n$$ = this.getChar(), $c$jscomp$46_sep$$ == $mark$jscomp$29_n$$ ? (this.next(), this.parseOptWhitespace($term$$), $c$jscomp$46_sep$$ = new Separator$$module$src$ixmlClasses(this.parseTerm(), null), $term$$.setSeparator($c$jscomp$46_sep$$)) : this.parseOptWhitespace($term$$));
  return $term$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseBracketed = function $ixmlParser$$module$src$ixmlParse$$parseBracketed$() {
  this.expect("(");
  this.parseOptWhitespace();
  var $term$$ = this.parseAlts();
  this.expect(")");
  this.parseOptWhitespace();
  return $term$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseQuoted = function $ixmlParser$$module$src$ixmlParse$$parseQuoted$($q_quoteChar$$) {
  this.next();
  var $c$$, $value$$ = this.untilChar($q_quoteChar$$);
  for ($c$$ = this.next(); $c$$ == $q_quoteChar$$;) {
    $value$$ += $q_quoteChar$$, this.next(), $value$$ += this.untilChar($q_quoteChar$$), $c$$ = this.next();
  }
  0 == $value$$.length && this.grumbleNear("A literal string may not be empty", "G00");
  $value$$.includes("\n") && this.grumbleNear("A literal string may not contain a linebreak", "S11");
  $q_quoteChar$$ = new Quoted$$module$src$ixmlClasses($value$$, null);
  this.parseOptWhitespace($q_quoteChar$$);
  return $q_quoteChar$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseEncoded = function $ixmlParser$$module$src$ixmlParse$$parseEncoded$() {
  var $enc_value$$ = "";
  this.expect("#");
  for (var $c$$ = this.getChar(); /[0-9]|[A-F]|[a-f]/.test($c$$);) {
    $enc_value$$ += $c$$, $c$$ = this.next();
  }
  "" == $enc_value$$ && this.grumbleNear("An encoded character must have one or more hexadecimal digits following the # character", "S06");
  $c$$ = parseInt($enc_value$$, 16);
  var $r$$ = $c$$ % 65536;
  1114111 < $c$$ && this.grumbleNear("An encoded character must have a hexadecimal value within the Unicode point range", "S07");
  (55296 < $c$$ && 57343 >= $c$$ || 65534 == $r$$ || 65535 == $r$$) && this.grumbleNear("An encoded character must not denote a Unicode noncharacter or surrogate code point", "S08");
  try {
    String.fromCodePoint($c$$);
  } catch ($e$$) {
    this.grumbleNear("An encoded character must have a hexadecimal value within the Unicode point range", "S0Z7");
  }
  $enc_value$$ = new Encoded$$module$src$ixmlClasses($enc_value$$, null);
  this.parseOptWhitespace($enc_value$$);
  return $enc_value$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseInsertion = function $ixmlParser$$module$src$ixmlParse$$parseInsertion$() {
  var $c$jscomp$49_enc$$ = this.getChar();
  if ("#" == $c$jscomp$49_enc$$) {
    return $c$jscomp$49_enc$$ = this.parseEncoded(), new Insertion$$module$src$ixmlClasses($c$jscomp$49_enc$$.text, !0);
  }
  $c$jscomp$49_enc$$ = this.parseQuoted($c$jscomp$49_enc$$);
  return new Insertion$$module$src$ixmlClasses($c$jscomp$49_enc$$.value, !1);
};
ixmlParser$$module$src$ixmlParse.prototype.parseNonTerminal = function $ixmlParser$$module$src$ixmlParse$$parseNonTerminal$() {
  var $nt_value$$ = this.parseName();
  $nt_value$$ = new NonTerminal$$module$src$ixmlClasses($nt_value$$, null);
  this.parseOptWhitespace($nt_value$$);
  return $nt_value$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseSet = function $ixmlParser$$module$src$ixmlParse$$parseSet$($a$jscomp$13_exclude$$) {
  $a$jscomp$13_exclude$$ = $a$jscomp$13_exclude$$ ? new Exclusion$$module$src$ixmlClasses(null) : new Inclusion$$module$src$ixmlClasses(null);
  this.expect("[");
  this.parseOptWhitespace($a$jscomp$13_exclude$$);
  var $c$$ = this.parseMember();
  if (!$c$$) {
    return $c$$ = this.getChar(), /\]/.test($c$$) || this.grumbleNear("No closing square bracket on charset. Provided:'" + $c$$ + "'", "G00"), this.next(), $a$jscomp$13_exclude$$;
  }
  this.parseOptWhitespace($c$$);
  $a$jscomp$13_exclude$$.add($c$$);
  for ($c$$ = this.getChar(); /;|\|/.test($c$$);) {
    this.next(), this.parseOptWhitespace($a$jscomp$13_exclude$$), $c$$ = this.parseMember(), $a$jscomp$13_exclude$$.add($c$$), this.parseOptWhitespace($c$$), $c$$ = this.getChar();
  }
  /\]/.test($c$$) || this.grumbleNear("No closing square bracket on charset. Provided:'" + $c$$ + "'", "G00");
  this.next();
  this.parseOptWhitespace($a$jscomp$13_exclude$$);
  return $a$jscomp$13_exclude$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseMember = function $ixmlParser$$module$src$ixmlParse$$parseMember$() {
  var $c$jscomp$51_toChar$$ = this.getChar();
  if (/[A-Z]/.test($c$jscomp$51_toChar$$)) {
    return this.parseCode();
  }
  var $m$$ = this.parseStringHex();
  this.parseOptWhitespace($m$$);
  $c$jscomp$51_toChar$$ = this.getChar();
  return "-" == $c$jscomp$51_toChar$$ ? (this.next(), this.parseOptWhitespace(), ($c$jscomp$51_toChar$$ = this.parseStringHex()) || this.grumbleNear("Missing 'to' character of a character range", "G00"), new RangeX$$module$src$ixmlClasses($m$$, $c$jscomp$51_toChar$$)) : $m$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseStringHex = function $ixmlParser$$module$src$ixmlParse$$parseStringHex$() {
  var $c$$ = this.getChar();
  if ("#" == $c$$) {
    return this.parseMemberHex();
  }
  if ('"' == $c$$ || "'" == $c$$) {
    return this.parseMemberString();
  }
};
ixmlParser$$module$src$ixmlParse.prototype.parseCode = function $ixmlParser$$module$src$ixmlParse$$parseCode$() {
  var $co$jscomp$1_code$$ = this.getChar(), $c$$ = this.next();
  /[a-z]/.test($c$$) && ($co$jscomp$1_code$$ += $c$$, $c$$ = this.next(), /[A-Za-z]/.test($c$$) && this.grumbleNear("A Unicode character category code must match [A-Z][a-z]?. Provided: '" + $co$jscomp$1_code$$ + $c$$ + "'", "S10"));
  /\s|;|\||\]/.test($c$$) || this.grumbleNear("A Unicode character category code must match [A-Z][a-z]?. Provided: '" + $co$jscomp$1_code$$ + $c$$ + "'", "S10");
  $co$jscomp$1_code$$ = new Code$$module$src$ixmlClasses($co$jscomp$1_code$$);
  this.parseOptWhitespace($co$jscomp$1_code$$);
  return $co$jscomp$1_code$$;
};
ixmlParser$$module$src$ixmlParse.prototype.parseMemberString = function $ixmlParser$$module$src$ixmlParse$$parseMemberString$() {
  for (var $value$$ = "", $quoteChar$$ = this.getChar(), $c$$ = this.next(); $c$$ != $quoteChar$$;) {
    $value$$ += $c$$, $c$$ = this.next();
  }
  this.next();
  return new MemberString$$module$src$ixmlClasses($value$$);
};
ixmlParser$$module$src$ixmlParse.prototype.parseMemberHex = function $ixmlParser$$module$src$ixmlParse$$parseMemberHex$() {
  var $value$$ = "";
  this.expect("#");
  for (var $c$$ = this.getChar(); /[0-9]|[A-F]|[a-f]/.test($c$$);) {
    $value$$ += $c$$, $c$$ = this.next();
  }
  return new MemberHex$$module$src$ixmlClasses($value$$);
};
var module$src$ixmlParse = {};
module$src$ixmlParse.grumble = grumble$$module$src$ixmlParse;
module$src$ixmlParse.parse = parse$$module$src$ixmlParse;
module$src$ixmlParse.parseFromXML = parseFromXML$$module$src$ixmlParse;
module$src$ixmlParse.compile = compile$$module$src$ixmlParse;
module$src$ixmlParse.compileFromXML = compileFromXML$$module$src$ixmlParse;

