from django.db import models

class University(models.Model):    # 大學 66間
    universityID = models.CharField(max_length=100,default='N/A')
    universityName = models.CharField(max_length=100,default='N/A')

class Department(models.Model):    # 所有學系
    departmentID = models.CharField(max_length=100,default='N/A')
    departmentName = models.CharField(max_length=100,default='N/A')
    enrollment = models.CharField(max_length=100,default='N/A')
    chineseStandard = models.CharField(max_length=100,default='N/A')
    chineseRate = models.CharField(max_length=100,default='N/A')
    englishStandard = models.CharField(max_length=100,default='N/A')
    englishRate = models.CharField(max_length=100,default='N/A')
    mathAStandard = models.CharField(max_length=100,default='N/A')
    mathARate = models.CharField(max_length=100,default='N/A')
    mathBStandard = models.CharField(max_length=100,default='N/A')
    mathBRate = models.CharField(max_length=100,default='N/A')
    socialStandard = models.CharField(max_length=100,default='N/A')
    socialRate = models.CharField(max_length=100,default='N/A')
    scienceStandard = models.CharField(max_length=100,default='N/A')
    scienceRate = models.CharField(max_length=100,default='N/A')
    EnglishListeningStandard = models.CharField(max_length=100,default='N/A')
    addtionStandard = models.CharField(max_length=100,default='N/A')
    addtionRate = models.CharField(max_length=100,default='N/A')
