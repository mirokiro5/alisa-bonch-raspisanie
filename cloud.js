    /*console.log("event")
    console.log(event)
    console.log("context")
    console.log(context)*/
    console.log(event.request)
    let pld = "";
    let word = event.request.nlu.tokens;
    if ('payload' in event.request){
        if('name' in event.request.payload)
        pld = event.request.payload.name}
    if (word.includes("сегодня") || pld == "today"){
        //if(0){
        return {
            response:{
            "text": "Расписание на 21 ноября\nОперационные системы и сети, 4 пара, 437 ауд.\nАрхитектура вычислительных систем, 5 пара, 445 ауд.\nЛогическое и функциональное программирование, 6 пара, 437 ауд.",
            "tts": "21-ое ноября.4-ой парой,операционные системы и сети; находится в 437-ой аудитории.5-ой парой,архитектура вычислительных систем; находится в 445-ой аудитории.6-ой парой,логическое и функциональное программирование; находится в 437-ой аудитории.",
            },
            version: "1.0"
        }
    }
    if (word.includes("завтра") || pld == "tomorrow"){
        //if(0){
        return {
            response:{
            "text": "Расписание на 22 ноября\nСетевые технологии, 1 пара, 512 ауд.\nСетевые технологии, 2 пара, 512 ауд.",
            "tts": "22-ое ноября.1-ой парой,сетевые технологии; находится в 512-ой аудитории.2-ой парой,Сетевые технологии; находится в 512-ой аудитории.",
            },
            version: "1.0"
        }
    }
    else{
    return {
        response: {
            "text": "Здравствуйте! На какой день вы хотите узнать расписание?",
            "tts": "Здравствуйте! На какой день вы хотите узнать расписание?",
            "buttons": [
                {
                    "title": "Сегодня",
                    "payload": {"name":"today"},
                    "hide": true
                 },
                {
                    "title": "Завтра",
                    "payload": {"name":"tomorrow"},
                    "hide": true
                }
            ],
        },
        version: "1.0"
    };
    };