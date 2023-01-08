const { Alice, Reply, Markup, Stage, Scene } = require('yandex-dialogs-sdk');
const alice = new Alice();
const stage = new Stage();
const SCENE_SETTINGS = 'SCENE_SETTINGS';
const user_settings = new Scene(SCENE_SETTINGS);
const group_choose = new Scene('group_choose');
const output_mode = new Scene('output_mode');
alice.command(['завтра','на завтра'], async ctx =>{
  return {
    "text": "Расписание на 29 декабря\nСетевые технологии, 1 пара, 512 ауд.\nСетевые технологии, 2 пара, 512 ауд.",
            "tts": "29-ое декабря.1-ой парой,сетевые технологии; находится в 512-ой аудитории.2-ой парой,Сетевые технологии; находится в 512-ой аудитории.",
  };
  //alice.on('request', ctx => group = ctx.message);
});
alice.command(['сегодня','на сегодня'], async ctx =>{
  let rasp="Расписание на 28 декабря\nРазработка и анализ требований проектирования ПО, 1 пара, 445 ауд.";
  let rasp_tts="28-ое декабря.1-ой парой,разработка и анализ требований проектирования ПО; находится в 445-ой аудитории.";
  console.log(ctx.session.get('send_image'));
  if(ctx.session.get('send_image')){
  return Reply.bigImageCard(rasp_tts, {
    image_id: '1540737/f3bd3adb5a71027f4e21',
    description: rasp, // optional
    button: Markup.button('click'), // optional
  });
}
else{
  //Reply.text('Расписание на 22 декабря\nСетевые технологии, 1 пара, 512 ауд.\nСетевые технологии, 2 пара, 512 ауд.');
  return {
    "text": "Расписание на 28 декабря\nРазработка и анализ требований проектирования ПО, 1 пара, 445 ауд.",
            "tts": "28-ое декабря.1-ой парой,разработка и анализ требований проектирования ПО; находится в 445-ой аудитории.",
  };
}
});

stage.addScene(user_settings);
stage.addScene(group_choose);
stage.addScene(output_mode);
alice.use(stage.getMiddleware());
alice.command('Настройки', ctx => {
  ctx.enter('SCENE_SETTINGS');
  //return {"text": "Здравствуйте!"}
  return Reply.text('Давайте настроим ваш аккаунт', {
    buttons: ['выбор группы', 'назад','выбор режима вывода'],
  });
});
alice.command('кто я', ctx => Reply.text('Ваша группа '+ctx.session.get('group')));

user_settings.command('buy vodka', ctx => Reply.text(`you're dead`));
user_settings.command('выбор режима вывода', ctx => {
  ctx.enter('output_mode');
  return Reply.text('Включить вывод картинкой?');
}
);
user_settings.command('выбор группы', ctx => {
  ctx.enter('group_choose');
  return Reply.text('Введите вашу группу');
}
);
user_settings.command('назад', ctx => ctx.leave());
user_settings.any(ctx => Reply.text('не поняла'));

group_choose.command('назад', ctx => ctx.leave());
group_choose.command('выбор группы', ctx => Reply.text('Вы уже в выборе группы'));
group_choose.any(ctx => {
  if(ctx.message.includes('ИКПИ') && ctx.message.length<10){
    console.log(ctx.message);
    ctx.session.set('group', ctx.message);
    ctx.leave();
    return Reply.text('Ваша группа: '+ctx.message);
  }
  else{
    return Reply.text('Вы ввели неправильную группу');
  }
});

output_mode.command('назад', ctx => ctx.leave());
output_mode.command('да', ctx => {ctx.session.set('send_image',true); ctx.leave(); return Reply.text('Вы выбрали режим вывода картинкой')});
output_mode.command('нет', ctx => {ctx.session.set('send_image',false); ctx.leave(); return Reply.text('Вы выбрали режим вывода текстом')});
output_mode.any(ctx => Reply.text('Вы ввели неправильный ответ'));



alice.any(async ctx => {
  return {"text": "Здравствуйте! На какой день вы хотите узнать расписание?",
  "tts": "Здравствуйте! На какой день вы хотите узнать расписание?",
  "buttons": [
      {
          "title": "Сегодня",
          //"payload": {"name":"today"},
          "hide": true
       },
      {
          "title": "Завтра",
          //"payload": {"name":"tomorrow"},
          "hide": true
      },
      {
        "title": "Настройки",
        //"payload": {"name":"tomorrow"},
        "hide": true
    }
  ],}
});
const server = alice.listen(8083, '/');