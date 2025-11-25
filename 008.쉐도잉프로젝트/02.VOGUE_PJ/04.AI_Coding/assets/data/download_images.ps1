# 이미지 다운로드 스크립트
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['*:Encoding'] = 'utf8'

$jsonPath = Join-Path $PSScriptRoot "vogue_articles.json"
$outputDir = Join-Path $PSScriptRoot "..\images\items"

# JSON 파일 읽기
$jsonContent = Get-Content -Path $jsonPath | Out-String
$json = $jsonContent | ConvertFrom-Json

# 카운터 초기화
$counter = 1
$urlMapping = @{}

# 모든 이미지 URL 수집 및 다운로드
foreach ($category in $json.categories) {
    $categoryName = $category.categoryName
    
    # highlight 이미지
    if ($category.highlight.image) {
        $url = $category.highlight.image
        $extension = [System.IO.Path]::GetExtension($url) -replace '\?.*$', ''
        if ([string]::IsNullOrEmpty($extension)) { $extension = ".jpg" }
        $fileName = "item_$($counter.ToString('D3'))$extension"
        $filePath = Join-Path $outputDir $fileName
        
        Write-Host "다운로드 중: $url -> $fileName"
        try {
            Invoke-WebRequest -Uri $url -OutFile $filePath -ErrorAction Stop
            $urlMapping[$url] = "images/items/$fileName"
            $counter++
        } catch {
            Write-Host "오류: $url 다운로드 실패 - $_" -ForegroundColor Red
        }
    }
    
    # articles 이미지들
    foreach ($article in $category.articles) {
        if ($article.image) {
            $url = $article.image
            $extension = [System.IO.Path]::GetExtension($url) -replace '\?.*$', ''
            if ([string]::IsNullOrEmpty($extension)) { $extension = ".jpg" }
            $fileName = "item_$($counter.ToString('D3'))$extension"
            $filePath = Join-Path $outputDir $fileName
            
            Write-Host "다운로드 중: $url -> $fileName"
            try {
                Invoke-WebRequest -Uri $url -OutFile $filePath -ErrorAction Stop
                $urlMapping[$url] = "images/items/$fileName"
                $counter++
            } catch {
                Write-Host "오류: $url 다운로드 실패 - $_" -ForegroundColor Red
            }
        }
    }
}

# URL 매핑을 JSON 파일로 저장
$mappingPath = Join-Path $PSScriptRoot "url_mapping.json"
$urlMapping | ConvertTo-Json | Out-File -FilePath $mappingPath

Write-Host "`n완료! 총 $($counter - 1)개의 이미지를 다운로드했습니다." -ForegroundColor Green
Write-Host "URL 매핑이 $mappingPath 에 저장되었습니다." -ForegroundColor Green
