<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" fixed-namespaces="#default"
    exclude-result-prefixes="#all" version="4.0">

    <xsl:template match="/">
        <xsl:apply-templates select="." mode="reverse"/>
    </xsl:template>
    <xsl:mode name="reverse" on-no-match="shallow-copy">
        <xsl:template match="author">
            <writer>
                <xsl:apply-templates/>
            </writer>
        </xsl:template>
    </xsl:mode>
</xsl:stylesheet>
