Set-Location frontreact
Invoke-Expression 'yarn build'
Set-Location ..
Invoke-Expression 'pkger -include /frontreact/build'
Invoke-Expression 'go build .'
Write-Host 'Pressione qualquer tecla para continuar ...'
$null = $host.UI.RawUI.ReadKey('NoEcho, IncludeKeyDown')