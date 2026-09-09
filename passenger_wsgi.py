import sys, os

# Добавляем папку с проектом в путь поиска Python
sys.path.insert(0, os.path.dirname(__file__))

# Импортируем Flask-приложение
from app import app as application