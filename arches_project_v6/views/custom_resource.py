from django.http import JsonResponse
from django.utils.translation import ugettext as _
from arches.app.models.resource import Resource
from arches.app.models.system_settings import settings
from arches.app.search.mappings import RESOURCES_INDEX
import logging

logger = logging.getLogger(__name__)

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def resource_copy(request):
    if request.method == 'POST':
        resourceinstance_id = request.POST.get('resourceinstance_id')
        try:
            resource_instance = Resource.objects.get(pk=resourceinstance_id)
            # Call the copy() function on the resource_instance object
            resource_instance.copy()
            return JsonResponse({'message': 'Copy operation successful'})
        except Resource.DoesNotExist:
            return JsonResponse({'error': 'Resource not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
