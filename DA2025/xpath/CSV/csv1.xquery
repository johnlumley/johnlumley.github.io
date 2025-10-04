let $display := fn($result) {
  (: tidy up the result for display (function items cannot be properly displayed) :)         
  map:put($result, "get", "(: function :)")
}
let $input := string-join(
  ("name,city", "Bob,Berlin", "Alice,Aachen"),
  char('\n')
)
let $result := parse-csv($input)
return (
  $result => $display(),
  $result?get(1, 2),
  $result?get(2, 2)
)