import math


class Student:
    def __init__(self, name=''):
        self.name = name
        self.records = []
        self.assessments = []
        self.assessment_sum = 0
        self.exam = 0
        self.final = 0
        self.result = ''
    
    def create_record(self):
        self.records.append({
            'Name': self.name,
            'Assessments': self.assessments,
            'Exam': self.exam,
            'Final Score': self.final,
            'Result': self.result
        })

    def add_assessment(self, id, score):
        self.assessments.append({'id': id, 'score': score})
        self.assessment_sum += score
    
    def add_exam(self, score):
        self.exam = score

    def calc_final(self):
        if len(self.assessments) == 0:
            self.final = self.exam * 0.6 
        else:
            self.final = (self.assessment_sum / len(self.assessments)) * 0.4 + self.exam * 0.6
            self.final = math.ceil(self.final)
            
        if 70 <= self.final <= 100:
            self.result = 'Competent'
        elif 0 <= self.final < 70:
            self.result = 'Not yet Competent'

        self.create_record()
        self.assessment_sum = 0
        self.assessments = []
        self.exam = 0
        return self.final
    
    def display_record(self):
        return self.records
    
    def get_student_record(self, student_name):
        for student in self.records:
            if student['Name'] == student_name:
                return student
        return f'{student_name} not found'
