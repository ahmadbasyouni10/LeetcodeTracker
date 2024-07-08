from app import app, db
from flask import request, jsonify
from models import Problem

# CRUD operations for problems

# Get all problems
@app.route("/api/problems", methods=["GET"])
def get_problems():
    problems = Problem.query.all()
    result = [problem.to_json() for problem in problems]
    return jsonify(result)

# Create a new problem
@app.route("/api/problems", methods=["POST"])
def create_friend():
    try:
        data = request.json

        required_fields = ["name", "difficulty", "status"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        name= data.get("name")
        difficulty= data.get("difficulty")
        status=data.get("status")
        notes=data.get("notes")

        new_problem = Problem(
            name=name,
            difficulty=difficulty,
            status=status,
            notes=notes,
        )

        db.session.add(new_problem)
        db.session.commit()
        return jsonify(new_problem.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message" : str(e)}), 500

# Delete a problem
@app.route("/api/problems/<int:problem_id>", methods=["DELETE"])
def delete_problem(problem_id):
    try:
        problem = Problem.query.get(problem_id)
        if problem:
            db.session.delete(problem)
            db.session.commit()
            return jsonify({"message": "Problem deleted successfully"}), 200
        else:
            return jsonify({"message": "Problem not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

# Edit a problem
@app.route("/api/problems/<int:problem_id>", methods=["PATCH"])
def edit_problem(problem_id):
    try:
        problem = Problem.query.get(problem_id)
        if problem:
            data = request.json
            problem.name = data.get("name", problem.name)
            problem.difficulty = data.get("difficulty", problem.difficulty)
            problem.status = data.get("status", problem.status)
            problem.notes = data.get("notes", problem.notes)
            db.session.commit()
            return jsonify(problem.to_json()), 200
        else:
            return jsonify({"message": "Problem not found"}), 404
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
