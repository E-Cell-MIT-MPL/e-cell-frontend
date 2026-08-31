$dir = 'C:\Users\sarth\e-cell-frontend\public\speakers'

# Use curl.exe to call Wikipedia REST API and parse JSON
$slugs = @(
  @{file='ankur-warikoo.jpg';    slug='Ankur_Warikoo'},
  @{file='ashneer-grover.jpg';   slug='Ashneer_Grover'},
  @{file='aman-gupta.jpg';       slug='Aman_Gupta_(businessman)'},
  @{file='gaurav-taneja.jpg';    slug='Gaurav_Taneja'},
  @{file='akshat-rathee.jpg';    slug='Akshat_Rathee'},
  @{file='prafull-billore.jpg';  slug='Prafull_Billore'},
  @{file='shantanu-deshpande.jpg'; slug='Shantanu_Deshpande'},
  @{file='velumani.jpg';         slug='Arokiaswamy_Velumani'},
  @{file='ishan-sukul.jpg';      slug='Ishan_Sukul'},
  @{file='karunesh-talwar.jpg';  slug='Karunesh_Talwar'},
  @{file='yash-rathi.jpg';       slug='Yash_Rathi_(comedian)'},
  @{file='aditi-madan.jpg';      slug='Aditi_Madan'},
  @{file='sahiba-bali.jpg';      slug='Sahiba_Bali'}
)

foreach ($s in $slugs) {
  $out = Join-Path $dir $s.file
  if (Test-Path $out) { Write-Host "SKIP: $($s.file)"; continue }

  $apiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/$($s.slug)"
  $json   = & curl.exe -s -A "Mozilla/5.0" $apiUrl | ConvertFrom-Json 2>$null

  $imgUrl = $null
  if ($json.originalimage.source) { $imgUrl = $json.originalimage.source }
  elseif ($json.thumbnail.source)  { $imgUrl = $json.thumbnail.source }

  if ($imgUrl) {
    & curl.exe -s -L -o $out -A "Mozilla/5.0" $imgUrl
    if ((Test-Path $out) -and (Get-Item $out).Length -gt 3000) {
      Write-Host "OK: $($s.file) ($([math]::Round((Get-Item $out).Length/1KB,1)) KB)"
    } else {
      Remove-Item $out -ErrorAction SilentlyContinue
      Write-Host "SMALL/FAIL: $($s.file)"
    }
  } else {
    Write-Host "NO_PAGE: $($s.slug) (title=`"$($json.title)`" type=`"$($json.type)`")"
  }
  Start-Sleep -Milliseconds 400
}

Write-Host ""
Write-Host "=== Speakers folder ==="
Get-ChildItem $dir | ForEach-Object { "$($_.Name) - $([math]::Round($_.Length/1KB,1)) KB" }
