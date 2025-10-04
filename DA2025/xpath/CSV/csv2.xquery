let $display := fn($result) {
  (: tidy up the result for display (function items cannot be properly displayed) :)         
  map:put($result, "get", "(: function :)")
}
let $input := string-join((
   "date,name,city,amount,currency,original amount,note",
   "2023-07-19,Bob,Berlin,10.00,USD,13.99",
   "2023-07-20,Alice,Aachen,15.00",
   "2023-07-20,Charlie,Celle,15.00,GBP,11.99,cake,not a lie"
), char('\n'))
let $options := { 
  "header": true(), 
  "select-columns": (2, 1, 4)
}
let $result := parse-csv($input, $options)
return (
  $result => $display(),
  $result?get(2, "amount")
)