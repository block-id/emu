from django.shortcuts import render

# View for rendering the React SPA
def react(request):
    return render(request, "react/base.html")
