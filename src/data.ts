import { GameData } from './types';

export const DATA: GameData = {
  questions: [
    {
      text: "Самая длинная река в мире — Амазонка?",
      answer: true,
      explanation: "По современным исследованиям Амазонка признана самой длинной рекой, обгоняя Нил.",
      bg: "https://divoworld.ru/wp-content/uploads/2019/03/tmp-1447072894.jpg",
      styles: {
        backgroundColor: '#e0f7fa',
        color: '#006064',
        borderRadius: '40px 4px 40px 4px',
        border: '4px solid #006064'
      },
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#006064" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2-2 2-2 4 0s2 2 4 0 2-2 4 0 2 2 4 0 2-2 4 0"/></svg>'
    },
    {
      text: "Молния никогда не бьет в одно и то же место дважды?",
      answer: false,
      explanation: "Молния часто бьет в одно и то же место, особенно если это высокий объект.",
      bg: "https://huxley.media/wp-content/uploads/2019/11/molniya-111.jpg",
      styles: {
        backgroundColor: '#263238',
        color: '#eceff1',
        borderRadius: '10px',
        border: '2px dashed #ffca28'
      },
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#ffca28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
    },
    {
      text: "Акулы не болеют раком?",
      answer: false,
      explanation: "Это миф. Ученые не раз находили раковые опухоли у многих видов акул.",
      bg: "https://upload.wikimedia.org/wikipedia/commons/5/56/White_shark.jpg",
      styles: {
        backgroundColor: '#00695c',
        color: '#e0f2f1',
        borderRadius: '15px',
        border: '4px double #80cbc4'
      },
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#80cbc4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
    },
    {
      text: "Вода на вершине Эвереста кипит при 100°C?",
      answer: false,
      explanation: "Из-за низкого давления на Эвересте вода закипает уже при 71°C.",
      bg: "https://s0.rbk.ru/v6_top_pics/media/img/6/77/347277761092776.webp",
      styles: {
        backgroundColor: '#eceff1',
        color: '#455a64',
        borderRadius: '2px 20px 2px 20px',
        border: '3px solid #b0bec5'
      },
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#455a64" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>'
    },
    {
      text: "В космосе нельзя плакать так же, как на Земле?",
      answer: true,
      explanation: "Из-за невесомости слезы не стекают вниз, а скапливаются на глазах в виде шарика.",
      bg: "https://s0.rbk.ru/v6_top_pics/media/img/6/76/756286803535766.jpg",
      styles: {
        backgroundColor: '#311b92',
        color: '#d1c4e9',
        borderRadius: '25px',
        border: '2px solid #7e57c2'
      },
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#d1c4e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/></svg>'
    }
  ],
  ads: [
    "Кстати, самые дешевые авиабилеты всегда ищите на Авиасейлс.",
    "Факт: билеты выгоднее всего покупать через Авиасейлс!",
    "Неважно, правда это или ложь, но Авиасейлс — лучший поиск авиабилетов.",
    "Пока вы читаете это, кто-то бронирует дешевый перелет на Авиасейлс.",
    "Ответили? Отлично! Теперь бегом на Авиасейлс за билетами в отпуск."
  ],
  loading: [
    "Загружаем факты со всего света...",
    "Ищем самые дешевые пиксели...",
    "Проверяем давление в шинах шасси...",
    "Спрашиваем у пилота дорогу..."
  ]
};
