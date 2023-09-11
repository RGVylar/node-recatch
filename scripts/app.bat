@echo off
start C:\Users\Usuario\Downloads\EC3jmmyXUAEMo5C.jpg

:: Esperar 5 segundos (utilizando ping)
ping 127.0.0.1 -n 3 > nul

:: Cerrar la aplicación que muestra la imagen
taskkill /f /im Microsoft.Photos.exe

:: Esperar un segundo para asegurarse de que se cierre
ping 127.0.0.1 -n 2 > nul

exit
