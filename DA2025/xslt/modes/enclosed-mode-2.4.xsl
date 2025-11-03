<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   exclude-result-prefixes="#all" version="4.0">

   <xsl:output method="xml" indent="true"/>

   <xsl:mode on-no-match="shallow-copy"/>

   <xsl:template match="comment" mode="#all"/>
   <xsl:template match="alts|alt|repeat0|repeat1|option|sep" mode="#all">
      <xsl:apply-templates mode="#current"/>
   </xsl:template>

   <xsl:template match="rule[empty(.//nonterminal)]">
      <xsl:apply-templates select="." mode="leaf"/>
   </xsl:template>

   <xsl:mode name="leaf" on-no-match="shallow-copy">
      <xsl:template match="rule">
         <leaf>
            <xsl:sequence select="@name"/>
            <xsl:apply-templates/>
         </leaf>
      </xsl:template>
   </xsl:mode>
</xsl:stylesheet>
