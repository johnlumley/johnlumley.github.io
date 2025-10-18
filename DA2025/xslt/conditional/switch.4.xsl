<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default" exclude-result-prefixes="#all" version="4.0" xmlns:f="MyFunctions">

   <xsl:function name="f:days-in-month" as="xs:integer?">
      <xsl:param name="month-number" as="xs:integer"/>
      <xsl:param name="leap-year" as="xs:boolean"/>
      <xsl:switch select="$month-number">
         <xsl:when test="1, 3, 5, 7, 8, 10, 12" select="31"/>
         <xsl:when test="4, 6, 9, 11" select="30"/>
         <xsl:when test="2">
            <xsl:if test="$leap-year" then="29" else="28"/>
         </xsl:when>
      </xsl:switch>
   </xsl:function>

   <xsl:mode on-no-match="shallow-copy"/>
   <xsl:strip-space elements="*"/>

   <xsl:template match="year">
      <xsl:next-match>
         <xsl:with-param name="leap-year" as="xs:boolean" select="@year mod 4 eq 0" tunnel="true"/>
      </xsl:next-match>
   </xsl:template>
   <xsl:template match="month">
      <xsl:param name="leap-year" as="xs:boolean" tunnel="true"/>
      <xsl:copy>
         <xsl:attribute name="length" select="f:days-in-month(position(), $leap-year)"/>
         <xsl:sequence select="text()"/>
      </xsl:copy>
   </xsl:template>
</xsl:stylesheet>
