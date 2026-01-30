from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
import json
import requests
import os
from pathlib import Path
import csv
from applyAPP.models import University,Department

def index(request):
    # department_data() 用來建資料庫
    return render(request,'index.html',locals())

def introduction(request):  # 個人申請介紹

    return render(request,'introduction.html',locals())

def brochure(request):      # 簡章查詢
    departments_details = None
    return render(request,'brochure.html',locals())

def review_data(request):   # 審查資料項目
    
    return render(request,'review_data.html',locals())

def interview(request):      # 面試準備
    
    return render(request,'interview.html',locals())

def game(request):          # 遊戲
    
    return render(request,'game.html',locals())

'''
def department_data():   # 學系資料
    department_path = os.path.join(Path(__file__).resolve().parent,'校系')
    for file_name in os.listdir(department_path):
        id,name = file_name.split('.')[0].split('_') # 001_國立臺灣大學.csv
        if not University.objects.filter(universityID=id).exists():
            university = University(
                universityID = id,
                universityName = name,
            )
            university.save()

        with open(department_path+'/'+file_name, 'r', newline='') as csvfile:
            # 使用csv.reader讀取檔案
            csv_reader = csv.reader(csvfile)
            # 讀取並忽略標題行
            header = next(csv_reader)
            # 迭代每一行
            for row in csv_reader:
                if csv_reader.line_num % 2 == 0:
                    data1 = row
                elif csv_reader.line_num % 2 == 1:
                    data2 = row[3:]
                    data2.pop(-2)
                    if not Department.objects.filter(departmentID=data1[0]).exists():
                        department = Department(
                            departmentID = data1[0],
                            departmentName = data1[1],
                            enrollment = data1[2],
                            chineseStandard = data1[3],
                            chineseRate = data2[0],
                            englishStandard = data1[4],
                            englishRate = data2[1],
                            mathAStandard = data1[5],
                            mathARate = data2[2],
                            mathBStandard = data1[6],
                            mathBRate = data2[3],
                            socialStandard = data1[7],
                            socialRate = data2[4],
                            scienceStandard = data1[8],
                            scienceRate = data2[5],
                            EnglishListeningStandard = data1[9],
                            addtionStandard = data1[10],
                            addtionRate = data2[6],
                        )
                        department.save()
'''         

def get_school_data(request):       # javascript用 取學校
    universities = University.objects.all()
    data = [{'universityID': university.universityID, 'universityName': university.universityName} for university in universities]
    return JsonResponse(data, safe=False)

def get_department_data(request):   # javascript用 取學系
    departments = Department.objects.all()
    data = []
    for department in departments:
        if all(item['departmentName'] != department.departmentName for item in data):   # 不重複
            data.append({'departmentName':department.departmentName})
    return JsonResponse(data, safe=False)

def get_department_code_data(request):
    departments = Department.objects.all()
    data=[{'departmentID':department.departmentID} for department in departments]
    return JsonResponse(data, safe=False)

def get_details_data(request):
    departments = Department.objects.all()
    universities = University.objects.all()
    data = json.loads(request.body)
    universityID = data.get('universityID','')
    departmentName = data.get('departmentName','')
    departmentID = data.get('departmentID','')
    std = data.get('std','')

    departments_details = []
    if universityID != '':
        universityName = ''
        for i in range(len(universities)):
            if universities[i].universityID == universityID:
                universityName = universities[i].universityName
        departments_details = [{'departmentID':item.departmentID,'universityName':universityName,'departmentName':item.departmentName,
                                'enrollment':item.enrollment,'chineseStandard':item.chineseStandard,
                                'chineseRate':item.chineseRate,'englishStandard':item.englishStandard,
                                'englishRate':item.englishRate,'mathAStandard':item.mathAStandard,
                                'mathARate':item.mathARate,'mathBStandard':item.mathBStandard,
                                'mathBRate':item.mathBRate,'socialStandard':item.socialStandard,
                                'socialRate':item.socialRate,'scienceStandard':item.scienceStandard,
                                'scienceRate':item.scienceRate,'englishListeningStandard':item.EnglishListeningStandard,
                                'addtionStandard':item.addtionStandard,'addtionRate':item.addtionRate}
                               for item in departments if item.departmentID[0:3]==universityID]
    
    elif departmentName != '':
        universityName = ''
        for item in departments:
            if departmentName in item.departmentName:
                for i in range(len(universities)):
                    if universities[i].universityID == item.departmentID[0:3]:
                        universityName = universities[i].universityName
                departments_details += [{'departmentID':item.departmentID,'universityName':universityName,'departmentName':item.departmentName,
                                    'enrollment':item.enrollment,'chineseStandard':item.chineseStandard,
                                    'chineseRate':item.chineseRate,'englishStandard':item.englishStandard,
                                    'englishRate':item.englishRate,'mathAStandard':item.mathAStandard,
                                    'mathARate':item.mathARate,'mathBStandard':item.mathBStandard,
                                    'mathBRate':item.mathBRate,'socialStandard':item.socialStandard,
                                    'socialRate':item.socialRate,'scienceStandard':item.scienceStandard,
                                    'scienceRate':item.scienceRate,'englishListeningStandard':item.EnglishListeningStandard,
                                    'addtionStandard':item.addtionStandard,'addtionRate':item.addtionRate}
                                ]

    elif departmentID != '':
        universityName = ''
        for i in range(len(universities)):
            if universities[i].universityID == departmentID[0:3]:
                universityName = universities[i].universityName
        departments_details = [{'departmentID':item.departmentID,'universityName':universityName,'departmentName':item.departmentName,
                                'enrollment':item.enrollment,'chineseStandard':item.chineseStandard,
                                'chineseRate':item.chineseRate,'englishStandard':item.englishStandard,
                                'englishRate':item.englishRate,'mathAStandard':item.mathAStandard,
                                'mathARate':item.mathARate,'mathBStandard':item.mathBStandard,
                                'mathBRate':item.mathBRate,'socialStandard':item.socialStandard,
                                'socialRate':item.socialRate,'scienceStandard':item.scienceStandard,
                                'scienceRate':item.scienceRate,'englishListeningStandard':item.EnglishListeningStandard,
                                'addtionStandard':item.addtionStandard,'addtionRate':item.addtionRate}
                               for item in departments if item.departmentID==departmentID]
    #return render(request,'brochure.html',locals())
    return JsonResponse(departments_details, safe=False)
