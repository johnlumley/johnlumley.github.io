declare function sum($input as (xs:integer | array(xs:integer))+) as xs:integer {
    typeswitch ($input) {
      case array(xs:integer) return fn:sum($input?*)
      default return fn:sum($input)
    }
};

sum((1, 2, 3, 4, 5 )),
sum([1, 2, 3, 4, 5 ])
(: there is a way to break the implementation, can you find it? :)