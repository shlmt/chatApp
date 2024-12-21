# NgChat

A real-time chat application with multiple chat rooms, built with Angular, Firebase, and Angular Material.

## 🎉 Features

- **Real-Time Chat:** Multiple chat rooms powered by Firestore database.
- **Material Design:** Sleek and responsive UI using Angular Material.
- **Authentication:** Secure login using Firebase Authentication & Sign in with Google or Github.
- **File Attachments:** Attach files to messages, with a preview for image files.
- **Voice Typing:** speech-to-text functionality using `webkitSpeechRecognition` for message input.
- **Theme Switcher:** Switch between dark and light themes with CSS variables.
- **Relative Time Display:** Messages show timestamps like "just now," "a minute ago," or "yesterday at 14:35".
- **Links Display:** Detects URLs in text and renders them as clickable, styled links (securely sanitized by Angular).


## 🏆 Technologies

- ![Angular](https://img.shields.io/badge/Angular-12-brightgreen?style=for-the-badge&logo=angular&logoColor=white) **Angular 12**  (includes routing, guard, angular-animations, custom Pipe, custom Directive, Unit Tests with Karma & Jasmine etc.)
- ![Firebase](https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black) **Firebase** Google-Authentication, Storage, Firestore
- **Angular Material**

## 🚀 Getting Started

Follow these steps to set up the project:

1. Clone the repository: ```git clone https://github.com/shlmt/ng-chat.git```
2. Install dependencies: ```npm install```
3. Run the application: ```ng serve``` or Run unit-tests: ```ng test --include='src\app\relative-time.pipe.spec.ts'```
#### 🛠️ Firebase Configuration
To connect the app with Firebase, you need to configure the Firebase API keys and other settings. Follow these steps:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project or create a new one.
3. In the project settings, navigate to the "General" tab and find your Firebase configuration, which will look like this:
```javascript
firebaseConfig: {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
}
```

## 📚 Credits
Inspired by [![YouTube](https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/YouTube_icon_%282013-2017%29.png/20px-YouTube_icon_%282013-2017%29.png)](https://www.youtube.com/playlist?list=PLjMCGG-3Are1OsXa-TTGSZBjT5ij3HAVn)
[this course](https://www.youtube.com/playlist?list=PLjMCGG-3Are1OsXa-TTGSZBjT5ij3HAVn). Thanks to the instructor for the amazing content! </br>
*Note: This project includes personal solutions, modifications, and customizations beyond the original course content.*

## 📷 Screenshots
<img src="https://github.com/user-attachments/assets/d9479772-f235-479a-87d0-74dcb11b3d07" height="300px"/>  
<img src="https://github.com/user-attachments/assets/b48a7870-baf5-4ef4-b8b4-963b8993d072" height="300px"/>
<img src="https://github.com/user-attachments/assets/6bea81d4-a299-4241-a11c-6242bba6ec23" height="300px"/>
