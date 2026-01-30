"""
URL configuration for apply project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from applyAPP.views import index,introduction,brochure,review_data,interview,game    \
    ,get_school_data,get_department_data,get_details_data,get_department_code_data

urlpatterns = [
    path("admin/", admin.site.urls),
    path('',index),  # 沒有/的頁面
    path('index/',index),
    path('introduction/',introduction),
    path('brochure/',brochure),
    path('review_data/',review_data),
    path('interview/',interview),
    path('game/',game),

    path('get_school_data/',get_school_data),
    path('get_department_data/',get_department_data),
        path('get_department_code_data/',get_department_code_data),
    path('get_details_data/',get_details_data),
]
