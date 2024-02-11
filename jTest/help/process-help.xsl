<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema"
   xmlns:math="http://www.w3.org/2005/xpath-functions/math" exclude-result-prefixes="xs math" version="3.0"
   expand-text="true" xmlns="http://www.w3.org/1999/xhtml" xpath-default-namespace="http://www.w3.org/1999/xhtml">

   <xsl:output method="xml" indent="true"/>
   <xsl:mode on-no-match="shallow-copy"/>
   <xsl:mode name="toc" on-no-match="shallow-skip"/>
   <xsl:mode name="link" on-no-match="shallow-skip"/>
   <xsl:variable name="headings" select="//h3 | //h4"/>
   <xsl:template match="div[@class eq 'TOC']">
      <h2>Table of Contents</h2>
      <ul>
         <xsl:apply-templates select="/" mode="toc"/>
         <!-- <xsl:for-each select="$headings">
            <li>
               <a href="#{generate-id(.)}">{.}</a>
            </li>
         </xsl:for-each>-->
      </ul>
   </xsl:template>
   <xsl:template match="section[h3 | h4]" mode="toc">
      <li>
         <xsl:apply-templates select="h3 | h4" mode="link"/>
         <xsl:if test="section[h3 | h4]">
            <ul>
               <xsl:apply-templates select="section" mode="#current"/>
            </ul>
         </xsl:if>
      </li>
   </xsl:template>
   <xsl:template match="h3 | h4" mode="link">
      <a href="#{generate-id(.)}">{.}</a>
   </xsl:template>
   <xsl:template match="body">
      <xsl:copy>
         <xsl:sequence select="@*"/>
         <xsl:comment>DO NOT EDIT. Generated from {base-uri(.)}</xsl:comment>
         <xsl:apply-templates mode="#current"/>
      </xsl:copy>
   </xsl:template>
   <xsl:template match="h3 | h4">
      <xsl:copy>
         <a id="{generate-id(.)}">
            <xsl:apply-templates mode="#current"/>
         </a>
      </xsl:copy>
   </xsl:template>

   <xsl:template match="option">
      <tr>
         <td class="{string-join(('option',@class),' ')}">{@legend}</td>
         <xsl:apply-templates select="@default"/>
         <td>
            <xsl:apply-templates/>
         </td>
         <xsl:apply-templates select="@api"/>
      </tr>
   </xsl:template>
   <xsl:template match="@default">
      <td class="{.}"/>
   </xsl:template>
   <xsl:template match="@api">
      <td>{.}</td>
   </xsl:template>
</xsl:stylesheet>
