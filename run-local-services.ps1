# PowerShell script to start all Marathi Design Studio services locally
$baseDir = $PSScriptRoot
$logsDir = "$baseDir\logs"
if (!(Test-Path $logsDir)) {
    New-Item -ItemType Directory -Path $logsDir | Out-Null
}

$services = @(
    @{ Name = "IdentityService"; Port = 8081; Jar = "$baseDir\services\identity-service\target\identity-service-1.0.0-SNAPSHOT.jar" },
    @{ Name = "TemplateService"; Port = 8082; Jar = "$baseDir\services\template-service\target\template-service-1.0.0-SNAPSHOT.jar" },
    @{ Name = "ProjectService";  Port = 8083; Jar = "$baseDir\services\project-service\target\project-service-1.0.0-SNAPSHOT.jar" },
    @{ Name = "MediaService";    Port = 8084; Jar = "$baseDir\services\media-service\target\media-service-1.0.0-SNAPSHOT.jar" },
    @{ Name = "AiService";       Port = 8085; Jar = "$baseDir\services\ai-service\target\ai-service-1.0.0-SNAPSHOT.jar" },
    @{ Name = "BillingService";  Port = 8086; Jar = "$baseDir\services\billing-service\target\billing-service-1.0.0-SNAPSHOT.jar" },
    @{ Name = "ApiGateway";      Port = 8080; Jar = "$baseDir\services\api-gateway\target\api-gateway-1.0.0-SNAPSHOT.jar" }
)

foreach ($s in $services) {
    $name = $s.Name
    $port = $s.Port
    $jar = $s.Jar

    # Check if port is already listening
    $active = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($active) {
        Write-Host "Service $name is already listening on port $port."
    } else {
        Write-Host "Starting $name on port $port..."
        $logFile = "$logsDir\$name.log"
        Start-Process -FilePath "java" -ArgumentList "-jar", "`"$jar`"" -RedirectStandardOutput $logFile -RedirectStandardError "$logsDir\$name-err.log" -WindowStyle Hidden
    }
}

Write-Host "All background services started. Checking status in 5 seconds..."
Start-Sleep -Seconds 5

Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -in 8080, 8081, 8082, 8083, 8084, 8085, 8086 } | Format-Table LocalAddress, LocalPort, State
