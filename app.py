from flask import Flask, request, jsonify, render_template
from student import Student # type: ignore

app = Flask(__name__)

students_list = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_student', methods=['POST'])
def add_student():
    data = request.json
    name = data.get('name')
    assessments = data.get('assessments')
    exam = data.get('exam')

    if not name or not assessments or exam is None:
        return jsonify({'error': 'Invalid input'}), 400

    student = Student(name)
    for i, score in enumerate(assessments, start=1):
        student.add_assessment(i, score)
    
    student.add_exam(exam)
    student.calc_final()
    students_list.append(student)
    
    return jsonify(student.display_record()), 200

@app.route('/view_records', methods=['GET'])
def view_records():
    records = [student.display_record() for student in students_list]
    return jsonify(records), 200

@app.route('/find_student/<name>', methods=['GET'])
def find_student(name):
    for student in students_list:
        record = student.get_student_record(name)
        if isinstance(record, dict):
            return jsonify(record), 200
    return jsonify({'error': f'{name} not found in records'}), 404

@app.route('/help')
def help_page():
    return render_template('help.html')

if __name__ == '__main__':
    app.run(debug=True)
