from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden, JsonResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import *
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))
    
@login_required(login_url='login')
def index(request):
    notes = request.user.notes
    tasks = request.user.tasks.all()
    print(tasks)
    return render(request, "todo/index.html", {
        "notes": notes,
        "tasks": tasks
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        print(username)
        print(password)
        user = authenticate(request, username=username, password=password)
        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "todo/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        logout(request)
        return render(request, "todo/login.html")

def register_view(request):
    if request.method == "POST":
        email = request.POST["email"]
        username = request.POST["username"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
        except IntegrityError:
            return render(request, "todo/register.html", {
                "message": "username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        logout(request)
        return render(request, "todo/register.html")

@csrf_exempt
def notes(request):
    if request.method == "POST":
        data = json.loads(request.body).strip()
        request.user.notes = data
        request.user.save()
        print(data)
        return JsonResponse({"success" : ""}, status=200)

@csrf_exempt
def tasks(request):
    if request.method == "POST":
        task = json.loads(request.body)
        if "add" in task:
            new_task = Tasks(user=request.user, task=task['add']) 
            new_task.save()
        elif "delete" in task:
            Tasks.objects.filter(task=task['delete']).delete()

        return JsonResponse({"success" : ""}, status=200)