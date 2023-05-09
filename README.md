# Chat App

Using this application, users can chat privately

## Demo Login Credentials

for user2 -> username - user2@gmail.com , password - 12345678 \
for user1 -> username - user1@gmail.com , password - 12345678

## Chat

- **Signup**

  - Signup form will ask user Details, on valid input fields signup is processed
  - After Signup activate your Account by visiting the link sent to your email which is used at the time of signup
  - After email verification you are good to go to the login process.

- **Login**

  - Login to your account with credentials

- **Forgot Password**

  - You can click on the forgot Password button on login page, and navigate to the forgot password page, then after verifying your email id, a reset password link will be sent to your email id, which exit in your Account details
  - Using this link you can change the password from client

- **User Chat Steps**

  - After Login user will be landed on the homepage which will show all Users (List of Rooms).
  - Select the required User and you will be joined with that room for chat in socket io
  - first all room messages will get loaded and each message will be emitted to io server, which listend to this event and saves the message and also emits new messages to the room


