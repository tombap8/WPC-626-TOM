# JSON 파일 업데이트 스크립트
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

$jsonPath = Join-Path $PSScriptRoot "vogue_articles.json"
$mappingPath = Join-Path $PSScriptRoot "url_mapping.json"

# 파일 읽기
$jsonContent = Get-Content -Path $jsonPath | Out-String
$json = $jsonContent | ConvertFrom-Json

$mappingContent = Get-Content -Path $mappingPath | Out-String
$mapping = $mappingContent | ConvertFrom-Json

# URL을 로컬 경로로 변경
foreach ($category in $json.categories) {
    # highlight 이미지 업데이트
    if ($category.highlight.image) {
        $oldUrl = $category.highlight.image
        $mapping.PSObject.Properties | ForEach-Object {
            if ($_.Name -eq $oldUrl) {
                $category.highlight.image = $_.Value
                Write-Host "업데이트: $oldUrl -> $($_.Value)"
            }
        }
    }
    
    # articles 이미지 업데이트
    foreach ($article in $category.articles) {
        if ($article.image) {
            $oldUrl = $article.image
            $mapping.PSObject.Properties | ForEach-Object {
                if ($_.Name -eq $oldUrl) {
                    $article.image = $_.Value
                    Write-Host "업데이트: $oldUrl -> $($_.Value)"
                }
            }
        }
    }
}

# JSON 파일 저장
$json | ConvertTo-Json -Depth 10 | Out-File -FilePath $jsonPath

Write-Host "`n완료! JSON 파일이 업데이트되었습니다." -ForegroundColor Green
