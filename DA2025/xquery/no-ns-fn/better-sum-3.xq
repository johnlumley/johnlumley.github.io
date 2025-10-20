declare function sum($input as (xs:integer* | array(xs:integer))) as xs:integer {
  let $items :=
    typeswitch $input {
      case array(xs:integer) return fn:sum($items?*)
      default return fn:sum($items)
    }
};

sum((1, 2, 3, 4, 5 )),
sum([1, 2, 3, 4, 5 ])