<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:ar="MyArray"
                xmlns:array="http://www.w3.org/2005/xpath-functions/array"
                xmlns:doc="http://www.saxonica.com/ns/documentation"
                xmlns:err="http://www.w3.org/2005/xqt-errors"
                xmlns:f="MyFunctions"
                xmlns:fn="http://www.w3.org/2005/xpath-functions"
                xmlns:js="http://saxonica.com/ns/globalJS"
                xmlns:jwL="https://github.com/johnlumley"
                xmlns:ma="MyMap"
                xmlns:map="http://www.w3.org/2005/xpath-functions/map"
                xmlns:math="http://www.w3.org/2005/xpath-functions/math"
                xmlns:saxon="http://saxon.sf.net/"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                exclude-result-prefixes="#all"
                extension-element-prefixes="f"
                version="4.0"
                expand-text="yes">            
         <!--DO NOT EDIT - 
            generated from file:/D:/Saxonica/InvisibleXML/Mine/DA2025/QT4LibFO.4.xsl at 2025-11-04T16:11:47.0123298Z by EE 12.5--><!--exNT: -->

   <!-- A library of XPath 4.0 mimicking functions for use in XPath 3.1 situations -->
   <xsl:function name="f:identity" as="item()?">
      <xsl:param name="input" as="item()*"/>
      <xsl:sequence select="$input"/>
   </xsl:function>
   <xsl:function name="f:void" as="empty-sequence()">
      <xsl:param name="input" as="item()*"/>
      <xsl:sequence select="()"/>
   </xsl:function>
   <xsl:function name="f:foot" as="item()?">
      <xsl:param name="input" as="item()*"/>
      <xsl:sequence select="$input[last()]"/>
   </xsl:function>
   <xsl:function name="f:trunk" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:sequence select="$input[position() ne last()]"/>
   </xsl:function>
   <xsl:function name="f:items-at" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="at" as="xs:integer*"/>
      <xsl:sequence select="             for-each($at, function ($index) {                subsequence($input, $index, 1)             })"/>
   </xsl:function>
   <xsl:function name="f:index-where" as="xs:integer*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="predicate" as="function(item(), xs:integer) as xs:boolean?"/>
      <xsl:sequence select="             for-each(             $input,             function ($item, $pos) {                if ($predicate($item, $pos)) then                   $pos                else                   ()             }             )"/>
   </xsl:function>
   <!--Defaulting function: f:slice-->
   <xsl:function name="f:slice" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:sequence select="f:slice($input,())"/>
   </xsl:function>
   <xsl:function name="f:slice" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="start" as="xs:integer?"/>
      <xsl:sequence select="f:slice($input,$start,())"/>
   </xsl:function>
   <xsl:function name="f:slice" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="start" as="xs:integer?"/>
      <xsl:param name="end" as="xs:integer?"/>
      <xsl:sequence select="f:slice($input,$start,$end,())"/>
   </xsl:function>
   <xsl:function name="f:slice" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="start" as="xs:integer?"/>
      <xsl:param name="end" as="xs:integer?"/>
      <xsl:param name="step" as="xs:integer?"/>
      <xsl:variable name="S" select="($start, 1)[1]"/>
      <xsl:variable name="S"
                    select="             if ($S lt 0) then                count($input) + $S + 1             else                $S"/>
      <xsl:variable name="E" select="($end, count($input))[1]"/>
      <xsl:variable name="E"
                    select="             if ($E lt 0) then                count($input) + $E + 1             else                $E"/>
      <xsl:variable name="STEP"
                    select="             ($step,             if ($E ge $S) then                1             else                -1)[1]"/>
      <xsl:sequence select="             if ($STEP lt 0) then                $input =&gt; reverse() =&gt; f:slice(-$S, -$E, -$STEP)             else                $input[position() ge $S and position() le $E and (position() - $S) mod $STEP eq 0]"/>
   </xsl:function>
   <!--<xsl:function name="f:slice" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="start" as="xs:integer*"/>
      <xsl:param name="end" as="xs:integer*"/>
      <xsl:param name="step" as="xs:integer*"/>
      <xsl:sequence select="
         for-each($at, function ($index) {
         subsequence($input, $index, 1)
         })"/>
   </xsl:function>-->
   <xsl:function name="f:replicate" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="count" as="xs:integer"/>
      <xsl:sequence select="(1 to $count) ! $input"/>
   </xsl:function>
   <xsl:function name="f:sequence-join" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="separator" as="item()*"/>
      <xsl:sequence select="             for-each-pair($input, 1 to count($input), function ($x, $pos) {                if ($pos gt 1) then                   $separator                else                   (), $x             })"/>
   </xsl:function>
   <!--<xsl:function name="f:for-each" as="item()*">
      <xsl:note modified="position"/>
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="fn" as="function(*)"/>
      <xsl:sequence select="for-each-pair($input, 1 to count($input), $fn)"/>
   </xsl:function>-->
   <!--========= COMPARISON ======== -->
   <xsl:function name="f:duplicate-values" as="xs:anyAtomicType*">
      <xsl:param name="input" as="xs:anyAtomicType*"/>
      <xsl:iterate select="$input">
         <xsl:param name="duplicates" as="xs:anyAtomicType*" select="()"/>
         <xsl:param name="so-far" as="xs:anyAtomicType*" select="()"/>
         <xsl:on-completion select="$duplicates"/>
         <xsl:variable name="this" select="."/>
         <xsl:choose>
            <xsl:when test="exists($duplicates[. eq $this])">
               <xsl:next-iteration/>
            </xsl:when>
            <xsl:when test="exists($so-far[. eq $this])">
               <xsl:next-iteration>
                  <xsl:with-param name="duplicates" select="$duplicates, $this"/>
               </xsl:next-iteration>
            </xsl:when>
            <xsl:otherwise>
               <xsl:next-iteration>
                  <xsl:with-param name="so-far" select="$so-far, $this"/>
               </xsl:next-iteration>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:iterate>
   </xsl:function>
   <!--========= AGGREGATE ======== -->
   <!--Defaulting function: f:all-equal-->
   <xsl:function name="f:all-equal" as="xs:boolean">
      <xsl:param name="values" as="xs:anyAtomicType*"/>
      <xsl:sequence select="f:all-equal($values,default-collation())"/>
   </xsl:function>
   <xsl:function name="f:all-equal" as="xs:boolean">
      <xsl:param name="values" as="xs:anyAtomicType*"/>
      <xsl:param name="collation" as="xs:string"/>
      <xsl:sequence select="count(distinct-values($values, $collation)) le 1"/>
   </xsl:function>
   <!--Defaulting function: f:all-different-->
   <xsl:function name="f:all-different" as="xs:boolean">
      <xsl:param name="values" as="xs:anyAtomicType*"/>
      <xsl:sequence select="f:all-different($values,default-collation())"/>
   </xsl:function>
   <xsl:function name="f:all-different" as="xs:boolean">
      <xsl:param name="values" as="xs:anyAtomicType*"/>
      <xsl:param name="collation" as="xs:string"/>
      <xsl:sequence select="count(distinct-values($values, $collation)) eq count($values)"/>
   </xsl:function>
   <!--========= HIGHER ORDER ======== -->
   <xsl:function name="f:filter" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="predicate" as="function(item(), xs:integer) as xs:boolean?"/>
      <xsl:sequence select="             for-each-pair($input, 1 to count($input),             function ($item, $pos) {                if ($predicate($item, $pos)) then                   $item                else                   ()             })"/>
   </xsl:function>
   <xsl:function name="f:for-each" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="action" as="function(*)"/>
      <xsl:sequence select="             for $pos in 1 to count($input)             return                $action($input[$pos], $pos)"/>
   </xsl:function>
   <xsl:function name="f:for-each-pair" as="item()*">
      <xsl:param name="input1" as="item()*"/>
      <xsl:param name="input2" as="item()*"/>
      <xsl:param name="action" as="function(*)"/>
      <xsl:sequence select="             for $pos in 1 to min((count($input1), count($input2)))             return                $action($input1[$pos], $input2[$pos], $pos)"/>
   </xsl:function>
   <xsl:function name="f:every" as="xs:boolean">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:sequence select="count(f:filter($input, $predicate)) = count($input)"/>
   </xsl:function>
   <xsl:function name="f:some" as="xs:boolean">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:sequence select="f:filter($input, $predicate) =&gt; exists()"/>
   </xsl:function>
   <xsl:function name="f:do-until" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="action" as="function(item()*,item()*) as item()*"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:sequence select="f:do-until-helper($input, $action, $predicate, 1)"/>
   </xsl:function>
   <xsl:function name="f:do-until-helper" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="action" as="function(*)"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:param name="pos" as="xs:integer"/>
      <xsl:sequence select="             let $result := $action($input, $pos)             return                if ($predicate($result, $pos)) then                   $result                else                   f:do-until-helper($result, $action, $predicate, $pos + 1)             "/>
   </xsl:function>
   <xsl:function name="f:while-do" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:param name="action" as="function(item()*,item()*) as item()*"/>
      <xsl:sequence select="f:while-do-helper($input, $predicate, $action, 1)"/>
   </xsl:function>
   <xsl:function name="f:while-do-helper" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:param name="action" as="function(*)"/>
      <xsl:param name="pos" as="xs:integer"/>
      <xsl:sequence select="             if ($predicate($input, $pos))             then                f:while-do-helper($action($input, $pos), $predicate, $action, $pos + 1)             else                $input"/>
   </xsl:function>
   <xsl:function name="f:partition" as="array(item()*)*" expand-text="no">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="split-when" as="function(*)"/>
      <xsl:sequence select="             f:for-each(             $input,             function ($item, $pos) {                map {                   'item': $item,                   'pos': $pos                }             }             )             =&gt; fold-left((), function ($partitions, $pair) {                if (empty($partitions) or $split-when(f:foot($partitions)?*, $pair?item, $pair?pos))                then                   ($partitions, [$pair?item])                else                   (f:trunk($partitions), array {f:foot($partitions)?*, $pair?item})             })"/>
   </xsl:function>
   <!--========= STRINGS ======== -->
   <xsl:function name="f:char" as="xs:string">
      <xsl:param name="value" as="item()"/>
      <xsl:choose>
         <xsl:when test="$value instance of xs:integer">
            <xsl:sequence select="codepoints-to-string($value)"/>
         </xsl:when>
         <xsl:when test="$value instance of xs:string and starts-with($value, '\')">
            <!--xsl:switch-->
            <xsl:variable name="Selectord1e329" select="exactly-one(data(($value)))"/>
            <xsl:choose>
               <xsl:when test="$Selectord1e329 = ('\n')">
                  <xsl:sequence select="'&#xA;'"/>
               </xsl:when>
               <xsl:when test="$Selectord1e329 = ('\t')">
                  <xsl:sequence select="'&#x9;'"/>
               </xsl:when>
               <xsl:when test="$Selectord1e329 = ('\r')">
                  <xsl:sequence select="'&#xD;'"/>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:sequence select="f:char-error($value)"/>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:when>
         <xsl:when test="$value instance of xs:string">
            <xsl:choose>
               <xsl:when test="$value eq 'pi'">
                  <xsl:sequence select="'π'"/>
               </xsl:when>
            </xsl:choose>
         </xsl:when>
         <xsl:otherwise>
            <xsl:sequence select="f:char-error($value)"/>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:function>
   <xsl:function name="f:char-error">
      <xsl:param name="value" as="item()"/>
      <xsl:sequence select="error(xs:QName('FOCH0005'), 'Wrong input:' || $value || ' to f:char()')"/>
   </xsl:function>
   <xsl:function name="f:characters" as="xs:string*">
      <xsl:param name="value" as="xs:string"/>
      <xsl:sequence select="string-to-codepoints($value) ! codepoints-to-string(.)"/>
   </xsl:function>
   <!--========= NODES ======== -->
   <xsl:function name="f:siblings" as="node()*">
      <xsl:param name="node" as="node()"/>
      <xsl:sequence select="             if ($node intersect $node/parent::node()/child::node())             then                $node/parent::node()/child::node()             else                $node"/>
   </xsl:function>
   <!--========= MAPS ======== -->
   <xsl:function name="ma:empty" as="xs:boolean*">
      <xsl:param name="map" as="map(*)"/>
      <xsl:sequence select="map:size($map) eq 0"/>
   </xsl:function>
   <xsl:function name="ma:entries" as="map(*)*">
      <xsl:param name="map" as="map(*)"/>
      <xsl:sequence select="map:for-each($map, map:entry#2)"/>
   </xsl:function>
   <xsl:function name="ma:filter" as="map(*)">
      <xsl:param name="map" as="map(*)"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:sequence select="             map:for-each($map, function ($key, $value) {                if ($predicate($key, $value)) then                   map:entry($key, $value)                else                   ()             })             =&gt; map:merge()"/>
   </xsl:function>
   <xsl:function name="ma:keys-where" as="xs:anyAtomicType*">
      <xsl:param name="map" as="map(*)"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:sequence select="             map:for-each($map, function ($key, $value) {                if ($predicate($key, $value)) then                   $key                else                   ()             })             "/>
   </xsl:function>
   <xsl:function name="ma:get" as="item()*">
      <xsl:param name="map" as="map(*)"/>
      <xsl:param name="key" as="xs:anyAtomicType"/>
      <xsl:param name="default" as="item()*"/>
      <xsl:sequence select="             if (map:contains($map, $key)) then                $map($key)             else                $default"/>
   </xsl:function>
   <xsl:function name="ma:items" as="item()*">
      <xsl:param name="map" as="map(*)"/>
      <xsl:sequence select="$map?*"/>
   </xsl:function>
   <!--========= ARRAYS ======== -->
   <!--Defaulting function: ar:build-->
   <xsl:function name="ar:build" as="array(*)">
      <xsl:param name="input" as="item()*"/>
      <xsl:sequence select="ar:build($input,f:identity#1)"/>
   </xsl:function>
   <xsl:function name="ar:build" as="array(*)">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="action" as="function(*)"/>
      <xsl:sequence select="             f:for-each($input,             function ($item, $pos) {                map {'value': $action($item, $pos)}             }             ) =&gt; ar:of-members()"/>
   </xsl:function>
   <xsl:function name="ar:empty" as="xs:boolean">
      <xsl:param name="array" as="array(*)"/>
      <xsl:sequence select="array:size($array) eq 0"/>
   </xsl:function>
   <xsl:function name="ar:foot" as="array(*)">
      <xsl:param name="array" as="array(*)"/>
      <xsl:sequence select="array:get($array, array:size($array))"/>
   </xsl:function>
   <xsl:function name="ar:trunk" as="array(*)">
      <xsl:param name="array" as="array(*)"/>
      <xsl:sequence select="array:remove($array, array:size($array))"/>
   </xsl:function>
   <xsl:function name="ar:members" as="map(*)*">
      <xsl:param name="array" as="array(*)"/>
      <xsl:sequence select="(1 to array:size($array)) ! map {'value': $array(.)}"/>
   </xsl:function>
   <xsl:function name="ar:of-members" as="array(*)">
      <xsl:param name="input" as="map(*)*"/>
      <xsl:sequence select="             fold-left($input, [], function ($array, $record) {                array:append($array, map:get($record, 'value'))             })"/>
   </xsl:function>
   <xsl:function name="ar:items" as="item()*">
      <xsl:param name="array" as="array(*)"/>
      <xsl:sequence select="ar:members($array) ! .?value"/>
   </xsl:function>
   <xsl:function name="ar:split" as="item()*">
      <xsl:param name="array" as="array(*)"/>
      <xsl:sequence select="(1 to array:size($array)) ! [$array(.)]"/>
   </xsl:function>
   <xsl:function name="ar:get" as="item()*">
      <xsl:param name="array" as="array(*)"/>
      <xsl:param name="position" as="xs:integer"/>
      <xsl:param name="default" as="item()*"/>
      <xsl:sequence select="             if ($position ge 1 and $position le array:size($array)) then                $array($position)             else                $default"/>
   </xsl:function>
   <xsl:function name="ar:for-each" as="array(*)">
      <xsl:param name="array" as="array(*)"/>
      <xsl:param name="action" as="function(*)"/>
      <xsl:sequence select="             ar:of-members(             f:for-each(ar:members($array),             function ($member, $pos) {                map {'value': $action($member?value, $pos)}             })             )"/>
   </xsl:function>
   <xsl:function name="ar:for-each-pair" as="array(*)">
      <xsl:param name="array1" as="array(*)"/>
      <xsl:param name="array2" as="array(*)"/>
      <xsl:param name="action" as="function(*)"/>
      <xsl:sequence select="             ar:of-members(             f:for-each-pair(             ar:members($array1),             ar:members($array2),             function ($v1, $v2, $pos) {                map {'value': $action(map:get($v1, 'value'), map:get($v2, 'value'), $pos)}             }             )             )"/>
   </xsl:function>
   <xsl:function name="ar:filter" as="array(*)">
      <xsl:param name="array" as="array(*)"/>
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:sequence select="             ar:of-members(             f:filter(             ar:members($array),             function ($item, $pos) {                $predicate(map:get($item, 'value'), $pos)             }             )             )"/>
   </xsl:function>
   <!--Defaulting function: ar:slice-->
   <xsl:function name="ar:slice" as="array(*)">
      <xsl:param name="array" as="array(*)"/>
      <xsl:sequence select="ar:slice($array,())"/>
   </xsl:function>
   <xsl:function name="ar:slice" as="array(*)">
      <xsl:param name="array" as="array(*)"/>
      <xsl:param name="start" as="xs:integer?"/>
      <xsl:sequence select="ar:slice($array,$start,())"/>
   </xsl:function>
   <xsl:function name="ar:slice" as="array(*)">
      <xsl:param name="array" as="array(*)"/>
      <xsl:param name="start" as="xs:integer?"/>
      <xsl:param name="end" as="xs:integer?"/>
      <xsl:sequence select="ar:slice($array,$start,$end,())"/>
   </xsl:function>
   <xsl:function name="ar:slice" as="array(*)">
      <xsl:param name="array" as="array(*)"/>
      <xsl:param name="start" as="xs:integer?"/>
      <xsl:param name="end" as="xs:integer?"/>
      <xsl:param name="step" as="xs:integer?"/>
      <xsl:sequence select="             $array             =&gt; ar:members()             =&gt; f:slice($start, $end, $step)             =&gt; ar:of-members()"/>
   </xsl:function>
   <!--Defaulting function: ar:index-of-->
   <xsl:function name="ar:index-of" as="xs:integer*">
      <xsl:param name="array" as="array(*)"/>
      <xsl:param name="target" as="item()*"/>
      <xsl:sequence select="ar:index-of($array,$target,default-collation())"/>
   </xsl:function>
   <xsl:function name="ar:index-of" as="xs:integer*">
      <xsl:param name="array" as="array(*)"/>
      <xsl:param name="target" as="item()*"/>
      <xsl:param name="collation" as="xs:string"/>
      <xsl:sequence select="ar:index-where($array, deep-equal(?, $target, $collation))"/>
   </xsl:function>
   <xsl:function name="ar:index-where" as="xs:integer*">
      <xsl:param name="array" as="array(*)"/>
      <!--      <xsl:param name="predicate" as="function(item()*, xs:integer) as xs:boolean?"/>-->
      <xsl:param name="predicate" as="function(*)"/>
      <xsl:sequence select="             (1 to array:size($array)) ! (             if ($predicate(array:get($array, .), .)) then                .             else                ()             )"/>
   </xsl:function>
</xsl:stylesheet>
