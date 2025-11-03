<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   fixed-namespaces="#default f=MyFunctions" xmlns:ar="MyArray" exclude-result-prefixes="#all"
   version="4.0" expand-text="true">
   <xsl:mode on-no-match="shallow-copy"/>


   <xsl:template name="xsl:initial-template">
      <output>
         <comparison>
            <duplicate-values>{f:duplicate-values(tokenize("the cat sat on a lazy dog but the dog
               was not a happy bunny"))}</duplicate-values>
         </comparison>
         <aggregate>
            <all-equal>{f:all-equal(('a','a','a'))} {f:all-equal(('a','b','a'))}</all-equal>
            <all-different>{f:all-different(('a','a','a'))}
               {f:all-different(('a','b','c'))}</all-different>
         </aggregate>
         <higher-order>
            <for-each>
               <xsl:sequence select="
                     f:for-each(('a', 'b', 'c'), function ($x, $pos) {
                        $x || $pos
                     })"/>
            </for-each>
            <for-each-pair>
               <xsl:sequence select="
                     f:for-each-pair(('a', 'b', 'c'), (9 to 15), function ($x, $y, $pos) {
                        ($x, $y, string($pos)) => string-join('-')
                     })"/>
            </for-each-pair>
            <filter>
               <xsl:sequence select="
                     f:filter(20 to 30, function ($i, $p) {
                        $i gt 24 and $p mod 2 eq 0
                     })"/>
            </filter>
            <do-until>{f:do-until( (), function($value, $pos) { $value, $pos * $pos },
               function($value,$pos) { f:foot($value) > 50 } )}</do-until>
            <while-do>{f:while-do(2, function($value,$pos){ $value le 100 }, function($value,$pos){
               $value * $value })}</while-do>
         </higher-order>


         <arrays>
            <array-index-where>{ar:index-where([(1,2),(3,4,5)],function($x,$pos) { count($x) eq 2
               })}</array-index-where>
            <array-index-of>{ar:index-of([(1,2),(3,4,5)],(1,2))}</array-index-of>
         </arrays>

      </output>
   </xsl:template>
</xsl:stylesheet>
