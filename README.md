# Семинарска работа: Веб chat апликација (MERN STACK): Клиентски дел
За да биде функционален клиентскиот дел, прво мора да биде стартуван серверскиот дел за проектот, кој се наоѓа на линкот: https://github.com/dimitarduino/dchat-client
При старт на клиентскиот дел, истиот ќе биде достапен на port: 3000.

# Хостинг (Клиентски дел)
Покрај начинот за локално стартување на апликацијата, апликацијата е хостирана со автоматски deploy (при commit во master, автоматски се обновува најновата верзија) на линкот: https://dchat-client.netlify.app/

Линкот на серверскиот дел од апликацијата каде испраќа барања клиентот е: https://dchat-backend.herokuapp.com/ 

Исто така хостирана е и на dockerhub: https://hub.docker.com/repository/docker/dimitarduino/dchat-client

# Постапки во терминал за старт на клиентскиот дел
1. git clone https://github.com/dimitarduino/dchat-client
2. cd dchat-client 
3. npm install
4. npm start


# Постапки за работа на апликацијата
(За самостојно тестирање на апликацијата (на еден компјутер), потребно е вториот креиран профил да се најавува во друг пребарувач/incognito)
1. Потребна е регистрација и најава за да влезете во Вашиот профил.
2. Потоа со клик на копчето за нова порака, се отвора прозорец каде треба да ги напишете email адресите на сите останати членови што сакате да бидат во креираната група (можно е само додавање на корисници што веќе имаат профил во апликацијата - регистрирани корисници) и име на групата.
3. По креирање на група, корисниците во групата, може да праќаат пораки меѓусебно (реализирано со веб сокети и база на податоци (mongodb)) - Првично секоја порака се праќа преку веб сокет до сите корисници во таа група, а потоа се запишува и во база на податоци.
4. Искористени се react hooks наместо redux како state management
5. Функциите во кои има барања (requests) до серверскиот дел се наоѓаат во src/context/{chat,auth}/{chatState,authState}, кои после запишување во база, преку одредени акции во reducer-ите (src/context/{chat,auth}/{chatReducer,authReducer}) прават промени во локалниот state, за да нема потреба повеќекратно да се читаат податоци од базата.
6. Целата контрола со веб сокетите (listeners i emitters) се наоѓа во фајлот: sockets.js (src/help/sockets.js)