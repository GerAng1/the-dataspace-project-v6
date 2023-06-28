from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns

from arches_project_v6.views.projects import marmora, molab001

urlpatterns = [
    url(r'^', include('arches.urls')),
    url(r"^projects/marmora", marmora, name='marmora'),
    url(r"^projects/molab001", molab001, name='molab001'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.SHOW_LANGUAGE_SWITCH is True:
    urlpatterns = i18n_patterns(*urlpatterns)