Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

function New-TerminalImage {
    param(
        [Parameter(Mandatory = $true)][string]$Texto,
        [Parameter(Mandatory = $true)][string]$Ruta,
        [string]$Titulo = ""
    )

    $fuente = New-Object System.Drawing.Font("Consolas", 12)
    $fuenteTitulo = New-Object System.Drawing.Font("Consolas", 12, [System.Drawing.FontStyle]::Bold)
    $brushTexto = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 220, 220))
    $brushFondo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(24, 24, 28))
    $brushVerde = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(102, 217, 102))
    $brushRojo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 100, 100))
    $brushAzul = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(130, 180, 255))
    $brushAmarillo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 200, 90))
    $borde = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 60, 66), 1)
    $barra = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(45, 45, 52))

    $lineas = $Texto -split "`r?`n"
    $anchoTexto = 0
    foreach ($l in $lineas) {
        $w = [System.Windows.Forms.TextRenderer]::MeasureText($l, $fuente).Width
        if ($w -gt $anchoTexto) { $anchoTexto = $w }
    }

    $margen = 24
    $ancho = $anchoTexto + ($margen * 2)
    if ($ancho -lt 1150) { $ancho = 1150 }
    $alto = ($lineas.Count * 19) + ($margen * 2) + 60

    $bmp = New-Object System.Drawing.Bitmap($ancho, $alto)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $g.Clear([System.Drawing.Color]::FromArgb(24, 24, 28))

    # Barra de titulo con botones
    $g.FillRectangle($barra, 0, 0, $ancho, 34)
    $g.FillRectangle($brushRojo, 14, 14, 10, 10)
    $g.FillRectangle($brushAmarillo, 30, 14, 10, 10)
    $g.FillRectangle($brushVerde, 46, 14, 10, 10)
    if ($Titulo -ne "") { $g.DrawString($Titulo, $fuenteTitulo, $brushTexto, 70, 7) }
    $g.DrawLine($borde, 0, 34, $ancho, 34)

    # Cuerpo
    $y = 34 + $margen
    foreach ($l in $lineas) {
        $brush = $brushTexto
        $soloLinea = ($l -replace '[^A-Za-z0-9]', '') -ne '' -and ($l -replace '[^A-Za-z0-9]', '') -eq $l.Trim()

        if ($l -match '\[PASS\]' -or $l -match '^\s*OK\s') { $brush = $brushVerde }
        elseif ($l -match '\[FAIL\]' -or $l -match 'FALLA') { $brush = $brushRojo }
        elseif ($l -match '^=+$' -or $l -match '^-+$' -or $l -match '^\s*[A-Z]{4,}\s*$') { $brush = $brushAzul }
        elseif ($l -match '^\s*>' -or $l -match '^\s*node ') { $brush = $brushAmarillo }

        $g.DrawString($l, $fuente, $brush, $margen, $y)
        $y += 19
    }

    $g.DrawRectangle($borde, 0, 0, $ancho - 1, $alto - 1)
    $g.Dispose()

    $bmp.Save($Ruta, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Captura generada: $Ruta ($ancho x $alto px)"
}

$base = Split-Path -Parent $PSScriptRoot

Write-Host "Ejecutando pruebas unitarias..."
$u = & node "$base\app\tests\pruebas.js" 2>&1 | Out-String
$u | Out-File -FilePath "$base\evidencia\salida-pruebas.txt" -Encoding UTF8
New-TerminalImage -Texto $u -Ruta "$base\evidencia\captura-01-pruebas-unitarias.png" -Titulo "node app/tests/pruebas.js"

Write-Host "Ejecutando pruebas de API..."
$a = & node "$base\app\tests\pruebas-api.js" 2>&1 | Out-String
$a | Out-File -FilePath "$base\evidencia\salida-pruebas-api.txt" -Encoding UTF8
New-TerminalImage -Texto $a -Ruta "$base\evidencia\captura-02-pruebas-api.png" -Titulo "node app/tests/pruebas-api.js"

Write-Host "Listo."