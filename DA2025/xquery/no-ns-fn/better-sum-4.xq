declare function sum($input as item()*) as xs:integer {
  (typeswitch ($input) {
    case array(xs:anyAtomicType) return $input?* =!> xs:integer()
    case xs:anyAtomicType* return $input =!> xs:integer()
    case array(xs:integer) return $input?*
    case xs:integer* return $input
    default return error()
  })
  => fn:sum()
};

sum((1, 2, 3, 4, 5 )),
sum([1, 2, 0xa, 4, -2 ]),
sum((1, "2", 3, 4, 5, 1e2 )),
sum([1_001, 2, 3, "4", 0b101 ])
