"""
ARCHES - a program developed to inventory and manage immovable cultural heritage.
Copyright (C) 2013 J. Paul Getty Trust and World Monuments Fund

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
"""

import re
import urllib.request, urllib.error, urllib.parse
from urllib.parse import urlparse
from arches import __version__
from arches.app.models.system_settings import settings
from django.shortcuts import render, redirect
from django.http import HttpResponseNotFound, HttpResponse, HttpResponseRedirect
from django.utils import translation


def marmora(request):
    return render(
        request,
        "projects/landing-marmora.htm",
        {
            "project_name": "Marmora Phrygiae",
            "app_title": settings.APP_TITLE,
            "copyright_text": settings.COPYRIGHT_TEXT,
            "copyright_year": settings.COPYRIGHT_YEAR,
            "version": __version__,
            "show_language_swtich": settings.SHOW_LANGUAGE_SWITCH,
            "all_marmora_filter": '?term-filter=%5B%7B"inverted"%3Atrue%2C"type"%3A"string"%2C"context"%3A""%2C"context_label"%3A""%2C"id"%3A"MOLAB"%2C"text"%3A"MOLAB"%2C"value"%3A"MOLAB"%7D%5D&sort-results=asc',
            "all_context_filter": '?resource-type-filter=%5B%7B"graphid"%3A"d4557c37-589f-4342-b184-ebf8be95c203"%2C"name"%3A"Geographical%20Context%20M.P."%2C"inverted"%3Afalse%7D%5D',
            "all_object_filter": '?resource-type-filter=%5B%7B"graphid"%3A"2bffa167-0b5d-4511-8d4a-a3cb90221343"%2C"name"%3A"Object%20M.P."%2C"inverted"%3Afalse%7D%5D',
            "all_sample_filter": '?resource-type-filter=%5B%7B"graphid"%3A"960348a0-7c57-40e0-828b-6fe082fd0f7a"%2C"name"%3A"Sample%20M.P."%2C"inverted"%3Afalse%7D%5D',
            "cns_analysis_filter": '?resource-type-filter=%5B%7B"graphid"%3A"f8caf14f-500a-439d-9d81-c89399fe3a83"%2C"name"%3A"Conservation%20Analysis%20M.P."%2C"inverted"%3Afalse%7D%5D',
            "crt_analysis_filter": '?resource-type-filter=%5B%7B"graphid"%3A"9a9c3605-9d72-4ac1-be28-6e2a2a14bc8a"%2C"name"%3A"Characterization%20Analysis%20M.P."%2C"inverted"%3Afalse%7D%5D',
            "caves_filter": '?advanced-search=%5B%7B"op"%3A"and"%2C"61a48836-a939-11ed-b2a7-afded3edabff"%3A%7B"op"%3A""%2C"val"%3A"4cf24b33-6421-4ed5-80a2-844b76238b6e"%7D%7D%5D',
            "monuments_filter": '?advanced-search=%5B%7B"op"%3A"and"%2C"61a48836-a939-11ed-b2a7-afded3edabff"%3A%7B"op"%3A""%2C"val"%3A"631b552d-b995-4229-abe1-eca50688f367"%7D%7D%5D',
            "era_filter": '?advanced-search=%5B%7B"op"%3A"and"%2C"6f7fee58-9202-11ed-8643-8c85907a3f93"%3A%7B"op"%3A""%2C"val"%3A""%7D%7D%5D',
            "chronology_filter": '?advanced-search=%5B%7B"op"%3A"and"%2C"c323539c-937e-11ed-8743-8c85907a3f93"%3A%7B"op"%3A""%2C"val"%3A""%7D%7D%5D',
            "context_filter": '?advanced-search=%5B%7B"op"%3A"and"%2C"7812824a-9510-11ed-b0aa-8c85907a3f93"%3A%7B"op"%3A""%2C"val"%3A""%7D%2C"dd0e3910-950f-11ed-b0aa-8c85907a3f93"%3A%7B"op"%3A""%2C"val"%3A""%7D%7D%5D',
            "material_filter": '?advanced-search=%5B%7B"op"%3A"and"%2C"157c0e48-9516-11ed-b0aa-8c85907a3f93"%3A%7B"op"%3A""%2C"val"%3A""%7D%2C"519e837e-9516-11ed-b0aa-8c85907a3f93"%3A%7B"op"%3A""%2C"val"%3A""%7D%2C"c5b2b03c-9516-11ed-b0aa-8c85907a3f93"%3A%7B"op"%3A"~"%2C"val"%3A""%7D%7D%5D',
        },
    )


def molab001(request):
    return render(
        request,
        "projects/landing-molab001.htm",
        {
            "project_name": "E-RIHS MOLAB Projects: illuminated manuscripts",
            "app_title": settings.APP_TITLE,
            "copyright_text": settings.COPYRIGHT_TEXT,
            "copyright_year": settings.COPYRIGHT_YEAR,
            "version": __version__,
            "show_language_swtich": settings.SHOW_LANGUAGE_SWITCH,
            "all_molab_filter": '?sort-results=desc&term-filter=%5B%7B"inverted"%3Afalse%2C"type"%3A"string"%2C"context"%3A""%2C"context_label"%3A""%2C"id"%3A"MOLAB"%2C"text"%3A"MOLAB"%2C"value"%3A"MOLAB"%7D%5D',
            "projects_filter": '?term-filter=%5B%7B"inverted"%3Afalse%2C"type"%3A"string"%2C"context"%3A""%2C"context_label"%3A""%2C"id"%3A"MOLAB"%2C"text"%3A"MOLAB"%2C"value"%3A"MOLAB"%7D%5D&resource-type-filter=%5B%7B"graphid"%3A"0b9235d9-ca85-11e9-9fa2-a4d18cec433a"%2C"name"%3A"Project"%2C"inverted"%3Afalse%7D%5D',
            "manuscripts_filter": '?advanced-search=%5B%7B"op"%3A"and"%2C"63e49254-c444-11e9-afbe-a4d18cec433a"%3A%7B"op"%3A""%2C"val"%3A%5B"adf1df7a-3119-42ac-a8b8-e035b16af5ee"%5D%7D%7D%5D',
            "sculptures_filter": '',
            "observations_filter": '?term-filter=%5B%7B"inverted"%3Afalse%2C"type"%3A"string"%2C"context"%3A""%2C"context_label"%3A""%2C"id"%3A"MOLAB"%2C"text"%3A"MOLAB"%2C"value"%3A"MOLAB"%7D%5D&resource-type-filter=%5B%7B"graphid"%3A"615b11ee-c457-11e9-910c-a4d18cec433a"%2C"name"%3A"Observation"%2C"inverted"%3Afalse%7D%5D',
            "samplings_filter": '',
            "empty_filter": '?term-filter=%5B%7B"inverted"%3Afalse%2C"type"%3A"string"%2C"context"%3A""%2C"context_label"%3A""%2C"id"%3A"EMPTY"%2C"text"%3A"EMPTY"%2C"value"%3A"EMPTY"%7D%5D',
        },
    )
