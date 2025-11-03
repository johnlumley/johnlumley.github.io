<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
   exclude-result-prefixes="#all" version="4.0" expand-text="true">

   <xsl:output method="xml" indent="true"/>
   <xsl:strip-space elements="*"/>

   <xsl:mode on-no-match="shallow-copy"/>

   <xsl:template match="article">
      <xsl:copy copy-namespaces="no">
         <xsl:apply-templates select="@*"/>
         <xsl:apply-templates select="info" mode="info"/>
         <xsl:apply-templates select="bibliography" mode="biblio"/>
         <xsl:apply-templates select="sect1" mode="section" separator="&#xA;---&#xA;"/>
      </xsl:copy>
   </xsl:template>


   <xsl:mode name="biblio">
      <xsl:template match="bibliography">
         <xsl:attribute name="references">
            <xsl:switch select="count(* except title)">
               <xsl:when test="0" select="'none'"/>
               <xsl:when test="1 to 4" select="'too few'"/>
               <xsl:when test="5 to 10" select="'about right'"/>
               <xsl:otherwise select="'far too many'"/>
            </xsl:switch>
         </xsl:attribute>
      </xsl:template>
   </xsl:mode>


   <xsl:mode name="info" as="attribute()*" on-no-match="shallow-skip">
      <xsl:template match="personname">
         <xsl:attribute name="author" select="*"/>
      </xsl:template>
      <xsl:template match="title">
         <xsl:attribute name="title" select="."/>
      </xsl:template>
   </xsl:mode>

   <xsl:mode name="section" on-no-match="shallow-copy">
      <xsl:template match="sect1">
         <xsl:variable name="normalized" as="node()*">
            <xsl:apply-templates mode="remove-trivia"/>
         </xsl:variable>
         <section>
            <xsl:apply-templates select="$normalized"/>
         </section>
      </xsl:template>
      <xsl:template match="title">
         <xsl:attribute name="title" select="."/>
      </xsl:template>
      <xsl:template match="para[. eq '']"/>
      <xsl:template match="para">
         <para>
            <xsl:apply-templates/>
         </para>
      </xsl:template>
      <xsl:template match="programlisting">
         <codeblock>
            <xsl:attribute name="lines" select="tokenize(., '\n') => count()"/>
         </codeblock>
      </xsl:template>
   </xsl:mode>

   <xsl:mode name="remove-trivia" on-no-match="shallow-copy">
      <xsl:template match="text()">{normalize-space(.)}</xsl:template>
      <xsl:template match="citation | footnote | link">
         <xsl:text> </xsl:text>
      </xsl:template>
      <xsl:template match="programlisting">
         <xsl:copy-of select="." copy-namespaces="no"/>
      </xsl:template>
      <xsl:template match="itemizedlist | listitem | code | uri">
         <xsl:text> </xsl:text>
         <xsl:apply-templates/>
         <xsl:text> </xsl:text>
      </xsl:template>
   </xsl:mode>

</xsl:stylesheet>
