<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   xmlns:f="MyFunctions" extension-element-prefixes="f" exclude-result-prefixes="#all" version="4.0">

   <xsl:template match="/">
      <f:report code="123" message="boo" rest="1 to 5"/>
   </xsl:template>

   <xsl:template name="f:report" expand-text="yes">
      <xsl:param name="code" as="xs:integer"/>
      <xsl:param name="message" as="xs:string"/>
      <xsl:param name="rest" as="item()*"/>
      <report code="{$code}">
         <message>{$message}</message>
         <xsl:if test="exists($rest)">
            <rest>{$rest}</rest>
         </xsl:if>
      </report>
   </xsl:template>
</xsl:stylesheet>
