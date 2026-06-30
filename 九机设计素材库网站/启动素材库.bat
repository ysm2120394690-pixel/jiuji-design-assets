@echo off
chcp 65001 >nul
echo ========================================
echo    九机设计素材库 - 启动菜单
echo ========================================
echo.
echo  [1] 打开九机设计素材库（主站）
echo  [2] 打开 Banner 管理器
echo  [3] 同时打开两个页面
echo  [0] 退出
echo.
set /p choice=请输入选项编号:
if "%choice%"=="1" (
    start "" "九机设计素材库.html"
) else if "%choice%"=="2" (
    start "" "banner管理器.html"
) else if "%choice%"=="3" (
    start "" "九机设计素材库.html"
    start "" "banner管理器.html"
) else (
    exit
)