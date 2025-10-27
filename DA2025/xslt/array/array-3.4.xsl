<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   xmlns:f="MyFunctions" xmlns:ar="MyArray" exclude-result-prefixes="#all" expand-text="true" version="4.0">

   <xsl:template match="/">
      <xsl:variable name="duplicates" as="array(*)">
         <xsl:array for-each=".//para" select="f:duplicate-values(tokenize(.))"/>
      </xsl:variable>
      <output>
         <xsl:for-each select="ar:members($duplicates)">
            <xsl:if test="count(.?value) gt 0">
               <duplicates para="{position()}">{.?value}</duplicates>
            </xsl:if>
         </xsl:for-each>
      </output>
   </xsl:template>
</xsl:stylesheet>
