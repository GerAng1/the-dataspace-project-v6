from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

import platform

if platform.system().lower() == "windows":
    os.environ.setdefault("FORKED_BY_MULTIPROCESSING", "1")

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'arches_project_v6.settings')
app = Celery('arches_project_v6')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
