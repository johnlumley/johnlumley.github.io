declare function sum($items as item()*) as xs:integer {
  $items 
  =!> xs:integer()
  => fn:sum()
};

sum((1, "2", 3, 4, 5 ))