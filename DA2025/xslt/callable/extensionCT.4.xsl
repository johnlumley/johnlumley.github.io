<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   xmlns:f="MyFunctions" extension-element-prefixes="f" exclude-result-prefixes="#all" version="4.0">

   <xsl:template match="/">
      <output>
         <f:report code="123" message="boo" rest="1 to 5"/>
         <f:report code="456" message="hoo"/>
         <xsl:variable name="leaf-nodes" select=".//*[empty(*)]"/>
         <f:report code="count(.//*)" message="total nodes"/>
         <f:report code="count($leaf-nodes)" message="leaf nodes" rest="$leaf-nodes"/>
      </output>
   </xsl:template>

   <xsl:template name="f:report" expand-text="yes">
      <xsl:param name="code" as="xs:integer"/>
      <xsl:param name="message" as="xs:string"/>
      <xsl:param name="rest" as="item()*"/>
      <report code="{$code}">
         <message>{$message}</message>
         <xsl:if test="exists($rest)">
            <rest>
               <xsl:sequence select="$rest"/>
            </rest>
         </xsl:if>
      </report>
   </xsl:template>
</xsl:stylesheet>
