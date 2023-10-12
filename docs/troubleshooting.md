1. Some command not working?
   1. Make sure your virtual environment is active!
2. setup_db not working or site not loading?
   1. Make sure you're running elasticsearch
3. Site noT showing?
   1. Maybe ALLOWED_HOSTS within settings_local.py is not setup correctly with your IP address.
   2. The command "python manage.py runserver" must include the ip address and port where being served:
      1. `python manage.py runserver XXX.XXX.XXX.XXX:8000`