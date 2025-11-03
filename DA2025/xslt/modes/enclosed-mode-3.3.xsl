<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xs="http://www.w3.org/2001/XMLSchema"
   xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="#all" version="4.0"
   expand-text="true">

   <xsl:output method="xml" indent="true"/>
   <xsl:strip-space elements="*"/>

   <xsl:mode on-no-match="shallow-copy"/>
   <xsl:mode name="biblio"/>
   <xsl:mode name="info" on-no-match="shallow-skip"/>
   <xsl:mode name="remove-trivia" on-no-match="shallow-copy"/>
   <xsl:mode name="section" on-no-match="shallow-copy"/>

   <xsl:template match="article">
      <xsl:copy copy-namespaces="no">
         <xsl:apply-templates select="@*"/>
         <xsl:apply-templates select="info" mode="info"/>
         <xsl:apply-templates select="bibliography" mode="biblio"/>
         <xsl:for-each select="sect1">
            <xsl:if test="position() gt 1">
               <xsl:text>
---
</xsl:text>
            </xsl:if>
            <xsl:apply-templates select="." mode="section"/>
         </xsl:for-each>
      </xsl:copy>
   </xsl:template>


   <xsl:template mode="biblio" match="bibliography">
      <xsl:attribute name="references">
         <xsl:variable name="val" select="count(* except title)"/>
         <xsl:choose>
            <xsl:when test="$val = (0)">
               <xsl:sequence select="'none'"/>
            </xsl:when>
            <xsl:when test="$val = (1 to 4)">
               <xsl:sequence select="'too few'"/>
            </xsl:when>
            <xsl:when test="$val = (5 to 10)">
               <xsl:sequence select="'about right'"/>
            </xsl:when>
            <xsl:otherwise>
               <xsl:sequence select="'far too many'"/>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:attribute>
   </xsl:template>

   <xsl:template mode="info" as="attribute()*" match="personname">
      <xsl:attribute name="author" select="*"/>
   </xsl:template>
   

   <xsl:template mode="remove-trivia" match="citation | footnote | link">
      <xsl:text> </xsl:text>
   </xsl:template>

   <xsl:template mode="section" match="sect1">
      <xsl:variable name="normalized" as="node()*">
         <xsl:apply-templates mode="remove-trivia"/>
      </xsl:variable>
      <section>
         <xsl:apply-templates select="$normalized" mode="#current"/>
      </section>
   </xsl:template>

   <xsl:template mode="info" as="attribute()*" match="title">
      <xsl:attribute name="title" select="."/>
   </xsl:template>

   <xsl:template mode="section" match="title">
      <xsl:attribute name="title" select="."/>
   </xsl:template>

   <xsl:template mode="section" match="programlisting">
      <codeblock>
         <xsl:attribute name="lines" select="tokenize(., '\n') =&gt; count()"/>
      </codeblock>
   </xsl:template>

   <xsl:template mode="remove-trivia" match="text()">{normalize-space(.)}</xsl:template>

   <xsl:template mode="remove-trivia" match="programlisting">
      <xsl:copy-of select="." copy-namespaces="no"/>
   </xsl:template>


   <xsl:template mode="section" match="para[. eq '']"/>
   <xsl:template mode="section" match="para">
      <para>
         <xsl:apply-templates mode="#current"/>
      </para>
   </xsl:template>

   <xsl:template mode="remove-trivia" match="itemizedlist | listitem | code | uri">
      <xsl:text> </xsl:text>
      <xsl:apply-templates mode="#current"/>
      <xsl:text> </xsl:text>
   </xsl:template>
</xsl:stylesheet>
