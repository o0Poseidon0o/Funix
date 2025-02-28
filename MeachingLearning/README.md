- Cài đặt Django
    + pip install django
    + django-admin --version (kiểm tra phiên bản)
- tạo dự án django
    + django-admin startproject myproject
- Chạy dự án
    + python manage.py runserver

- Mở file settings.py trong thư mục dự án (myproject/myproject/settings.py).
    + ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'your-server-ip']


- Mặc định Django sử dụng là MySQL còn muốn sử dụng Postgresql thì thực hiện như sau
    + pip install psycopg2-binary

    Sửa DATABASES trong settings.py
        DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

- Tạo ứng dụng mới 
    + python manage.py startapp myapp
    Thêm ứng dụng vào INSTALLED_APPS trong settings.py:
    INSTALLED_APPS = [
    ...
    'myapp',
]

- Tạo migration và migrate
    + python manage.py makemigrations
    + python manage.py migrate
- Django có giao diện quản trị mặc định. Tạo tài khoản quản trị:
    + python manage.py createsuperuser
- Cài thư viện
pip install django scikit-learn pandas numpy
