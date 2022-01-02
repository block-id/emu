from django.http.response import Http404


def http_404(request):
    raise Http404("Not found.")
