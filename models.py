from app import db

class Problem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)
    is_solved = db.Column(db.Boolean, default=False)
    notes = db.Column(db.Text)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "difficulty": self.difficulty,
            "is_solved": self.is_solved,
            "notes": self.notes,
        }


