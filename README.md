# ChoiceHelper
선택이 어려운 사람들을 위한 랜덤선택 서비스



https://choice-helper-diuni-ksa37.netlify.app 에서 서비스를 확인할 수 있고, 배포에는 Netlify와 Heroku를 이용하였습니다.

<br/><br/>

## 기술스택
- MERN (MongoDB, Express, React js, Node js)

<br/><br/>

## How to run the project
```
$ git clone https://github.com/ksa37/ChoiceHelper.git
$ cd server
$ npm run start
$ (another terminal)
$ cd client
$ npm run start
```
Open http://localhost:3000 in browser to access this program.

<br/><br/>

## Demo Video
![demo_AdobeCreativeCloudExpress](https://user-images.githubusercontent.com/50884017/160632993-4a091fd5-67b7-468a-963f-6132ff0b3609.gif)

<br/><br/>

## Detailed description
### 1) Main page
 
- 선택지를 입력할 수 있는 페이지입니다.
- '추가하기' 버튼을 눌러 최대 7개까지의 선택지를 입력할 수 있습니다.
- 개발 중인 기능: 흔들림을 감지하면 골라주기      
 
<img width="255" alt="image" src="https://user-images.githubusercontent.com/50884017/160634241-9ff4e905-27ef-43ef-8cd9-99194b8dc74e.png"> ![demo_2022_03_29_AdobeCreativeCloudExpress](https://user-images.githubusercontent.com/50884017/160635065-97832852-bed8-4ad4-bc3b-c556e05fad31.gif)    


### 2) Selected page

- 주어지 선택지 중에서 랜덤하게 선택된 것이 보여지는 페이지입니다.
- 최근 다른 사람들의 선택지들을 확인할 수 있습니다.
- 개발 중인 기능: 공유하기   

<img width="255" alt="image" src="https://user-images.githubusercontent.com/50884017/160634185-3b199537-7aa8-4ea1-a34f-3ecf94ab6302.png">



<br/><br/>

## 역할 분담
- 김수아: 프론트엔드(React js, Redux)
- 박지윤: 백엔드(디비와 서버를 연결해서 프론트엔드로부터 데이터를 저장하거나, 프론트엔드가 요청한 데이터를 전송)
