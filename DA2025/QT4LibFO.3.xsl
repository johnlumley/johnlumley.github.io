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
            generated from file:/D:/Saxonica/InvisibleXML/Mine/DA2025/QT4LibFO.4.xsl at 2025-10-27T17:04:15.0903669Z by EE 12.4--><!--exNT: f:system-details f:set-value f:set-style f:enable f:disable f:code-and-input-->

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
   <xsl:function name="f:for-each" as="item()*">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="fn" as="function(*)"/>
      <xsl:sequence select="for-each-pair($input, 1 to count($input), $fn)"/>
   </xsl:function>
   <xsl:function name="f:partition" as="array(item()*)*" expand-text="no">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="split-when" as="function(*)"/>
      <xsl:sequence select="             f:for-each(             $input,             function ($item, $pos) {                map {                   'item': $item,                   'pos': $pos                }             }             )             =&gt; fold-left((), function ($partitions, $pair) {                if (empty($partitions) or $split-when(f:foot($partitions)?*, $pair?item, $pair?pos))                then                   ($partitions, [$pair?item])                else                   (f:trunk($partitions), array {f:foot($partitions)?*, $pair?item})             })"/>
   </xsl:function>
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
   <xsl:function name="ma:entries" as="map(*)*">
      <xsl:param name="map" as="map(*)"/>
      <xsl:sequence select="map:for-each($map, map:entry#2)"/>
   </xsl:function>
   <xsl:function name="ma:filter" as="map(*)">
      <xsl:param name="map" as="map(*)"/>
      <xsl:param name="predicate"
                 as="function(xs:anyAtomicType, item()*) as xs:boolean?"/>
      <xsl:sequence select="             map:for-each($map, function ($key, $value) {                if ($predicate($key, $value)) then                   map:entry($key, $value)                else                   ()             })             =&gt; map:merge()"/>
   </xsl:function>
   <xsl:function name="ma:items" as="item()*">
      <xsl:param name="map" as="map(*)"/>
      <xsl:sequence select="$map?*"/>
   </xsl:function>
   <!--Defaulting function: ar:build-->
   <xsl:function name="ar:build" as="array(*)">
      <xsl:param name="input" as="item()*"/>
      <xsl:sequence select="ar:build($input,f:identity#1)"/>
   </xsl:function>
   <xsl:function name="ar:build" as="array(*)">
      <xsl:param name="input" as="item()*"/>
      <xsl:param name="action" as="function(item(), xs:integer) as item()*"/>
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
