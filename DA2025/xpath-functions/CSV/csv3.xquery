let $display := fn($result) {
  (: tidy up the result for display (function items cannot be properly displayed) :)         
  map:put($result, "get", "(: function :)")
}
let $options := { 
  "header": true(), 
  "select-columns": (2, 1, 4)
}
let $result := parse-csv(., $options)
return (
  $result => $display(),
  $result?get(2, "amount")
)