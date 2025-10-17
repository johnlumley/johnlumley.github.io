<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   xmlns:f="MyFunctions" exclude-result-prefixes="#all" version="4.0">

   <xsl:record-type name="f:complex">
      <xsl:field name="r" as="xs:double"/>
      <xsl:field name="i" as="xs:double" required="no" default="0"/>
   </xsl:record-type>

   <xsl:variable name="i" as="f:complex" select="f:complex(0, 1)"/>

   <xsl:function name="f:add" as="f:complex">
      <xsl:param name="x" as="f:complex"/>
      <xsl:param name="y" as="f:complex"/>
      <xsl:sequence select="f:complex($x?r + $y?r, $x?i + $y?i)"/>
   </xsl:function>
   <xsl:function name="f:sub" as="f:complex">
      <xsl:param name="x" as="f:complex"/>
      <xsl:param name="y" as="f:complex"/>
      <xsl:sequence select="f:complex($x?r - $y?r, $x?i - $y?i)"/>
   </xsl:function>
   <xsl:variable name="operators" as="map(*)" select="
         map {
            'add': f:add#2,
            'sub': f:sub#2
         }"/>

   <xsl:mode on-no-match="shallow-copy"/>
   <xsl:template match="eval">
      <xsl:variable name="val" as="f:complex">
         <xsl:apply-templates select="*" mode="eval"/>
      </xsl:variable>
      <result r="{$val?r}" i="{$val?i}"/>
   </xsl:template>

   <xsl:mode name="eval" on-no-match="fail" as="f:complex">
      <xsl:template match="c">
         <xsl:sequence select="f:complex(@r, @i)"/>
      </xsl:template>
      <xsl:template match="add | sub">
         <xsl:variable name="operands" as="f:complex+">
            <xsl:apply-templates select="*"/>
         </xsl:variable>
         <xsl:sequence select="$operators(name())($operands[1], $operands[2])"/>
      </xsl:template>
   </xsl:mode>


</xsl:stylesheet>
