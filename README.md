# Restful-API-Express

Xin chào, mình tên là Long (Longlee), mục đích mình tạo Repo này là muốn chia sẻ cách thực hiện và tạo ra 1 project chuẩn về Restful API. Thực tế đây là assignment của 1 bạn Inter nhờ mình thực hiện (hiện bạn ấy đang thực tập tại 1 công ty bên Mỹ), và mình nhận thấy assignment mà họ yêu cầu rất chặt chẽ và cực kỳ đầy đủ, đặc biệt là bộ test case. Chính vì vậy sau khi hoàn thành project này, mình muốn share với mọi người cách mà mình thực hiện , nếu có gì sai hoặc không chính xác, các bạn hãy comment vào các đoạn code hoặc đặt Issues cho mình nhé. Xin cảm ơn mọi người.

Hi, my name is Long (LongLee), I create this Repo because I want to share with you how to build and setup a Restul API project. In fact, this is an assignment from my friend (he is an Intern in USA), and I realized that this assignment is very complete, especially 
the test case. So, after I finished this project, I want to share to you what am I doing, if something is not correct, please comment into my code or you can create an Issues. Thanks. 

### Tổng quát

- Setup 1 project với ExpressJS
- Triển khai Restful API
- Sử dụng Jest để test code
- Tạo docs cho API sử dụng Swagger
- Cấu hình cơ bản CORS


**Mục lục**

###Cài đặt

  Vào thư mục `/api` chạy lệnh sau
  - Linux
  		

    npm install && npm install -g

- Windows
	

    npm install; npm install -g

Dùng file `dump.sql` để tạo bảng và dữ liệu mặc định hoặc chạy lệnh: `migrate` để tạo các bảng cở sở dữ liệu (lưu ý lệnh migrate chỉ tạo bảng **users**)

Sau khi thực hiện xong truy cập vào **http://localhost:3001** để kiểm tra.



###Swagger
Truy cập vào đường dẫn **http://localhost:3001/api-docs** để đọc tài liệu về API.

###Test

Vào thư mục `/test` và chạy lệnh `npm install`

Để thực hiện test API chạy lệnh sau

    npm run dev
